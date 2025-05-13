using KCRI_ePR.Models.Login;
using KCRI_ePR.Models.Purchase;
using Microsoft.EntityFrameworkCore;

namespace KCRI_ePR.Data
{
    public class ApplicationDbContext : DbContext
    {
       
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<PRModel> PRs { get; set; }
        public DbSet<PR1Model> PR1 { get; set; }
        public DbSet<USRModel> USR { get; set; }
    }
}
