module Domain.Http.Infrastructure

open Dumia.Domain
open Dumia.Infrastructure
open Dumia.Http.Controllers

open System.Web.Http.Dispatcher
open System.Web.Http.Controllers
open System

/// Registers an Disposable for Disposal at the end of the Request
let registerForDispose (x: #IDisposable) =
    System.Web.HttpContext.Current.DisposeOnPipelineCompleted(x) 
    |> ignore
    x

let (|InventoryController|_|) type' = 
    if type' = typeof<InventoryController> then 
        let context = SqlRepository.GetContext() |> registerForDispose        

        let fetchInventory () = 
            Rop.tryCatch SqlRepository.FetchInventory context

        let controller = new InventoryController(fetchInventory)
        Some(controller :> IHttpController)
    else None

let (|ProductController|_|) type' = 
    if type' = typeof<ProductController> then 
        let controller = new ProductController()
        Some(controller :> IHttpController)
    else None

type CompositionRoot() = 
    interface IHttpControllerActivator with
        member x.Create(request, controllerDescriptor, controllerType) = 
            match controllerType with
            | InventoryController controller -> controller
            | ProductController controller -> controller
            | _ -> invalidArg "controllerType" (sprintf "Unknown Controller type: %O" controllerType)
