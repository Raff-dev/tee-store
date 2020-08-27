using Microsoft.EntityFrameworkCore.Migrations;

namespace VapeShop.Migrations
{
    public partial class MediaProductForeignKeyFix : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Medias_Products_ProductId",
                table: "Medias");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "Medias",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Medias_Products_ProductId",
                table: "Medias",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Medias_Products_ProductId",
                table: "Medias");

            migrationBuilder.AlterColumn<int>(
                name: "ProductId",
                table: "Medias",
                type: "int",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Medias_Products_ProductId",
                table: "Medias",
                column: "ProductId",
                principalTable: "Products",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
