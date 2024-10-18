using System;
using System.ComponentModel.DataAnnotations;
using API.Entities.OrderAggregate;

namespace API.DTOs;

public class CreateOrderDto
{
    [Required]
    public ShippingAddress ShippingAddress {get; set;} = null!;

    [Required]
    public PaymentSummary PaymentSummary { get; set; } = null!;
}
