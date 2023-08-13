﻿// <auto-generated />
using System;
using BankApi.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace bank_api.Migrations
{
    [DbContext(typeof(BankApiContext))]
    partial class BankApiContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.10");

            modelBuilder.Entity("BankApi.Entities.Account", b =>
                {
                    b.Property<int>("AccId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<long>("AccNo")
                        .HasMaxLength(8)
                        .HasColumnType("INTEGER");

                    b.Property<double>("Balance")
                        .HasColumnType("REAL");

                    b.Property<long>("CardNo")
                        .HasMaxLength(12)
                        .HasColumnType("INTEGER");

                    b.Property<int>("CustId")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("CustomerCustId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Pin")
                        .HasMaxLength(4)
                        .HasColumnType("INTEGER");

                    b.HasKey("AccId");

                    b.HasIndex("CustomerCustId");

                    b.ToTable("Account");
                });

            modelBuilder.Entity("BankApi.Entities.Admin", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Username")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Admin");
                });

            modelBuilder.Entity("BankApi.Entities.Customer", b =>
                {
                    b.Property<int>("CustId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasMaxLength(500)
                        .HasColumnType("TEXT");

                    b.Property<string>("City")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("TEXT");

                    b.Property<long>("Contact")
                        .HasMaxLength(10)
                        .HasColumnType("INTEGER");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("TEXT");

                    b.Property<int>("Pincode")
                        .HasMaxLength(6)
                        .HasColumnType("INTEGER");

                    b.HasKey("CustId");

                    b.ToTable("Customer");
                });

            modelBuilder.Entity("BankApi.Entities.Account", b =>
                {
                    b.HasOne("BankApi.Entities.Customer", "Customer")
                        .WithMany("Accounts")
                        .HasForeignKey("CustomerCustId");

                    b.Navigation("Customer");
                });

            modelBuilder.Entity("BankApi.Entities.Customer", b =>
                {
                    b.Navigation("Accounts");
                });
#pragma warning restore 612, 618
        }
    }
}