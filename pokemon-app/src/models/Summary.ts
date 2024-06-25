export interface Summary {
  totalPokemon: number,
  pokemonPerType: Record<string, number>,
  pokemonPerGeneration: Record<string, number>
}