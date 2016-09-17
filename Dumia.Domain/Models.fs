namespace Dumia.Domain

type Error =
| ProductNotFound of string

[<CLIMutable>]
type Quantity = uint32

[<CLIMutable>]
type Product = 
    { ProductID : int
      Code : string
      Name : string
      Price : decimal
      ImageUrl : string }

[<CLIMutable>]
type Inventory =
    { Product: Product
      Quantity: int }

[<CLIMutable>]
type Cart = 
    { UserID : int
      Items : list<Product * Quantity> }

type OrderItem = OrderItem of Product

[<CLIMutable>]
type Order = 
    { OrderID : int
      UserID : int
      Items : list<OrderItem * Quantity> }