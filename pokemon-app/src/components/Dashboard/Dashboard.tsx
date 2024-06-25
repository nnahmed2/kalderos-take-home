import React from "react";
import PokemonTable from "./PokemonTable";
import SummarySection from "./SummarySection";
import { Stack } from "@mui/material";
import Header from "../Shared/Header";

const Dashboard: React.FC = () => {
  return (
    <div>
      <Header />
      <Stack spacing={1}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <SummarySection />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <PokemonTable />
        </div>
      </Stack>
    </div>
  );
};

export default Dashboard;
