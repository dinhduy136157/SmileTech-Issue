using MiddleWare.Models;
using System.Text.Json;

namespace MiddleWare.Middlewares
{
        public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly ILogger<ExceptionHandlingMiddleware> _logger;

        public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
        {
            _next = next;
            _logger = logger;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context); // Gọi middleware tiếp theo
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Unhandled exception");

                // Trả về response lỗi JSON
                await HandleExceptionAsync(context, ex);
            }
        }

        private async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = StatusCodes.Status500InternalServerError;

            var response = new ErrorResponse
            {
                StatusCode = context.Response.StatusCode,
                Message = "Đã xảy ra lỗi nội bộ.",
                Details = exception.Message // Có thể ẩn đi nếu là production
            };

            var options = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase
            };

            string json = JsonSerializer.Serialize(response, options);

            await context.Response.WriteAsync(json);
        }


    }
}
