module FluentRunner

open FluentMigrator.Runner.Announcers
open System.Reflection
open FluentMigrator.Runner.Initialization
open FluentMigrator.Runner.Processors.SqlServer
open FluentMigrator
open FluentMigrator.Runner

let MigrateToLatest connectionString =

    // var announcer = new NullAnnouncer();
    let announcer = new TextWriterAnnouncer(fun s -> System.Diagnostics.Debug.WriteLine(s))
    let assembly = Assembly.GetExecutingAssembly()

    let migrationContext = new RunnerContext(announcer)

    migrationContext.Namespace <- assembly.GetTypes() 
                                    |> Seq.filter (fun t -> t.IsSubclassOf(typeof<Migration>))
                                    |> Seq.map (fun t -> t.Namespace)
                                    |> Seq.head

    let options = { new IMigrationProcessorOptions with 
                        member this.ProviderSwitches = ""
                        member this.PreviewOnly = false
                        member this.Timeout = 60 };
    
    let factory = new SqlServer2008ProcessorFactory();

    use processor = factory.Create(connectionString, announcer, options)
    let runner = new MigrationRunner(assembly, migrationContext, processor);
    runner.MigrateUp(true);