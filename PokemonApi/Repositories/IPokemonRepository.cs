using System.Collections.Generic;
using PokemonApi.Models;

namespace PokemonApi.Repositories
{
    public interface IPokemonRepository
    {
        List<Pokemon> GetAllPokemon();
        Summary GetSummary();
    }
}
