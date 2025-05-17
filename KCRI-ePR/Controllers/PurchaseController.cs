using KCRI_ePR.Models.Purchase;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using KCRI_ePR.Data;
using Microsoft.EntityFrameworkCore;
using KCRI_ePR.Services;

using Microsoft.IdentityModel.Tokens;

namespace KCRI_ePR.Controllers
{
    public class PurchaseController : Controller
    {
        private readonly ApplicationDbContext _context;
        private readonly IService _service;
        private readonly GlobalData _globalData;
        public PurchaseController(ApplicationDbContext context, IService service, GlobalData globalData)
        {
            _service = service;
            _context = context;
            _globalData = globalData;
        }
        [HttpGet]
        public IActionResult GetUsername()
        {
            return Json(new { username = _globalData.Username });
        }
        public IActionResult PurchaseRequest(int? docEntry)
        {
            if (docEntry == null)
            {
                ViewBag.Companies = StaticData.CompanyList;
                ViewBag.Divisions = StaticData.DivisionList;
                return View();
            }

            // Check if docEntry is a string and try to convert it
            int docEntryInt = docEntry.Value;

            PRModel head = _context.PR
                .Where(p => p.DocEntry == docEntryInt)
                .FirstOrDefault();

            List<PR1Model> details = _context.PR1
                .Where(p => p.DocEntry == docEntryInt)
                .ToList();
            ViewBag.Companies = StaticData.CompanyList;
            ViewBag.Divisions = StaticData.DivisionList;
            ViewBag.head = head;
            ViewBag.details = details;
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> InsertPR([FromBody] PRRequestModel request)
        {
            if (request == null || request.PR == null)
            {
                return Ok(500);
            }

            try
            {
                DateTime sqlMinDate = new DateTime(1753, 1, 1);
                var data = request.PR;
                var dataRows = request.PRDetails;
                data.DocNum = await _service.GetDocNumPR(data.Company);
                // If it's an insert (DocEntry == 0)
                if (data.DocEntry == 0)
                {
                    if (data.CreatedDate < sqlMinDate)
                        data.CreatedDate = DateTime.Now;
                     data.CreatedBy = _globalData.UserCode;

                    _context.PR.Add(data);
                    await _context.SaveChangesAsync();

                    if (dataRows != null && dataRows.Any())
                    {
                        int lineNum = 0;
                        foreach (var row in dataRows)
                        {
                            row.LineNum = lineNum++;
                            row.DocEntry = data.DocEntry;
                        }

                        _context.PR1.AddRange(dataRows);
                        await _context.SaveChangesAsync();
                    }

                    return Ok(10); // Insert Success
                }
                else
                {
                    // check status
                    if (data.DocStatus != "Open")
                        return Ok(22);

                    var existingPR = await _context.PR.FindAsync(data.DocEntry);
                    if (existingPR == null)
                        return Ok(500);
                    existingPR.UpdatedDate = DateTime.Now;
                    existingPR.UpdatedBy = _globalData.UserCode;
                    existingPR.RequestDate = data.RequestDate;
                    existingPR.RequireDate = data.RequireDate;
                    existingPR.DocNum = data.DocNum;
                    existingPR.Company = data.Company;
                    existingPR.Division = data.Division;
                    existingPR.IsBudget = data.IsBudget;
                    existingPR.DeliveryMethod = data.DeliveryMethod;
                    existingPR.DeliveryAddress = data.DeliveryAddress;
                    existingPR.IsCashAdv = data.IsCashAdv;
                    existingPR.CashAdvAmt = data.CashAdvAmt;
                    existingPR.CCDept = data.CCDept;
                    existingPR.Purpose = data.Purpose;
                    existingPR.Remark = data.Purpose;

                    // Remove existing PR1 details
                    var existingDetails = _context.PR1.Where(d => d.DocEntry == data.DocEntry);
                    _context.PR1.RemoveRange(existingDetails);
                    await _context.SaveChangesAsync();

                    // Add updated PR1 details
                    if (dataRows != null && dataRows.Any())
                    {
                        int lineNum = 0;
                        foreach (var row in dataRows)
                        {
                            row.LineNum = lineNum++;
                            row.DocEntry = data.DocEntry;
                        }
                        _context.PR1.AddRange(dataRows);
                        await _context.SaveChangesAsync();
                    }

                    return Ok(20); // Update Success
                }
            }
            catch (DbUpdateException ex)
            {
                return Ok(500);
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
                    docEntry = p.DocEntry,
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

        [HttpPost]
        public async Task<IActionResult> GetDocNum([FromBody] string company)
        {
            if (!string.IsNullOrEmpty(company))
            {
                return Ok(await _service.GetDocNumPR(company));
            }
            return Ok(0);
        }
        [HttpPost]
        public IActionResult PRCancel([FromBody] int docEntry)
        {
            var pr = _context.PR
                             .FirstOrDefault(p => p.DocEntry == docEntry);

            if (pr == null)
                return Ok(11);

            if (pr.DocStatus != "Open")
                return Ok(22);

            pr.DocStatus = "Cancelled_User";
            pr.CancelledBy = _globalData.UserCode;
            pr.CancelledDate = DateTime.Now;
            _context.SaveChanges();

            return Ok(1); // success
        }
        [HttpGet]
        public IActionResult PageCount() {
            int countPR = _context.PR.Count();
            return Ok(countPR);
        }
    }
}
