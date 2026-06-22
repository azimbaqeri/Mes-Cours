import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-icons";
import "./index.css";
import App from "./App.tsx";
import MovieDetails from "./MovieDetails";
import Search from "./Search";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/search" element={<Search />} />
        <Route path="/MovieDetails/:id" element={<MovieDetails />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
