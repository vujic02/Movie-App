import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography, Paper, CircularProgress } from "@mui/material";
import StarOutlineOutlinedIcon from "@mui/icons-material/StarOutlineOutlined";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";

const MovieDetails = () => {
  const params = useParams();
  const [movieDetails, setMovieDetails] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [toggleFavorite, setToggleFavorite] = useState(false);

  // In real world app the api key would be highly secret / hidden, in this case i'm going to leave it available for the public so everything works without any external settings adjusting.
  let url = `https://omdbapi.com/?apikey=d3883156&i=${params.movieID}`;

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const request = await fetch(url);
      const requestData = await request.json();
      setMovieDetails(requestData);
      setLoaded(true);
    };

    return fetchMovieDetails(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const data = localStorage.getItem("favorites");
    if (data) {
      setFavorites(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (favorites.some((movie) => movie.imdbID === movieDetails.imdbID)) {
      setToggleFavorite(true);
    }
  });

  const addToFavorites = () => {
    if (favorites.some((movie) => movie.imdbID === movieDetails)) {
      return;
    } else {
      setFavorites([...favorites, movieDetails]);
    }
  };

  const removeFromFavorites = () => {
    const newFavoriteList = favorites.filter(
      (movie) => movie.imdbID !== movieDetails.imdbID
    );
    setFavorites(newFavoriteList);
  };

  return (
    <>
      {loaded ? (
        <div
          style={{
            width: "100%",
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Paper
            sx={{
              p: 2,
              margin: "auto",
              flexGrow: 1,
              maxWidth: 1200,
              maxHeight: 1200,
            }}
          >
            <Grid container spacing={2}>
              <Grid item>
                <img
                  alt="complex"
                  src={movieDetails.Poster}
                  style={{ width: "100%", height: "100%" }}
                />
              </Grid>
              <Grid item xs={12} sm container>
                <Grid item xs container direction="column" spacing={2}>
                  <Grid item xs>
                    <Typography gutterBottom variant="h3" component="div">
                      {movieDetails?.Title} ({movieDetails.Year})
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Actors: {movieDetails?.Actors}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ maxWidth: 500 }}
                    >
                      Plot: {movieDetails.Plot}
                    </Typography>
                  </Grid>
                  <Grid item>
                    <Typography sx={{ cursor: "pointer" }} variant="body2">
                      Genre: {movieDetails?.Genre}
                    </Typography>
                  </Grid>
                </Grid>
                <Grid item>
                  {toggleFavorite ? (
                    <StarOutlinedIcon
                      style={{ fill: "red", cursor: "pointer" }}
                      onClick={() => {
                        removeFromFavorites();
                        setToggleFavorite((prev) => !prev);
                      }}
                    />
                  ) : (
                    <StarOutlineOutlinedIcon
                      style={{ fill: "red", cursor: "pointer" }}
                      onClick={() => {
                        addToFavorites();
                        setToggleFavorite((prev) => !prev);
                      }}
                    />
                  )}
                </Grid>
              </Grid>
            </Grid>
          </Paper>
        </div>
      ) : (
        <div
          style={{
            width: "100%",
            height: "90vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress />
        </div>
      )}
    </>
  );
};

export default MovieDetails;
