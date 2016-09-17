module SqlProvider

open FSharp.Data.TypeProviders

[<Literal>]
let internal DumiaConn = "Data Source=(local);Initial Catalog=Dumia;Integrated Security=True;User ID=admin1;Password=admin1;MultipleActiveResultSets=True;App=EntityFramework"

type DumiaDB = SqlDataConnection<DumiaConn>

type DBContext = DumiaDB.ServiceTypes.SimpleDataContextTypes.Dumia