using EF_Core.Webapi.Data;
using EF_Core.Webapi.Dtos.Category;
using EF_Core.Webapi.Entity;
using EF_Core.Webapi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace EF_Core.Webapi.Services.Implements
{


    public class CategoryService : ICategoryService
    {
        private readonly ProdDbContext _context;

        public CategoryService(ProdDbContext context)
        {
            _context = context;
        }

        public async Task<List<CategoryDto>> GetAllAsync()
        {
            return await _context.Categories
                .Select(c => new CategoryDto
                {
                    CategoryId = c.CategoryId,
                    CategoryName = c.CategoryName
                })
                .ToListAsync();
        }

        public async Task<CategoryDto?> GetByIdAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) return null;

            return new CategoryDto
            {
                CategoryId = category.CategoryId,
                CategoryName = category.CategoryName
            };
        }

        public async Task<CategoryDto> CreateAsync(CreateCategoryDto dto)
        {
            var category = new Category
            {
                CategoryName = dto.CategoryName
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return new CategoryDto
            {
                CategoryId = category.CategoryId,
                CategoryName = category.CategoryName
            };
        }

        public async Task<bool> UpdateAsync(UpdateCategoryDto dto)
        {
            var category = await _context.Categories.FindAsync(dto.CategoryId);
            if (category == null) return false;

            category.CategoryName = dto.CategoryName;
            await _context.SaveChangesAsync();

            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var category = await _context.Categories.FindAsync(id);
            if (category == null) return false;

            _context.Categories.Remove(category);
            await _context.SaveChangesAsync();

            return true;
        }
    }
}

