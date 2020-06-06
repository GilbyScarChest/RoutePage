using Microsoft.EntityFrameworkCore;
namespace RoutePage.Data
{
    public class RouteDbContext : DbContext
    {
        public DbSet<User> Users { set; get; }
        public DbSet<Comment> Comments { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseNpgsql("server=localhost; database=postgres; user id=postgres; password=postgres");
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasSequence<int>("UserId").StartsAt(2).IncrementsBy(1);
            modelBuilder.Entity<User>(o => o.HasKey(k => k.UserId));
            modelBuilder.Entity<User>().Property(p => p.UserId).HasDefaultValueSql("nextval('\"UserId\"')");

            modelBuilder.Entity<User>().HasData(new User()
            {
                UserId = 1,
                Username = "Johnny5",
                Password = "p@ssword",
                Email = "johnny5@email.com",
                Address = "123 S Main St. Springfield, OH"
            });

            modelBuilder.HasSequence<int>("CommentId").StartsAt(1).IncrementsBy(1);
            modelBuilder.Entity<Comment>(o => o.HasKey(k => k.CommentId));
            modelBuilder.Entity<Comment>().Property(p => p.CommentId).HasDefaultValueSql("nextval('\"CommentId\"')");
        }

        
    }
}
