using Microsoft.AspNetCore.Mvc;
using PokemonApi.Models;
using PokemonApi.Services;
using System.Collections.Generic;

namespace PokemonApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PokemonController : ControllerBase
    {
        private readonly IPokemonService _pokemonService;

        public PokemonController(IPokemonService pokemonService)
        {
            _pokemonService = pokemonService;
        }

        [HttpGet]
        public ActionResult<List<Pokemon>> GetAllPokemon()
        {
            var pokemons = _pokemonService.GetAllPokemon();
            return Ok(pokemons);
        }

        [HttpGet("summary")]
        public ActionResult<Summary> GetSummary()
        {
            var summary = _pokemonService.GetSummary();
            return Ok(summary);
        }
    }
}
