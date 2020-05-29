using Microsoft.EntityFrameworkCore.Migrations;

namespace RoutePage.Data.Migrations
{
    public partial class RoutePageDb : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateSequence<int>(
                name: "UserId",
                startValue: 2L);

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    UserId = table.Column<int>(nullable: false, defaultValueSql: "nextval('\"UserId\"')"),
                    Username = table.Column<string>(nullable: true),
                    Password = table.Column<string>(nullable: true),
                    Email = table.Column<string>(nullable: true),
                    Address = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.UserId);
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "UserId", "Address", "Email", "Password", "Username" },
                values: new object[] { 1, "123 S Main St. Springfield, OH", "johnny5@email.com", "p@ssword", "Johnny5" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropSequence(
                name: "UserId");
        }
    }
}
