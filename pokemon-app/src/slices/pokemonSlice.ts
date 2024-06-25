import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Pokemon } from "../models/Pokemon";
import { getPokemons } from "../services/api";
import { RootState } from "../store";

interface PokemonState {
  data: Pokemon[];
  pokemonByName: { [key: string]: Pokemon };
  types: string[];
  generations: string[];
  loading: boolean;
  error: string | null;
}

const initialState: PokemonState = {
  data: [],
  pokemonByName: {},
  types: [],
  generations: [],
  loading: false,
  error: null,
};

export const fetchPokemons = createAsyncThunk<Pokemon[]>(
  "pokemon/fetchPokemons",
  async () => {
    try {
      const response = await getPokemons();
      return response;
    } catch (error) {
      console.error("Error fetching pokemons:", error);
      throw error;
    }
  }
);

// Additional reducers for any CRUD operation can be added here later as project evolves.
export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPokemons.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPokemons.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;

        // Loading the hashmap/object of pokemon by name for easier lookup.
        state.pokemonByName = action.payload.reduce((acc, pokemon) => {
          acc[pokemon.name.toLowerCase()] = pokemon;
          return acc;
        }, {} as { [key: string]: Pokemon });

        // The logic below could potentially be placed on the backend and the API itself can return the list of types/generations.
        // Loading the list of types for centralized use.
        state.types = action.payload.reduce(
          (acc: string[], pokemon: Pokemon) => {
            const type1 = pokemon.types[0];
            const type2 = pokemon.types[1];
            if (type1 && !acc.includes(type1)) {
              acc.push(type1);
            }
            if (type2 && !acc.includes(type2)) {
              acc.push(type2);
            }
            return acc;
          },
          []
        );

        // Loading the list of generations for centralized use.
        state.generations = action.payload.reduce(
          (acc: string[], pokemon: Pokemon) => {
            const gen = pokemon.generation;
            if (gen && !acc.includes(gen)) {
              acc.push(gen);
            }
            return acc;
          },
          []
        );
      })
      // In the event that the data cannot be fetched.
      .addCase(fetchPokemons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch Pokémon";
      });
  },
});

export const selectPokemonByName = (state: RootState, name: string) =>
  state.pokemon.pokemonByName[name.toLowerCase()];

export default pokemonSlice.reducer;
