namespace Dumia.Http

open Owin
open Microsoft.Owin
open System
open System.Net.Http
open System.Web
open System.Web.Http
open System.Web.Http.Owin

[<Sealed>]
type Startup() = 
    
    let RegisterWebApi (app:IAppBuilder) = 
        let config = new HttpConfiguration()
        // Configure routing
        config.MapHttpAttributeRoutes()
        // Remove XML Formatter
        config.Formatters.Remove(config.Formatters.XmlFormatter) |> ignore
        app.UseWebApi(config)
    
    
    let RegisterCors (app:IAppBuilder) = 
        let options = Cors.CorsOptions()
        app.UseCors(options)

    let WelcomePage (app:IAppBuilder) = 
        app.UseWelcomePage("/")

    let ErrorPage (app:IAppBuilder) =
        app.UseErrorPage()
    
    member this.Configuration (app : IAppBuilder) = 
        RegisterWebApi(app)
        |> RegisterCors
        |> WelcomePage
        |> ErrorPage
        |> ignore
