import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea,
  Button,
} from "@mui/material/";

const MovieCard = ({ imgLink, name, year, imdbID, type }) => {
  return (
    <Card
      style={{
        width: 275,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardActionArea>
        <CardMedia style={{ height: 400 }} image={imgLink} />
        <CardContent>
          <Typography variant="h5" component="h5">
            {name} {year && `(${year})`}
          </Typography>
          <Typography variant="subtitle1" component="p" marginTop="4px">
            Type: {type}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Button>More details</Button>
    </Card>
  );
};

export default MovieCard;
