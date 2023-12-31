﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace bank_api.Migrations
{
    /// <inheritdoc />
    public partial class initialMigrations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Admin",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Username = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    Password = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Admin", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Customer",
                columns: table => new
                {
                    CustId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Name = table.Column<string>(type: "TEXT", maxLength: 100, nullable: false),
                    Address = table.Column<string>(type: "TEXT", maxLength: 500, nullable: false),
                    City = table.Column<string>(type: "TEXT", maxLength: 50, nullable: false),
                    Email = table.Column<string>(type: "TEXT", nullable: false),
                    Contact = table.Column<long>(type: "INTEGER", maxLength: 10, nullable: false),
                    Pincode = table.Column<int>(type: "INTEGER", maxLength: 6, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customer", x => x.CustId);
                });

            migrationBuilder.CreateTable(
                name: "Account",
                columns: table => new
                {
                    AccId = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AccNo = table.Column<long>(type: "INTEGER", maxLength: 8, nullable: false),
                    Balance = table.Column<double>(type: "REAL", nullable: false),
                    CardNo = table.Column<long>(type: "INTEGER", maxLength: 12, nullable: false),
                    Pin = table.Column<int>(type: "INTEGER", maxLength: 4, nullable: false),
                    CustId = table.Column<int>(type: "INTEGER", nullable: false),
                    CustomerCustId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Account", x => x.AccId);
                    table.ForeignKey(
                        name: "FK_Account_Customer_CustomerCustId",
                        column: x => x.CustomerCustId,
                        principalTable: "Customer",
                        principalColumn: "CustId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Account_CustomerCustId",
                table: "Account",
                column: "CustomerCustId");
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
