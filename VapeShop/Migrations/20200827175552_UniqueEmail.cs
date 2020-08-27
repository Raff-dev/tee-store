using Microsoft.EntityFrameworkCore.Migrations;

namespace VapeShop.Migrations
{
    public partial class UniqueEmail : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Medias_Users_UserId",
                table: "Medias");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Users_UserId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_UserId",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Medias_UserId",
                table: "Medias");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "Reviews");

            migrationBuilder.AddColumn<int>(
                name: "UserEmail",
                table: "Reviews",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "UserUserEmail",
                table: "Medias",
                nullable: true);

            migrationBuilder.AddUniqueConstraint(
                name: "AK_Users_Email",
                table: "Users",
                column: "Email");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_UserEmail",
                table: "Reviews",
                column: "UserEmail");

            migrationBuilder.CreateIndex(
                name: "IX_Medias_UserUserEmail",
                table: "Medias",
                column: "UserUserEmail",
                unique: true,
                filter: "[UserUserEmail] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Medias_Users_UserUserEmail",
                table: "Medias",
                column: "UserUserEmail",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Users_UserEmail",
                table: "Reviews",
                column: "UserEmail",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Medias_Users_UserUserEmail",
                table: "Medias");

            migrationBuilder.DropForeignKey(
                name: "FK_Reviews_Users_UserEmail",
                table: "Reviews");

            migrationBuilder.DropUniqueConstraint(
                name: "AK_Users_Email",
                table: "Users");

            migrationBuilder.DropIndex(
                name: "IX_Reviews_UserEmail",
                table: "Reviews");

            migrationBuilder.DropIndex(
                name: "IX_Medias_UserUserEmail",
                table: "Medias");

            migrationBuilder.DropColumn(
                name: "UserEmail",
                table: "Reviews");

            migrationBuilder.DropColumn(
                name: "UserUserEmail",
                table: "Medias");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "Reviews",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_UserId",
                table: "Reviews",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Medias_UserId",
                table: "Medias",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Medias_Users_UserId",
                table: "Medias",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Reviews_Users_UserId",
                table: "Reviews",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
