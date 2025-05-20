using Microsoft.AspNetCore.Mvc;

namespace MiddleWare.Controllers
{

    [ApiController]
    [Route("api/[controller]")]
    public class TestExceptionController : ControllerBase
    {
        [HttpGet("test-error")]
        public IActionResult TestError()
        {
            throw new Exception("Đây là lỗi test để kiểm tra middleware!");
        }
    }

}
