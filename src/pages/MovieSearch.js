import React, { useState, useEffect } from "react";
import { Grid, Pagination } from "@mui/material";
import { Link } from "react-router-dom";
import { moviesActions } from "../context/movies";
import { useSelector, useDispatch } from "react-redux";
import MovieCard from "../components/MovieCard";
import Input from "../components/Input";

const MovieSearch = () => {
  const dispatch = useDispatch();
  const searchedValue = useSelector((state) => state.movies.searchedValue);
  const pageNumber = useSelector((state) => state.movies.pageNumber);
  const [movies, setMovies] = useState();

  // In real world app the api key would be highly secret / hidden, in this case i'm going to leave it available for the public so everything works without any external settings adjusting.
  let url = `https://www.omdbapi.com/?s=${searchedValue}&page=${pageNumber}&apikey=d3883156`;

  const handleSearch = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      data.Response === "True" && setMovies(data);
    } catch (e) {
      console.error(e.toString);
    }
  };

  const handlePageChange = (event, page) => {
    dispatch(moviesActions.setPageNumber(page));
  };

  useEffect(() => {
    searchedValue && handleSearch(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  return (
    <div>
      <Grid
        xs={12}
        item
        container
        justifyContent="center"
        alignItems="center"
        padding="2rem 0 0 0"
      >
        <Input handleSearch={handleSearch} />
      </Grid>
      <div
        style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
      >
        {movies &&
          movies.Search.map((movie, idx) => (
            <Link
              to={"../movie-details/" + movie.imdbID}
              key={idx}
              style={{ margin: "40px 20px", textDecoration: "none" }}
            >
              <MovieCard
                name={movie.Title}
                imgLink={movie.Poster}
                year={movie.Year}
                type={movie.Type}
                imdbID={movie.imdbID}
                rating={movie.Rating}
              />
            </Link>
          ))}
      </div>
      {movies && (
        <Grid container pb={12} justifyContent="center">
          <Pagination
            count={Math.ceil(movies?.totalResults / 10)}
            page={parseInt(pageNumber)}
            color="primary"
            onChange={handlePageChange}
          />
        </Grid>
      )}
    </div>
  );
};

export default MovieSearch;
