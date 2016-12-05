namespace Dumia.Test

open NUnit.Framework
open Dumia.Http.Controllers
open Dumia.Domain

[<TestFixture>]
module InventoryController = 
    open System.Web.Http.Results
    
    type OkInventory = OkNegotiatedContentResult<Inventory []>
    
    type BadRequest = BadRequestErrorMessageResult
    
    [<Test>]
    let ``Test that Inventory Items Return Data``() = 

        //Arrange
        let inventories : Inventory [] = [||]
        let getInventory(): Result<Inventory[],string> = Success inventories
        let controller = new InventoryController(getInventory)

        //Act
        let result = controller.Get()

        //Assert
        match result with
        | :? OkInventory as okResult -> Assert.IsTrue (okResult.Content = inventories)
        | :? BadRequest as bad -> failwith bad.Message
        | _ -> failwith "Unexpected Response"

[<TestFixture>]
module ProductController = 
    open System.Web.Http.Results
    
    [<Test>]
    let ``Ensure that Product Get returns Array``() = 

        //Arrange
        let expected = [| 1; 2; 3; 4 |]
        let controller = new ProductController()

        //Act
        let result = controller.Get()

        //Assert
        Assert.AreEqual(result.Content, expected)
