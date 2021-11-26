import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieDetails, MovieSearch, FavoriteMovies } from "./pages";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<MovieSearch />} />
          <Route path="movie-details/:movieID" element={<MovieDetails />} />
          <Route path="favorite-movies" element={<FavoriteMovies />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
