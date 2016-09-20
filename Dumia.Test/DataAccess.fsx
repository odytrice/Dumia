#load "Scripts/load-references-debug.fsx"

open System
open Dumia.Infrastructure
open Dumia.Domain

(* Script to Test Data Access *)

let context = SqlRepository.GetContext()

context.DataContext.Log <- Console.Out

let getData = SqlRepository.FetchInventory(context)
let rand = new Random()

let stockInventory = SqlRepository.StockInventory context

SqlRepository.FetchProducts(context)
|> Seq.map (fun p -> p.ProductID, Mapper.mapQuantity (rand.Next(1, 10)))
|> Seq.toArray
//|> SqlRepository.StockInventory context
