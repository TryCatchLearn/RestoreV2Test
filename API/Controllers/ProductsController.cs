using System.Text.Json;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.RequestHelpers;
using API.Services;
using AutoMapper;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class ProductsController(StoreContext context, IMapper mapper, ImageService imageService) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Product>>> GetProducts([FromQuery] ProductParams productParams)
        {
            var query = context.Products
                .Sort(productParams.OrderBy)
                .Search(productParams.SearchTerm)
                .Filter(productParams.Brands, productParams.Types)
                .AsQueryable();

            var products = await PagedList<Product>.ToPagedList(query,
                productParams.PageNumber, productParams.PageSize);

            Response.AddPaginationHeader(products.Metadata);

            return products;
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await context.Products.Include(x => x.Photos).FirstOrDefaultAsync(x => x.Id == id);

            if (product == null) return NotFound();

            return product;
        }

        [HttpGet("filters")]
        public async Task<IActionResult> GetFilters()
        {
            var brands = await context.Products.Select(p => p.Brand).Distinct().ToListAsync();
            var types = await context.Products.Select(p => p.Type).Distinct().ToListAsync();

            return Ok(new { brands, types });
        }

        [Authorize(Roles = "Admin")]
        [HttpPost]
        public async Task<ActionResult<Product>> CreateProduct([FromForm]CreateProductDto productDto)
        {
            var product = mapper.Map<Product>(productDto);

            if (productDto.File != null)
            {
                var imageResult = await imageService.AddImageAsync(productDto.File);

                if (imageResult.Error != null) return BadRequest(imageResult.Error.Message);

                product.PictureUrl = imageResult.SecureUrl.ToString();
                product.Photos.Add(new Photo
                {
                    Url = imageResult.SecureUrl.AbsoluteUri,
                    PublicId = imageResult.PublicId
                });
            }

            context.Products.Add(product);

            var result = await context.SaveChangesAsync() > 0;

            if (result) return CreatedAtAction(nameof(GetProduct), new { Id = product.Id }, product);

            return BadRequest("Problem creating new product");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id:int}")]
        public async Task<ActionResult> UpdateProduct(int id, [FromForm]UpdateProductDto productDto)
        {
            var product = await context.Products.FindAsync(id);

            if (product == null) return NotFound();

            mapper.Map(productDto, product);

            var result = await context.SaveChangesAsync() > 0;

            if (result) return NoContent();

            return BadRequest("Problem updating product");
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteProduct(int id)
        {
            var product = await context.Products
                .Include(x => x.Photos)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (product == null) return NotFound();

            foreach (var photo in product.Photos)
            {
                await imageService.DeleteImageAsync(photo.PublicId);
            }

            context.Products.Remove(product);

            var result = await context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest(new ProblemDetails { Title = "Problem deleting product" });
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("{productId:int}")]
        public async Task<ActionResult<Photo>> AddProductImage(int productId, IFormFile file)
        {
            var imageResult = await imageService.AddImageAsync(file);

            if (imageResult.Error != null) return BadRequest(imageResult.Error.Message);

            var photo = new Photo
            {
                Url = imageResult.SecureUrl.AbsoluteUri,
                PublicId = imageResult.PublicId,
                ProductId = productId
            };

            context.Photos.Add(photo);

            var result = await context.SaveChangesAsync() > 0;

            if (result) return Ok(photo);

            return BadRequest("Problem adding image");
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{productId:int}/{photoId:int}")]
        public async Task<ActionResult> DeleteProductImage(int productId, int photoId)
        {
            var product = await context.Products
                .Include(x => x.Photos)
                .FirstOrDefaultAsync(x => x.Id == productId);

            if (product == null) return BadRequest("Cannot update this product");
            
            var photo = product.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo == null) return BadRequest("Unable to delete this image");

            if (photo.Url == product.PictureUrl) return BadRequest("Cannot delete main image");

            await imageService.DeleteImageAsync(photo.PublicId);

            context.Photos.Remove(photo);

            var result = await context.SaveChangesAsync() > 0;

            if (result) return Ok(photo);

            return BadRequest("Problem adding image");
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{productId:int}/{photoId:int}")]
        public async Task<ActionResult> SetMainImage(int productId, int photoId)
        {
            var product = await context.Products
                .Include(x => x.Photos)
                .FirstOrDefaultAsync(x => x.Id == productId);

            if (product == null) return BadRequest("Cannot update this product");
            
            var photo = product.Photos.FirstOrDefault(x => x.Id == photoId);

            if (photo == null) return BadRequest("Unable to set this image as main");

            product.PictureUrl = photo.Url;

            var result = await context.SaveChangesAsync() > 0;

            if (result) return Ok();

            return BadRequest("Problem updating image");
        }
    }
}
