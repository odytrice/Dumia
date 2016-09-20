namespace Dumia.Domain

type Error =
| ProductNotFound of string

type Quantity = uint32

type Product = 
    { ProductID : int
      Code : string
      Name : string
      Price : decimal
      ImageUrl : string }

type Inventory =
    { Product: Product
      Quantity: int }

type Cart = 
    { UserID : int
      Items : list<Product * Quantity> }

type OrderItem = OrderItem of Product

type Order = 
    { OrderID : int
      UserID : int
      Items : list<OrderItem * Quantity> }