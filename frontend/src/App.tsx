import React, { useContext, useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import RouteDef from "./route_definition";
import AllEntries from "./routes/AllEntries";
import EditEntry from "./routes/EditEntry";
import NewEntry from "./routes/NewEntry";
import { DarkModeContext, DarkModeProvider } from "./utilities/darkModeContext";
import { EntryProvider } from "./utilities/globalContext";

export default function App() {
  return (
    <DarkModeProvider>
      <EntryProvider>
        <RouteDef />
      </EntryProvider>
    </DarkModeProvider>
  );
}
