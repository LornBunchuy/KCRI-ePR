using Microsoft.AspNetCore.Mvc;

namespace KCRI_ePR.Controllers
{
    public class PurchaseController : Controller
    {
        public IActionResult PurchaseRequest()
        {
            return View();
        }
        public IActionResult PurchaseList()
        {
            return View();
        }
    }
}
