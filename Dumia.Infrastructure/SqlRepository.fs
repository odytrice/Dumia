module SqlRepository

open Dumia.Domain
open SqlProvider
open Mapper
open System.Configuration
open FSharp.Configuration

type Settings = AppSettings<"App.Config">

//Create the Context
let GetContext() = 

    //Create an Instance of the TypeProvider Context
    let context = DumiaDB.GetDataContext()

    //Set Runtime Connection String
    context.Connection.ConnectionString <- Settings.ConnectionStrings.Dumia

    context

/// Fetches all the Products that are in Stock and their Quantities
let FetchInventory (context : DBContext) = 
    query { 
        for product in context.Product do
        where (product.Inventory.Quantity > 0)
        select (product, product.Inventory.Quantity)
    }
    |> Seq.map (fun (p, i) -> { Product = (mapProduct p); Quantity =  i })
    |> Seq.toArray

let FetchProducts (context:DBContext) =
    query { 
        for product in context.Product do
            select product
    }
    |> Seq.map mapProduct
    |> Seq.toArray
    

/// Stocks Inventory with Products supplied
let StockInventory (context : DBContext) = 

    // Pre-Compute Products
    let inventory = context.Inventory |> Seq.toArray

    // Stock a Single Product
    let stockProduct (productID,quantity) = 
        let stock = inventory |> Seq.tryFind (fun p -> p.ProductID = productID)

        //Create Inventory if it doesn't Exist and Update the Quantity if it does
        match stock with
        | Some entity -> entity.Quantity <- entity.Quantity + int quantity
        | None -> 
            let inventory = createInventory productID quantity
            context.Inventory.InsertOnSubmit(inventory)

    // Stock Multiple Products
    let stockProducts (stock : (int * Quantity)[]) =
        stock |> Seq.iter stockProduct 
        context.DataContext.SubmitChanges()

    stockProducts

