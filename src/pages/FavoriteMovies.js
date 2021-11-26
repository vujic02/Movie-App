import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";

const FavoriteMovies = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const data = localStorage.getItem("favorites");
    if (data) {
      setFavorites(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  });

  const removeFromFavorites = (currentID) => {
    const newFavoriteList = favorites.filter(
      (movie) => movie.imdbID !== currentID
    );
    setFavorites(newFavoriteList);
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        marginTop: 100,
      }}
    >
      {favorites.map((movie, idx) => (
        <Card
          sx={{
            height: "auto",
            width: 275,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            margin: "40px 20px",
          }}
          key={idx}
        >
          <CardActionArea>
            <CardMedia style={{ height: 400 }} image={movie.Poster} />
            <CardContent>
              <Typography variant="h5" component="h5">
                {movie?.Title} {movie.Year && `(${movie.Year})`}
              </Typography>
              <Typography variant="subtitle1" component="p" marginTop="4px">
                Type: {movie.Type}
              </Typography>
            </CardContent>
          </CardActionArea>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <Button
              variant="text"
              color="error"
              size="small"
              startIcon={<DeleteIcon />}
              onClick={() => removeFromFavorites(movie.imdbID)}
            >
              Remove
            </Button>
            <Link
              to={`../movie-details/${movie.imdbID}`}
              style={{ textDecoration: "none", width: "100%" }}
            >
              <Button variant="text" size="small" sx={{ width: "100%" }}>
                Details
              </Button>
            </Link>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default FavoriteMovies;
