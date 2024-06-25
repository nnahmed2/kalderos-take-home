import React, { useState, useEffect } from "react";
import { Pokemon } from "../../models/Pokemon";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { RootState } from "../../store";
import {
  TextField,
  MenuItem,
  InputLabel,
  FormControl,
  Grid,
  Typography,
  Button,
} from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import "@fontsource/fira-code";

// Table component displaying all available Pokemon
const PokemonTable: React.FC = () => {
  // Retrieving pokemon, type, generation lists from store
  const { data: pokemons } = useSelector((state: RootState) => state.pokemon);
  const typeList = useSelector((state: RootState) => state.pokemon.types);
  const generationList = useSelector(
    (state: RootState) => state.pokemon.generations
  );
  
  const [filteredPokemon, setFilteredPokemon] = useState<Pokemon[]>([]);
  const [filterOptions, setFilterOptions] = useState<{
    number: string;
    name: string;
    type: string;
    generation: string;
    move: string;
  }>({
    number: "",
    name: "",
    type: "",
    generation: "",
    move: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    applyFilters();
  }, [pokemons, filterOptions]);

  const handleFilterChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | SelectChangeEvent
  ) => {
    const { name, value } = event.target;
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [name as string]: value as string,
    }));
  };

  const handleClearFilters = () => {
    setFilterOptions({
      number: "",
      name: "",
      type: "",
      generation: "",
      move: "",
    });
  };

  const applyFilters = () => {
    let filteredList = pokemons.filter((pokemon) => {
      return (
        pokemon.number.toString().includes(filterOptions.number) &&
        pokemon.name.toLowerCase().includes(filterOptions.name.toLowerCase()) &&
        pokemon.types.some((type) =>
          type.toLowerCase().includes(filterOptions.type.toLowerCase())
        ) &&
        pokemon.generation
          .toLowerCase()
          .includes(filterOptions.generation.toLowerCase()) &&
        pokemon.moves.toString().includes(filterOptions.move)
      );
    });
    setFilteredPokemon(filteredList);
  };

  const handleRowClick = (name: string) => {
    name = name.toLowerCase().trim();
    navigate(`/pokemon/${name}`, { state: { name } });
  };

  // Column definitions for the data grid
  const columns: GridColDef[] = [
    { field: "number", headerName: "Number", flex: 1, sortable: true },
    { field: "name", headerName: "Name", flex: 1, sortable: true },
    { field: "generation", headerName: "Generation", flex: 1, sortable: true },
    { field: "height", headerName: "Height", flex: 1, sortable: true },
    { field: "weight", headerName: "Weight", flex: 1, sortable: true },
    { field: "type1", headerName: "Type 1", flex: 1, sortable: true },
    { field: "type2", headerName: "Type 2", flex: 1, sortable: true },
    { field: "movesCount", headerName: "Moves Count", flex: 1, sortable: true },
  ];

  return (
    <div style={{ marginBottom: "3rem" }}>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ textAlign: "center", margin: "1rem" }}
      >
        Take a gander...
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ textAlign: "center" }}>
        Click on a Pokemon to find out more details!
      </Typography>
      <Grid
        container
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ padding: "1rem", width: "100%" }}
      >
        <Grid item xs>
          <FormControl fullWidth>
            <TextField
              name="number"
              label="Number"
              value={filterOptions.number}
              onChange={handleFilterChange}
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item xs>
          <FormControl fullWidth>
            <TextField
              name="name"
              label="Name"
              value={filterOptions.name}
              onChange={handleFilterChange}
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item xs>
          <FormControl fullWidth>
            <TextField
              name="move"
              label="Move"
              value={filterOptions.move}
              onChange={handleFilterChange}
              variant="outlined"
            />
          </FormControl>
        </Grid>
        <Grid item xs>
          <FormControl fullWidth>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              labelId="type-label"
              id="type"
              name="type"
              value={filterOptions.type}
              onChange={handleFilterChange}
              label="Type"
              variant="outlined"
            >
              <MenuItem value="">All</MenuItem>
              {typeList.map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs>
          <FormControl fullWidth>
            <InputLabel id="generation-label">Generation</InputLabel>
            <Select
              labelId="generation-label"
              id="generation"
              name="generation"
              value={filterOptions.generation}
              onChange={handleFilterChange}
              label="Generation"
              variant="outlined"
            >
              <MenuItem value="">All</MenuItem>
              {generationList.map((generation) => (
                <MenuItem key={generation} value={generation}>
                  {generation}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
          <Button
            variant="contained"
            color="success"
            onClick={handleClearFilters}
            sx={{ width: "30%", textAlign: "center" }}
            style={{ fontFamily: "Fira Code" }}
          >
            Clear All Filters
          </Button>
        </Grid>
      </Grid>
      <div style={{ height: 750, width: "100%" }}>
        <DataGrid
          rows={filteredPokemon.map((pokemon) => ({
            id: pokemon.number,
            number: pokemon.number,
            name: pokemon.name,
            generation: pokemon.generation,
            height: pokemon.height,
            weight: pokemon.weight,
            type1: pokemon.types[0] || "",
            type2: pokemon.types[1] || "",
            movesCount: pokemon.moves.length,
          }))}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
          }}
          onRowClick={(params) => handleRowClick(params.row.name)}
        />
      </div>
    </div>
  );
};

export default PokemonTable;
