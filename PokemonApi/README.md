# Welcome to the Pokemon API!

This API provides endpoints to retrieve information about the Pokémon. It was designed to serve data from a static JSON file.

To run the API, make sure to have the following installed if you don't already have it:
.NET SDK (v8) - https://dotnet.microsoft.com/en-us/download

#### `dotnet run`

To run the app you can use the above command.

## More about design

I designed this for the static JSON file, so it is fairly straightforward and pulls all the data at once. If the data was located in a database, then I would configure the API endpoints to pull out only essential data per request at a time to limit bandwidth usage.
