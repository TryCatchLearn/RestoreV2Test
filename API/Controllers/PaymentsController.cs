using System;
using API.Data;
using API.DTOs;
using API.Entities.OrderAggregate;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Stripe;

namespace API.Controllers;

public class PaymentsController(PaymentService paymentService, StoreContext context, 
    ILogger<PaymentsController> logger, IConfiguration config) : BaseApiController
{
    [HttpPost]
    public async Task<ActionResult<BasketDto>> CreateOrUpdatePaymentIntent()
    {
        var basket = await context.Baskets
            .GetBasketWithItems(Request.Cookies["basketId"]);

        if (basket == null) return NotFound();

        var intent = await paymentService.CreateOrUpdatePaymentIntent(basket);

        if (intent == null) return BadRequest(new ProblemDetails { Title = "Problem creating payment intent" });

        basket.PaymentIntentId ??= intent.Id;
        basket.ClientSecret ??= intent.ClientSecret;

        context.Update(basket);

        var result = await context.SaveChangesAsync() > 0;

        if (!result) return BadRequest(new ProblemDetails { Title = "Problem updating basket with intent" });

        return basket.ToDto();
    }

    [HttpPost("webhook")]
    public async Task<IActionResult> StripeWebhook()
    {
        var json = await new StreamReader(Request.Body).ReadToEndAsync();

        try
        {
            var stripeEvent = ConstructStripeEvent(json);

            if (stripeEvent.Data.Object is not PaymentIntent intent)
            {
                return BadRequest("Invalid event data");
            }

            if (intent.Status == "succeeded") await HandlePaymentIntentSucceeded(intent);
            else await HandlePaymentIntentFailed(intent);

            return Ok();
        }
        catch (StripeException ex)
        {
            logger.LogError(ex, "Stripe webhook error");
            return StatusCode(StatusCodes.Status500InternalServerError, "Webhook error");
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "An unexpected error occurred");
            return StatusCode(StatusCodes.Status500InternalServerError, "An unexpected error occurred");
        }
    }

    private async Task HandlePaymentIntentSucceeded(PaymentIntent intent)
        {
            if (intent.Status == "succeeded")
            {
                var order = await context.Orders
                    .FirstOrDefaultAsync(x => x.PaymentIntentId == intent.Id)
                        ?? throw new Exception("Order not found");

                order.OrderStatus = OrderStatus.PaymentReceived;

                // remove basket
                var basket = await context.Baskets.FirstOrDefaultAsync(x => x.PaymentIntentId == intent.Id);

                if (basket != null) context.Baskets.Remove(basket); 

                await context.SaveChangesAsync();
            }
        }

        private async Task HandlePaymentIntentFailed(PaymentIntent intent)
        {
            var order = await context.Orders
                   .Include(x => x.OrderItems)
                   .FirstOrDefaultAsync(x => x.PaymentIntentId == intent.Id)
                       ?? throw new Exception("Order not found");

            // update quantities for the products in stock based on the failed order
            foreach (var item in order.OrderItems)
            {
                var productItem = await context.Products
                    .FindAsync(item.ItemOrdered.ProductId)
                        ?? throw new Exception("Problem updating order stock");

                productItem.QuantityInStock += item.Quantity;
            }

            order.OrderStatus = OrderStatus.PaymentFailed;

            await context.SaveChangesAsync();
        }

    private Event ConstructStripeEvent(string json)
    {
        try
        {
            return EventUtility.ConstructEvent(json, Request.Headers["Stripe-Signature"],
                config["StripeSettings:WhSecret"]);
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Failed to construct stripe event");
            throw new StripeException("Invalid signature");
        }
    }
}
