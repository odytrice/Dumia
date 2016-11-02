namespace Dumia.Infrastructure.Migrations

open FluentMigrator
open FluentMigrator.Runner.Extensions

type Product = { ProductID: int; Name : string; Price: decimal; ImageUrl: string; Code: string }
type Inventory = { ProductID:int; Quantity: int }

[<Migration(1L)>]
type ``Migration 01``() = 
    inherit Migration()

    override this.Up() =

        //Create Product Table
        this.Create
            .Table("Product")
            .WithColumn("ProductID").AsInt32().Identity().PrimaryKey()
            .WithColumn("Code").AsString(250)
            .WithColumn("Name").AsString(System.Int32.MaxValue)
            .WithColumn("ImageUrl").AsString(System.Int32.MaxValue)
            .WithColumn("Price").AsCurrency()
        |> ignore

        //Create Inventory Table
        this.Create
            .Table("Inventory")
            .WithColumn("ProductID").AsInt32().PrimaryKey().ForeignKey("Product","ProductID")
            .WithColumn("Quantity").AsInt32()
        |> ignore

        //Insert Products
        this.Insert
            .IntoTable("Product")
            .WithIdentityInsert()
            .Row({ ProductID = 1; Name = "Ladies Bag"; Price = 120.00M; ImageUrl = "/content/images/bag.jpg"; Code = "Bag-01" })
            .Row({ ProductID = 2; Name = "Blanket"; Price = 100.00M; ImageUrl = "/content/images/blanket.jpg"; Code = "Blanket-01" })
            .Row({ ProductID = 3; Name = "Knives"; Price = 20.00M; ImageUrl = "/content/images/knife.jpg"; Code = "Knife-01" })
            .Row({ ProductID = 4; Name = "Pillows"; Price =  45.00M; ImageUrl = "/content/images/pillow.jpg"; Code = "Pillow-01" })
            .Row({ ProductID = 5; Name = "School Bag"; Price = 150.00M; ImageUrl = "/content/images/schoolbag.jpg"; Code = "Bag-02" })
            .Row({ ProductID = 6; Name = "Sony Television"; Price = 400.00M; ImageUrl = "/content/images/tv.jpg"; Code = "TV-01" })
        |> ignore

        //Insert Inventory
        this.Insert
            .IntoTable("Inventory")
            .Row({ ProductID = 1; Quantity = 13 })
            .Row({ ProductID = 2; Quantity = 13 })
            .Row({ ProductID = 3; Quantity = 13 })
            .Row({ ProductID = 4; Quantity = 13 })
            .Row({ ProductID = 5; Quantity = 13 })
            .Row({ ProductID = 6; Quantity = 13 })
        |> ignore

    override this.Down() = 
        this.Delete.Table("Inventory") |> ignore
        this.Delete.Table("Product") |> ignore