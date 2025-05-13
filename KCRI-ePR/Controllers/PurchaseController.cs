using KCRI_ePR.Models.Purchase;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using KCRI_ePR.Data;
using Microsoft.EntityFrameworkCore;

namespace KCRI_ePR.Controllers
{
    public class PurchaseController : Controller
    {
        private readonly ApplicationDbContext _context;
        public PurchaseController(ApplicationDbContext context)
        {
            _context = context;
        }
        public IActionResult PurchaseRequest()
        {
            return View();
        }

        [HttpPost]
        public IActionResult InsertPR([FromBody] PRModel data)
        {
            if (data == null)
            {
                return Ok(2); // Null data
            }

            try
            {
                _context.PRs.Add(data);
                _context.SaveChanges();
                return Ok(10); // Success
            }
            catch (DbUpdateException ex)
            {
                // Log ex.InnerException?.Message for details
                return BadRequest($"Error saving data: {ex.InnerException?.Message}");
            }
        }

        public IActionResult PurchaseList()
        {
            return View();
        }
    }
}
