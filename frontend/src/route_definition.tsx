import React, { useContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import AllEntries from "./routes/AllEntries";
import EditEntry from "./routes/EditEntry";
import NewEntry from "./routes/NewEntry";
import { DarkModeContext, DarkModeProvider } from "./utilities/darkModeContext";

export default function RouteDef() {
  const [dark, setDark] = useContext(DarkModeContext);

  return (
    <div className={`h-screen ${dark ? "dark" : ""}`}>
      <Router>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<AllEntries />}></Route>
          <Route path="create" element={<NewEntry />}></Route>
          <Route path="edit/:id" element={<EditEntry />}></Route>
        </Routes>
      </Router>
    </div>
  );
}
