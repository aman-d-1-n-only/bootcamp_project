using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace bank_api.Migrations
{
    /// <inheritdoc />
    public partial class initialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admin",
                columns: table => new
                {
                    id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    username = table.Column<string>(type: "TEXT", nullable: false),
                    password = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admin", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "Customer",
                columns: table => new
                {
                    c_id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    fname = table.Column<string>(type: "TEXT", nullable: false),
                    lname = table.Column<string>(type: "TEXT", nullable: false),
                    address = table.Column<string>(type: "TEXT", nullable: false),
                    city = table.Column<string>(type: "TEXT", nullable: false),
                    email = table.Column<string>(type: "TEXT", nullable: false),
                    contact = table.Column<long>(type: "INTEGER", nullable: false),
                    card_no = table.Column<long>(type: "INTEGER", nullable: false),
                    pin = table.Column<int>(type: "INTEGER", nullable: false),
                    balance = table.Column<double>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customer", x => x.c_id);
                });

            migrationBuilder.CreateTable(
                name: "Account",
                columns: table => new
                {
                    a_id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    fname = table.Column<string>(type: "TEXT", nullable: false),
                    lname = table.Column<string>(type: "TEXT", nullable: false),
                    creditFields = table.Column<string>(type: "TEXT", nullable: false),
                    currentBalance = table.Column<string>(type: "TEXT", nullable: false),
                    acc_no = table.Column<long>(type: "INTEGER", nullable: false),
                    c_id = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Account", x => x.a_id);
                    table.ForeignKey(
                        name: "FK_Account_Customer_c_id",
                        column: x => x.c_id,
                        principalTable: "Customer",
                        principalColumn: "c_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Account_c_id",
                table: "Account",
                column: "c_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Account");

            migrationBuilder.DropTable(
                name: "Admin");

            migrationBuilder.DropTable(
                name: "Customer");
        }
    }
}
