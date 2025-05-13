using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
namespace KCRI_ePR.Models.Purchase
{
    [Table("PR")]
    public class PRModel
    {
        public int DocEntry { get; set; }
        public string DocNum { get; set; } = "20250500001";
        public string Company { get; set; }
        public string DocStatus { get; set; }
        public DateTime RequestDate { get; set; }
        public DateTime RequireDate { get; set; }
        public string IsBudget { get; set; }
        public string DeliveryMethod { get; set; }
        public string DeliveryAddress { get; set; }
        public string IsCashAdv { get; set; }
        public string CashAdvAmt { get; set; }
        public string CCDept { get; set; }
        public string Division { get; set; }
        public string Purpose { get; set; }
        public string Remark { get; set; }
        public string Noted { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime UpdatedDate { get; set; }
        public string UpdatedBy { get; set; }
        public DateTime? CancelledDate { get; set; }
        public string CancelledBy { get; set; }
        public DateTime? LastAppDate { get; set; }
        public string LastAppBy { get; set; }
        public DateTime? LastRejDate { get; set; }
        public string LastRejBy { get; set; }
        public string IntStatus { get; set; }
        public string IntError { get; set; }
        public DateTime? IntDatetime { get; set; }
        public int SAPEntry { get; set; }
        public int SAPDocNum { get; set; }
    }
}
