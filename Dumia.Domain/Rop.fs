[<AutoOpen>]
module Dumia.Domain.Rop

// The two-track type
type Result<'TSuccess, 'TFailure> = 
    | Success of 'TSuccess
    | Failure of 'TFailure

// Convert a switch function into a two-track function
let bind f x = 
    match x with
    | Success s -> f s
    | Failure f -> Failure f

// Convert a one-track function into a two-track function
let map f x = 
    match x with
    | Success s -> Success(f s)
    | Failure f -> Failure f

let tryCatch f x = 
    try 
        f x |> Success
    with ex -> Failure ex.Message

let tryIgnore f = 
    try 
        f() |> ignore |> Success
    with ex -> Failure ex.Message
