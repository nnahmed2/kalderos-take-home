import React from "react";
import { RootState } from "../../store";
import { useSelector } from "react-redux";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Summary component with overall statistics for Dashboard
const SummarySection: React.FC = () => {
  // Retrieving summary data from store
  const summary = useSelector((state: RootState) => state.summary.data);

  return (
    <div>
      <Typography
        variant="h5"
        gutterBottom
        sx={{ textAlign: "center", marginTop: "1rem" }}
      >
        What a crazy time, Pokemon are running rampant!
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ textAlign: "center" }}>
        Thanks to our Park Rangers, we now have a comprehensive database of the
        little guys.
      </Typography>

      <Grid
        container
        spacing={3}
        justifyContent="center"
        sx={{ maxWidth: 1500, padding: "1rem" }}
      >
        
        <Grid item xs={12} md={6} lg={4}>
          <Card
            sx={{
              height: "auto",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardContent sx={{ textAlign: "center", flexGrow: 1 }}>
              <Typography variant="h6" gutterBottom>
                Total Pokemon Species
              </Typography>
              <Typography variant="h4" color="secondary">
                {summary?.totalPokemon}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Accordion
            sx={{ height: "auto", display: "flex", flexDirection: "column" }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ textAlign: "center", width: "100%" }}
              >
                Pokemon per Type
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ textAlign: "center", flexGrow: 1 }}>
              <CardContent>
                {Object.entries(summary?.pokemonPerType || {}).map(
                  ([type, count]) => (
                    <Typography key={type} variant="body1">
                      {`${type}: ${count}`}
                    </Typography>
                  )
                )}
              </CardContent>
            </AccordionDetails>
          </Accordion>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Accordion
            sx={{ height: "auto", display: "flex", flexDirection: "column" }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography
                variant="h6"
                gutterBottom
                sx={{ textAlign: "center", width: "100%" }}
              >
                Pokemon per Generation
              </Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ textAlign: "center", flexGrow: 1 }}>
              <CardContent>
                {Object.entries(summary?.pokemonPerGeneration || {}).map(
                  ([generation, count]) => (
                    <Typography key={generation} variant="body1">
                      {`${generation}: ${count}`}
                    </Typography>
                  )
                )}
              </CardContent>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </div>
  );
};

export default SummarySection;
