using EF_Core.Webapi.Data;
using EF_Core.Webapi.Services.Implements;
using EF_Core.Webapi.Services.Interfaces;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddDbContext<ProdDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IProductService, ProductService>();
builder.Services.AddScoped<ICategoryService, CategoryService>();

builder.Services.AddControllers();

builder.Services.AddStackExchangeRedisCache(options =>
{
    options.Configuration = "localhost:6379"; // địa chỉ Redis
    options.InstanceName = "ProductApi:";     // tiền tố key Redis
});



builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
