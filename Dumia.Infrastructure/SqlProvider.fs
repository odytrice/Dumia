module SqlProvider

open FSharp.Data.TypeProviders
open System.Configuration

[<Literal>]
let DumiaConn = "Data Source=(local);Initial Catalog=Dumia;Integrated Security=False;User ID=admin1;Password=admin1;MultipleActiveResultSets=True;App=EntityFramework"

type DumiaDB = SqlDataConnection<DumiaConn>

type DBContext = DumiaDB.ServiceTypes.SimpleDataContextTypes.Dumia