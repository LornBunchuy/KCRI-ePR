using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace KCRI_ePR.Models.Login
{
    public class USRModel
    {
        [Key]
        public string UserCode { get; set; }
        public string? UserName { get; set; }
        public string? PWD { get; set; }
        public byte[]? Img { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? UserStatus { get; set; }
        public DateTime? CreatedDate { get; set; }
        public string? CreatedBy { get; set; }
        public DateTime? UpdatedDate { get; set; }
        public string? UpdatedBy { get; set; }
    }
}
