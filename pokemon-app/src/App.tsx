import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import PokemonDetails from "./components/PokemonDetails/PokemonDetails";
import { fetchPokemons } from "./slices/pokemonSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { fetchSummary } from "./slices/summarySlice";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";

const App: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  // Fetching the Pokemon/Summary data so that it can be used universally by the components.
  useEffect(() => {
    dispatch(fetchPokemons());
    dispatch(fetchSummary());
  }, [dispatch]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
