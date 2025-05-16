using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KCRI_ePR.Models.Purchase
{
    public class PR1Model
    {
        public int? DocEntry { get; set; }
        public int? LineNum { get; set; }
        public string? GLAccount { get; set; } = "130001";
        public string? ItemCode { get; set; }
        public string? ItemName { get; set; }
        public decimal? Quantity { get; set; } = 0;
        public int? UoMEntry { get; set; } = -1;
        public string? UoMName { get; set; }
        public decimal? UnitPrice { get; set; } = 0;
        public decimal? DisPer { get; set; } = 0;
        public decimal? DisAmount { get; set; } = 0;
        public decimal? LineTotal { get; set; } = 0;
        public string? LineRemark { get; set; }
        public string? LineStatus { get; set; } = "Open";
    }
}
