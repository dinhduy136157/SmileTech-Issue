using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using EF_Core.Webapi.Data;
using EF_Core.Webapi.Entity;
using EF_Core.Webapi.Dtos.Product;
using EF_Core.Webapi.Services.Interfaces;
using static EF_Core.Webapi.Dtos.Product.UpdateProductDto;

namespace EF_Core.Webapi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductsController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductsController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct(ProductCreateDto dto)
        {
            var result = await _productService.CreateProductAsync(dto);
            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllProducts()
        {
            var result = await _productService.GetAllProductsAsync();
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var result = await _productService.GetProductByIdAsync(id);
            if (result == null) return NotFound();
            return Ok(result);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProduct(int id, ProductUpdateDto dto)
        {
            if (id != dto.ProductId) return BadRequest();
            var success = await _productService.UpdateProductAsync(dto);
            if (!success) return NotFound();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var success = await _productService.DeleteProductAsync(id);
            if (!success) return NotFound();
            return NoContent();
        }
    }

}
