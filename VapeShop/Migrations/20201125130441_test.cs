using Microsoft.EntityFrameworkCore.Migrations;

namespace VapeShop.Migrations
{
    public partial class test : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Users_UserEmail",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_UserEmail",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "UserEmail",
                table: "Reviews");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Reviews",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_UserId",
                table: "Reviews",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Users_UserId",
                table: "Reviews",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Users_UserId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_UserId",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Reviews");

            migrationBuilder.AddColumn<int>(
                name: "UserEmail",
                table: "Reviews",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_UserEmail",
                table: "Reviews",
                column: "UserEmail");

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Users_UserEmail",
                table: "Reviews",
                column: "UserEmail",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
