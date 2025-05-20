namespace EF_Core.Webapi.Dtos.Product
{
    public class UpdateProductDto
    {
        public class ProductUpdateDto
        {
            public int ProductId { get; set; }
            public string ProductName { get; set; }
            public int Price { get; set; }
            public string Description { get; set; }
            public int CategoryId { get; set; }
        }

    }
}
