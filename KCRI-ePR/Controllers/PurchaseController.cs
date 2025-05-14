using KCRI_ePR.Models.Purchase;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using KCRI_ePR.Data;
using Microsoft.EntityFrameworkCore;
using KCRI_ePR.Services;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory.Database;
using static System.Runtime.InteropServices.JavaScript.JSType;
using Microsoft.IdentityModel.Tokens;

namespace KCRI_ePR.Controllers
{
    public class PurchaseController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IService _service;
        public PurchaseController(ApplicationDbContext context, IService service)
        {
            _service = service;
            _context = context;
        }
        public IActionResult PurchaseRequest()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> InsertPR([FromBody] PRRequestModel request)
        {
            if (request == null || request.PR == null)
            {
                return Ok(2);
            }
            try
            {
                DateTime sqlMinDate = new DateTime(1753, 1, 1);
                var data = request.PR;
                var dataRows = request.PRDetails;

                data.DocNum = await _service.GetDocNumPR(data.Company);

                if (data.CreatedDate < sqlMinDate)
                    data.CreatedDate = DateTime.Now;

                if (data.UpdatedDate < sqlMinDate)
                    data.UpdatedDate = DateTime.Now;

                _context.PR.Add(data);
                await _context.SaveChangesAsync(); 

                if (dataRows != null && dataRows.Any())
                {
                    int lineNum = 0;
                    foreach (var row in dataRows)
                    {
                        row.LineNum = lineNum++;
                        row.DocEntry = data.DocEntry; // Set FK for all rows
                    }

                    _context.PR1.AddRange(dataRows); // Use AddRange instead of Add in a loop
                    await _context.SaveChangesAsync();
                }
                return Ok(10); // Success
            }
            catch (DbUpdateException ex)
            {
                return BadRequest($"Error saving data: {ex.InnerException?.Message}");
            }
        }

        public IActionResult PurchaseList()
        {
            return View();
        }
        [HttpGet]
        public IActionResult PRList()
        {
            var data = _context.PR
                .Select(p => new {
                    docNum = p.DocNum,
                    requestDate = p.RequestDate,
                    requireDate = p.RequireDate,
                    company = p.Company,
                    division = p.Division,
                    purpose = p.Purpose,
                    status = p.DocStatus
                }).ToList();

            return Ok(data); // returns JSON
        }
        [HttpGet]
        public async Task<IActionResult> GetDocNum([FromQuery] string company)
        {
            if(company != null || !company.IsNullOrEmpty())
            {
                return Ok(await _service.GetDocNumPR(company));
            }
            return Ok(0);
        }

    }
}
