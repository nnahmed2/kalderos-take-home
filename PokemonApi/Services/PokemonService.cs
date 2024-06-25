using PokemonApi.Models;
using PokemonApi.Repositories;
using System.Collections.Generic;

namespace PokemonApi.Services
{
    public class PokemonService : IPokemonService
    {
        private readonly IPokemonRepository _pokemonRepository;

        public PokemonService(IPokemonRepository pokemonRepository)
        {
            _pokemonRepository = pokemonRepository;
        }

        public List<Pokemon> GetAllPokemon()
        {
            return _pokemonRepository.GetAllPokemon();
        }

        public Summary GetSummary()
        {
            return _pokemonRepository.GetSummary();
        }

    }
}
