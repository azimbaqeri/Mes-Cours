import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "react-icons";
import "./index.css";
import App from "./App.tsx";
import MovieDetails from "./MovieDetails";
import Search from "./Search";
import Header from "./Header";
import Footer from "./Footer";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/search" element={<Search />} />
        <Route path="/MovieDetails/:id" element={<MovieDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  </StrictMode>,
);
