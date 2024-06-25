import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import Header from "../Shared/Header";
import { AppDispatch, RootState } from "../../store";
import { useDispatch, useSelector } from "react-redux";
import { fetchPokemons, selectPokemonByName } from "../../slices/pokemonSlice";
import { Stat } from "../../models/Pokemon";

const PokemonDetails: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch: AppDispatch = useDispatch();

  // This will lookup the pokemon from the pokemonByName object/hashmap in store.
  // This is more efficient than iterating through the whole Pokemon array.
  const pokemon = useSelector((state: RootState) =>
    selectPokemonByName(state, name || "")
  );

  useEffect(() => {
    // In the case that the page reloads and store data does not persist, fetch data again.
    if (!pokemon) {
      dispatch(fetchPokemons()).then(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [name, pokemon, dispatch]);

  const handleEvolutionClick = (evolutionName: string | null | undefined) => {
    if (evolutionName) {
      navigate(`/pokemon/${evolutionName}`, { state: { evolutionName } });
    }
  };

  return (
    <div key={name}>
      <Header />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          
        }}
      >
        <Grid
          container
          justifyContent="center"
          sx={{ maxWidth: 1500, margin: "1rem", maxHeight: 1000 }}
        >
          <Grid item xs={10}>
            <Card>
              <CardContent>
                {loading ? (
                  <Typography variant="body1" sx={{ textAlign: "center" }}>
                    Loading...
                  </Typography>
                ) : pokemon ? (
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} sx={{ textAlign: "center" }}>
                      <Avatar
                        src={pokemon.image}
                        sx={{
                          width: 250,
                          height: 250,
                          margin: "auto",
                          display: "block",
                        }}
                      />
                      <Typography variant="h5" component="div">
                        {pokemon.name} (#{pokemon.number})
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        GENERATION: {pokemon.generation}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        HEIGHT: {pokemon.height}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        WEIGHT: {pokemon.weight}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        TYPES: {pokemon.types.join(", ")}
                      </Typography>
                      <Typography variant="subtitle1" color="text.secondary">
                        ABILITIES: {pokemon.abilities.join(", ")}
                      </Typography>
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        sx={{ width: "100%", textAlign: "center" }}
                      >
                        STATS:
                      </Typography>
                      {pokemon.stats.map((stat: Stat) => (
                        <Typography key={stat.name} variant="body1">
                          {stat.name}: {stat.value}
                        </Typography>
                      ))}
                    </Grid>

                    <Grid
                      item
                      xs={12}
                      sm={6}
                      sx={{
                        padding: "1rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        textAlign: "center",
                      }}
                    >
                      <Typography
                        variant="subtitle1"
                        color="text.secondary"
                        component="div"
                        sx={{ width: "100%", textAlign: "center" }}
                      >
                        MOVES:
                      </Typography>
                      <Typography variant="body1">
                        {pokemon.moves.join(", ")}
                      </Typography>
                    </Grid>
                  </Grid>
                ) : (
                  <Typography variant="body1">
                    No Pokémon data found.
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={2}>
              <Grid item xs={6} sx={{ textAlign: "left" }}>
                <Button
                  variant="contained"
                  disabled={!pokemon?.evolution?.from}
                  onClick={() => handleEvolutionClick(pokemon?.evolution?.from)}
                  style={{ marginTop: "1rem", fontFamily: "Fira Code" }}
                  size= "large"
                >
                  Evolution From: {pokemon?.evolution?.from || "N/A"}
                </Button>
              </Grid>
              <Grid item xs={6} sx={{ textAlign: "right" }}>
                {pokemon?.evolution?.to && pokemon.evolution.to.length > 0 ? (
                  pokemon.evolution.to.map((p) => (
                    <Button
                      key={p}
                      variant="contained"
                      onClick={() => handleEvolutionClick(p)}
                      style={{ margin: "1rem", fontFamily: "Fira Code" }}
                      size= "large"
                    >
                      Evolution To: {p}
                    </Button>
                  ))
                ) : (
                  <Button
                    variant="contained"
                    disabled
                      style={{ margin: "1rem", fontFamily: "Fira Code" }}
                      size= "large"
                  >
                    Evolution To: N/A
                  </Button>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default PokemonDetails;
