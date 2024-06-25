using PokemonApi.Models;
using System.Collections.Generic;

namespace PokemonApi.Services
{
    public interface IPokemonService
    {
        List<Pokemon> GetAllPokemon();
        Summary GetSummary();

    }
}
