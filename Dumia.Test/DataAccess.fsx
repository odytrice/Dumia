#load "Scripts/load-references-debug.fsx"

open System
open Dumia.Infrastructure
open Dumia.Domain

(* Script to Test Data Access *)

let context = SqlRepository.GetContext()
context.DataContext.Log <- Console.Out

let getData = SqlRepository.FetchInventory(context)

let generateQty () =
    let rand = Random().Next(1,10)
    Mapper.mapQuantity rand

let pickIdAndQty (p:Product) = [| p.ProductID, generateQty() |]

let stockInventory = SqlRepository.StockInventory context

SqlRepository.FetchProducts(context)
|> Seq.map pickIdAndQty
|> Seq.iter stockInventory