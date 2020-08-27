﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using VapeShop.Models;

namespace VapeShop.Migrations
{
    [DbContext(typeof(VapeShopContext))]
    partial class VapeShopContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.1.7")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("VapeShop.Models.Category", b =>
                {
                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(30)")
                        .HasMaxLength(30);

                    b.HasKey("Name");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("VapeShop.Models.Media", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CategoryName")
                        .HasColumnType("nvarchar(30)");

                    b.Property<string>("CategoryName1")
                        .HasColumnType("nvarchar(30)");

                    b.Property<string>("MediaFilePath")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<int?>("ProductId")
                        .HasColumnType("int");

                    b.Property<int?>("UserId")
                        .HasColumnType("int");

                    b.Property<int?>("UserUserEmail")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("CategoryName")
                        .IsUnique()
                        .HasFilter("[CategoryName] IS NOT NULL");

                    b.HasIndex("CategoryName1");

                    b.HasIndex("ProductId");

                    b.HasIndex("UserUserEmail")
                        .IsUnique()
                        .HasFilter("[UserUserEmail] IS NOT NULL");

                    b.ToTable("Medias");
                });

            modelBuilder.Entity("VapeShop.Models.Product", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Brand")
                        .IsRequired()
                        .HasColumnType("nvarchar(60)")
                        .HasMaxLength(60);

                    b.Property<string>("CategoryName")
                        .HasColumnType("nvarchar(30)");

                    b.Property<int>("Discount")
                        .HasColumnType("int");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(60)")
                        .HasMaxLength(60);

                    b.Property<decimal>("Price")
                        .HasColumnType("decimal(18,2)");

                    b.HasKey("Id");

                    b.HasIndex("CategoryName");

                    b.ToTable("Products");
                });

            modelBuilder.Entity("VapeShop.Models.Review", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("ProductId")
                        .HasColumnType("int");

                    b.Property<int>("Rating")
                        .HasColumnType("int");

                    b.Property<DateTime>("ReviewDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Rewiew")
                        .HasColumnType("nvarchar(100)")
                        .HasMaxLength(100);

                    b.Property<int>("UserEmail")
                        .HasColumnType("int");

                    b.HasKey("Id");

                    b.HasIndex("ProductId");

                    b.HasIndex("UserEmail");

                    b.ToTable("Reviews");
                });

            modelBuilder.Entity("VapeShop.Models.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("BirthDayDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("CreationTimestamp")
                        .HasColumnType("datetime2");

                    b.Property<string>("DisplayName")
                        .HasColumnType("nvarchar(60)")
                        .HasMaxLength(60);

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("nvarchar(60)")
                        .HasMaxLength(60);

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("nvarchar(60)")
                        .HasMaxLength(60);

                    b.Property<string>("Surname")
                        .IsRequired()
                        .HasColumnType("nvarchar(60)")
                        .HasMaxLength(60);

                    b.HasKey("Id");

                    b.HasAlternateKey("Email");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("VapeShop.Models.Media", b =>
                {
                    b.HasOne("VapeShop.Models.Category", null)
                        .WithOne("Media")
                        .HasForeignKey("VapeShop.Models.Media", "CategoryName");

                    b.HasOne("VapeShop.Models.Category", "Category")
                        .WithMany()
                        .HasForeignKey("CategoryName1");

                    b.HasOne("VapeShop.Models.Product", "Product")
                        .WithMany("Medias")
                        .HasForeignKey("ProductId");

                    b.HasOne("VapeShop.Models.User", "User")
                        .WithOne("Media")
                        .HasForeignKey("VapeShop.Models.Media", "UserUserEmail");
                });

            modelBuilder.Entity("VapeShop.Models.Product", b =>
                {
                    b.HasOne("VapeShop.Models.Category", "Category")
                        .WithMany("Products")
                        .HasForeignKey("CategoryName");
                });

            modelBuilder.Entity("VapeShop.Models.Review", b =>
                {
                    b.HasOne("VapeShop.Models.Product", "Product")
                        .WithMany("Reviews")
                        .HasForeignKey("ProductId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("VapeShop.Models.User", "User")
                        .WithMany("Reviews")
                        .HasForeignKey("UserEmail")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });
#pragma warning restore 612, 618
        }
    }
}
