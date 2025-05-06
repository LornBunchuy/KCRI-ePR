using Microsoft.AspNetCore.Mvc;

namespace KCRI_ePR.Controllers
{
    public class LoginController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
