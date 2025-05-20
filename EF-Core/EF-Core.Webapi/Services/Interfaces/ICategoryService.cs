using EF_Core.Webapi.Dtos.Category;

namespace EF_Core.Webapi.Services.Interfaces
{
    public interface ICategoryService
    {
        Task<List<CategoryDto>> GetAllAsync();
        Task<CategoryDto?> GetByIdAsync(int id);
        Task<CategoryDto> CreateAsync(CreateCategoryDto dto);
        Task<bool> UpdateAsync(UpdateCategoryDto dto);
        Task<bool> DeleteAsync(int id);
    }

}
