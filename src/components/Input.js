import React, { useState, useEffect } from "react";
import { Paper, InputBase, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { moviesActions } from "../context/movies";
import { useDispatch, useSelector } from "react-redux";

const Input = ({ handleSearch }) => {
  const dispatch = useDispatch();

  const searchedContextValue = useSelector(
    (state) => state.movies.searchedValue
  );
  const [searchedValue, setSearchedValue] = useState("");

  const setSearchedContextValue = (value) => {
    dispatch(moviesActions.setSearchedValue(value));
  };

  useEffect(() => {
    setSearchedValue(searchedContextValue);
  }, [searchedContextValue]);

  return (
    <Paper
      component="form"
      sx={{
        p: "2px 4px",
        display: "flex",
        alignItems: "center",
        width: 400,
      }}
      onSubmit={(e) => {
        e.preventDefault();
        handleSearch();
        dispatch(moviesActions.setPageNumber(1));
      }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Search for a movie"
        inputProps={{ "aria-label": "search movies" }}
        value={searchedValue}
        onChange={(event) => setSearchedContextValue(event.target.value)}
      />
      <IconButton onClick={handleSearch} sx={{ p: "10px" }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
  );
};

export default Input;
