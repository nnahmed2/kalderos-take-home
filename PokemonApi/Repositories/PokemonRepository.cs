using System.Collections.Generic;
using System.IO;
using System.Linq;
using Newtonsoft.Json;
using PokemonApi.Models;

namespace PokemonApi.Repositories
{
    public class PokemonRepository : IPokemonRepository
    {
        private List<Pokemon> _pokemons;
        private async Task InitializeAsync()
        {
            try
            {
                using (var stream = new FileStream("Data/pokemon.json", FileMode.Open, FileAccess.Read, FileShare.Read, 4096, useAsync: true))
                using (var reader = new StreamReader(stream))
                {
                    string jsonData = await reader.ReadToEndAsync();
                    _pokemons = JsonConvert.DeserializeObject<List<Pokemon>>(jsonData);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error loading pokemon data: {ex.Message}");
            }
        }
        public PokemonRepository()
        {
            InitializeAsync().Wait();
        }

        public List<Pokemon> GetAllPokemon()
        {
            return _pokemons;
        }

        public Summary GetSummary()
        {
            var summary = new Summary
            {
                TotalPokemon = _pokemons.Count,
                PokemonPerType = _pokemons
                    .SelectMany(p => p.Types)
                    .GroupBy(t => t)
                    .ToDictionary(g => g.Key, g => g.Count()),
                PokemonPerGeneration = _pokemons
                    .GroupBy(p => p.Generation)
                    .ToDictionary(g => g.Key, g => g.Count())
            };

            return summary;
        }


    }
}
