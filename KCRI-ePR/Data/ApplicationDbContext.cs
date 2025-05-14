using KCRI_ePR.Models.Login;
using KCRI_ePR.Models.Purchase;
using Microsoft.EntityFrameworkCore;

namespace KCRI_ePR.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }

        public DbSet<PRModel> PR { get; set; }
        public DbSet<PR1Model> PR1 { get; set; }
        public DbSet<USRModel> USR { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<PR1Model>()
                .HasKey(p => new { p.DocEntry, p.LineNum });
        }
    }
}
