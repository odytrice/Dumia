module Mapper

open SqlProvider
open Dumia.Domain

let mapProduct (product : DumiaDB.ServiceTypes.Product) = 
    { ProductID = product.ProductID
      Code = product.Code
      Name = product.Name
      Price = product.Price
      ImageUrl = product.ImageUrl }

let mapQuantity i = 
    if i < 0 then failwith "Invalid Quantity"
    else uint32 i


let createProduct (product: Product) =
    let entity = DumiaDB.ServiceTypes.Product();
    entity.Code <- product.Code
    entity.ImageUrl <- product.ImageUrl
    entity.Name <- product.Name
    entity.Price <- product.Price
    entity


let createInventory productID (quantity:Quantity) =
    let entity = DumiaDB.ServiceTypes.Inventory();
    entity.ProductID <- productID
    entity.Quantity <- int quantity
    entity