using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KCRI_ePR.Models.Purchase
{
    [Table("PR1")]
    public class PR1Model
    {
        public int DocEntry { get; set; } = 1;
        public int LineNum { get; set; }
        public string GLAccount { get; set; }
        public string ItemCode { get; set; }
        public string ItemName { get; set; }
        public string Quantity { get; set; }
        public int UoMEntry { get; set; }
        public string UoMName { get; set; }
        public string UnitPrice { get; set; }
        public decimal DisPer { get; set; }
        public string DisAmount { get; set; }
        public string LineTotal { get; set; }
        public string LineRemark { get; set; }
        public string LineStatus { get; set; }
    }
}
