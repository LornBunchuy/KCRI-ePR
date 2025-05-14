using KCRI_ePR.Data;
using KCRI_ePR.Models.Purchase;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace KCRI_ePR.Services
{
    public class Service : IService
    {

      private readonly ApplicationDbContext _context;

        public Service(ApplicationDbContext context)
        {
            _context = context;
        }
        public async Task<string> GetDocNumPR(string company)
        {
            var currentDate = DateTime.Now;

            int count = await _context.PR
                .Where(p => p.Company == company &&
                            p.CreatedDate.Year == currentDate.Year &&
                            p.CreatedDate.Month == currentDate.Month)
                .CountAsync();

            string yearMonth = currentDate.ToString("yyyyMM");
            string sequence = (count + 1).ToString().PadLeft(5, '0');
            string newDocNum = yearMonth + sequence;

            return newDocNum;
        }

    }
}
