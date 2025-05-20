using EF_Core.Webapi.Data;
using EF_Core.Webapi.Dtos.Product;
using EF_Core.Webapi.Entity;
using EF_Core.Webapi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;
using static EF_Core.Webapi.Dtos.Product.UpdateProductDto;

namespace EF_Core.Webapi.Services.Implements
{
    public class ProductService : IProductService
    {
        private readonly ProdDbContext _context;

        public ProductService(ProdDbContext context)
        {
            _context = context;
        }

        public async Task<ProductResponseDto> CreateProductAsync(ProductCreateDto dto)
        {
            var product = new Product
            {
                ProductName = dto.ProductName,
                Price = dto.Price,
                Description = dto.Description,
                CategoryId = dto.CategoryId
            };

            _context.Products.Add(product);
            await _context.SaveChangesAsync();

            var category = await _context.Categories.FindAsync(dto.CategoryId);

            return new ProductResponseDto
            {
                ProductId = product.ProductId,
                ProductName = product.ProductName,
                Price = product.Price,
                Description = product.Description,
                CategoryId = product.CategoryId,
                CategoryName = category?.CategoryName
            };
        }

        public async Task<List<ProductResponseDto>> GetAllProductsAsync()
        {
            return await _context.Products
                .Include(p => p.Category)
                .Select(p => new ProductResponseDto
                {
                    ProductId = p.ProductId,
                    ProductName = p.ProductName,
                    Price = p.Price,
                    Description = p.Description,
                    CategoryId = p.CategoryId,
                    CategoryName = p.Category.CategoryName
                }).ToListAsync();
        }

        public async Task<ProductResponseDto> GetProductByIdAsync(int id)
        {
            var product = await _context.Products
                .Include(p => p.Category)
                .FirstOrDefaultAsync(p => p.ProductId == id);

            if (product == null) return null;

            return new ProductResponseDto
            {
                ProductId = product.ProductId,
                ProductName = product.ProductName,
                Price = product.Price,
                Description = product.Description,
                CategoryId = product.CategoryId,
                CategoryName = product.Category.CategoryName
            };
        }

        public async Task<bool> UpdateProductAsync(ProductUpdateDto dto)
        {
            var product = await _context.Products.FindAsync(dto.ProductId);
            if (product == null) return false;

            product.ProductName = dto.ProductName;
            product.Price = dto.Price;
            product.Description = dto.Description;
            product.CategoryId = dto.CategoryId;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteProductAsync(int id)
        {
            var product = await _context.Products.FindAsync(id);
            if (product == null) return false;

            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return true;
        }
    }

}
