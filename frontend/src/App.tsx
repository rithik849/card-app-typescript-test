import React, { useContext, useEffect } from "react";
import NavBar from './components/NavBar'
import AllEntries from './routes/AllEntries'
import NewEntry from './routes/NewEntry'
import EditEntry from './routes/EditEntry'
import { EntryProvider } from './utilities/globalContext'
import {DarkModeContext, DarkModeProvider} from './utilities/darkModeContext'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import RouteDef from "./route_definition";

export default function App() {
  

  return (
    <DarkModeProvider>
    <EntryProvider>
        <RouteDef/>
    </EntryProvider>
    </DarkModeProvider>
    
  );
}
