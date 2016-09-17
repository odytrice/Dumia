namespace Dumia.Http

open Owin
open Microsoft.Owin
open System
open System.Net.Http
open System.Web
open System.Web.Http
open System.Web.Http.Owin
open System.Web.Http.Dispatcher
open Domain.Http.Infrastructure

[<Sealed>]
type Startup() = 
    
    let registerWebApi (app:IAppBuilder) = 
        let config = new HttpConfiguration()
        // Configure routing
        config.MapHttpAttributeRoutes()
        // Remove XML Formatter
        config.Formatters.Remove(config.Formatters.XmlFormatter) |> ignore

        let serializer = config.Formatters.JsonFormatter.SerializerSettings

        config.Services.Replace(typeof<IHttpControllerActivator>, CompositionRoot())

        app.UseWebApi(config)
    
    
    let registerCors (app:IAppBuilder) = 
        let options = Cors.CorsOptions()
        app.UseCors(options)

    let welcomePage (app:IAppBuilder) = 
        app.UseWelcomePage("/")

    let errorPage (app:IAppBuilder) =
        app.UseErrorPage()
    
    member this.Configuration (app : IAppBuilder) = 
        registerWebApi(app)
        |> registerCors
        |> welcomePage
        |> errorPage
        |> ignore
