#load "Scripts/load-references-debug.fsx"

open System
open Dumia.Infrastructure
open Dumia.Domain

(* Script to Test Data Access *)

let context = SqlRepository.GetContext()
context.DataContext.Log <- Console.Out

let getData = SqlRepository.FetchInventory(context)
let products = getData |> Array.map (fun d -> d.Product)
Newtonsoft.Json.JsonConvert.SerializeObject(products)