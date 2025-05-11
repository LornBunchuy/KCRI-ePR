using KCRI_ePR.Models;
using Microsoft.AspNetCore.Mvc;

namespace KCRI_ePR.Controllers
{
    public class PurchaseController : Controller
    {
        public IActionResult PurchaseRequest()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> InsertPurchaseRequest([FromBody] PRDataModel data)
        {
            if (data == null)
            {
                return Ok(2);
            }
            await Task.CompletedTask;
            return Ok(1);
        }

        public IActionResult PurchaseList()
        {
            return View();
        }
    }
}
