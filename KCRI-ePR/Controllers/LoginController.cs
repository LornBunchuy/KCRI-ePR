using KCRI_ePR.Models.Login;
using Microsoft.AspNetCore.Mvc;

namespace KCRI_ePR.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        public IActionResult Login()
        {
            return View();
        }
        [HttpPost]
        public IActionResult AuthLogin([FromBody] UserModel data)
        {
            if (data == null) {
                return Ok(3);
            }
            return Ok(1);
        }
        public IActionResult ChangePassword()
        {
            return View();
        }
    }
}
