using Microsoft.AspNetCore.Mvc.Rendering;

namespace KCRI_ePR.Data
{
    public static class StaticData
    {
        public static List<SelectListItem> CompanyList => new List<SelectListItem>
        {
            new SelectListItem { Text = "KCRI", Value = "1" },
            new SelectListItem { Text = "CHLL", Value = "2" }
        };

        public static List<SelectListItem> DivisionList => new List<SelectListItem>
        {
            new SelectListItem { Text = "CGs", Value = "1" },
            new SelectListItem { Text = "MSG", Value = "2" }
        };
    }
}
