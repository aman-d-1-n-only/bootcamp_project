using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace bank_api.Migrations
{
    /// <inheritdoc />
    public partial class Modified : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Account_Customer_c_id1",
                table: "Account");

            migrationBuilder.RenameColumn(
                name: "c_id1",
                table: "Account",
                newName: "Customerc_id");

            migrationBuilder.RenameIndex(
                name: "IX_Account_c_id1",
                table: "Account",
                newName: "IX_Account_Customerc_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Account_Customer_Customerc_id",
                table: "Account",
                column: "Customerc_id",
                principalTable: "Customer",
                principalColumn: "c_id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Account_Customer_Customerc_id",
                table: "Account");

            migrationBuilder.RenameColumn(
                name: "Customerc_id",
                table: "Account",
                newName: "c_id1");

            migrationBuilder.RenameIndex(
                name: "IX_Account_Customerc_id",
                table: "Account",
                newName: "IX_Account_c_id1");

            migrationBuilder.AddForeignKey(
                name: "FK_Account_Customer_c_id1",
                table: "Account",
                column: "c_id1",
                principalTable: "Customer",
                principalColumn: "c_id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
