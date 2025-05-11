namespace KCRI_ePR.Models
{
    public class PRDataModel
    {
        public DateTime RequestedDate { get; set; }
        public DateTime RequireDate { get; set; }
        public string Company { get; set; }
        public string Devision { get; set; }
        public string Status { get; set; }
        public string Purpose { get; set; }
        public string Address { get; set; }
        public string AdditionalSpec { get; set; }
        public string Budgeted { get; set; }
        public string DeliveryMethod { get; set; }
        public string AdvanceRequired { get; set; }
        public string CostCenter { get; set; }
        public List<ListDataRowModel> ListDataRow { get; set; }
    }
}
