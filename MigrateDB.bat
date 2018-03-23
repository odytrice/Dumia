REM Migrated Database
packages\FluentMigrator.1.6.2\tools\Migrate.exe --db=sqlserver --target=Dumia.Migrations\bin\Debug\Dumia.Migrations.dll --configPath=Dumia.Http\web.config --c=Dumia %*

REM Update Database DBML file
.\utils\SqlMetal.exe /server:"(local)" /database:dumia /user:admin1 /password:admin1 /dbml:"Dumia.Infrastructure/Database.dbml"

