namespace Dumia.Http.Controllers

open System.Web.Http

[<RoutePrefix("api/item")>]
type ItemController() = 
    inherit ApiController()

    [<HttpGet; Route("")>]
    member this.Get() = this.Ok([| 1; 2; 3; 4 |])
