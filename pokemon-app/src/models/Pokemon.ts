export interface Stat {
  name: string;
  value: number;
}

export interface Evolution {
  from: string | null;
  to: string[];
}

export interface Pokemon {
  number: number;
  name: string;
  generation: string;
  height: number;
  weight: number;
  types: string[];
  stats: Stat[];
  moves: string[];
  abilities: string[];
  evolution: Evolution | null;
  image: string;
}

export function createDefaultPokemon(): Pokemon {
  return {
    number: 0,
    name: '',
    generation: '',
    height: 0,
    weight: 0,
    types: [],
    stats: [],
    moves: [],
    abilities: [],
    evolution: null,
    image: ''
  };
}