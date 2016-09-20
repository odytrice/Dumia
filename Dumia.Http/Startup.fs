namespace Dumia.Http

open Owin
open Microsoft.Owin
open Newtonsoft.Json
open System
open System.Net.Http
open System.Web
open System.Web.Http
open System.Web.Http.Owin
open System.Web.Http.Dispatcher
open Domain.Http.Infrastructure
open System.Net.Http.Formatting
open System.Web.Http.Cors

[<Sealed>]
type Startup() = 

    let registerWebApi (app : IAppBuilder) = 

        let config = new HttpConfiguration()
        // Configure routing
        config.MapHttpAttributeRoutes()
        
        // Remove XML Formatter and Fix Json Camel Case
        config.Formatters.Remove(config.Formatters.XmlFormatter) |> ignore
        config.Formatters.JsonFormatter.SerializerSettings.ContractResolver <- Serialization.DefaultContractResolver()

        config.EnableCors(EnableCorsAttribute("*","*","*"))

        config.Services.Replace(typeof<IHttpControllerActivator>, CompositionRoot())
        app.UseWebApi(config)

    
    let registerCors (app : IAppBuilder) = 

        let options = Cors.CorsOptions()
        app.UseCors(Cors.CorsOptions.AllowAll)
    
    let customPages (app : IAppBuilder) = 
        app.UseWelcomePage("/").UseErrorPage()

    member this.Configuration(app : IAppBuilder) = 
        registerWebApi (app)
        //|> registerCors
        |> customPages
        |> ignore
