using EF_Core.Webapi.Dtos.Product;
using static EF_Core.Webapi.Dtos.Product.UpdateProductDto;

namespace EF_Core.Webapi.Services.Interfaces
{
    public interface IProductService
    {
        Task<ProductResponseDto> CreateProductAsync(ProductCreateDto dto);
        Task<List<ProductResponseDto>> GetAllProductsAsync();
        Task<ProductResponseDto> GetProductByIdAsync(int id);
        Task<bool> UpdateProductAsync(ProductUpdateDto dto);
        Task<bool> DeleteProductAsync(int id);
    }

}
