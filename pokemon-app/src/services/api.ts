import axios from 'axios';
import { Pokemon } from '../models/Pokemon';
import { Summary } from '../models/Summary';

const API_URL = '/api/Pokemon';  

export const getPokemons = async (): Promise<Pokemon[]> => {
  try {
    const response = await axios.get<Pokemon[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
    throw error;
  }
};

export const getPokemonByNumber = async (number: number): Promise<Pokemon> => {
  try {
    const response = await axios.get<Pokemon>(`${API_URL}/${number}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching Pokemon data:', error);
    throw error;
  }
};

export const getSummary = async (): Promise<Summary> => {
  try {
    const response = await axios.get<Summary>(`${API_URL}/summary`);
    return response.data;
  } catch (error) {
    console.error('Error fetching summary data:', error);
    throw error;
  }
};
