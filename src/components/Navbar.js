import React, { useState } from "react";
import { Grid, Button, AppBar, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./styles.css";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "./Drawer";
import HomeIcon from "@mui/icons-material/Home";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <AppBar position="static" color="default">
        <Grid item sm={12} xs={12}>
          <Toolbar>
            <div className="navbar-header">
              <Link to="/" className="link home">
                <HomeIcon className="home-icon" />
                <Typography variant="h6" style={{ marginLeft: "5px" }}>
                  Movie App
                </Typography>
              </Link>
            </div>
            <div className="navbar-links">
              <Link to="/" className="link" style={{ textDecoration: "none" }}>
                <Button color="inherit" variant="text">
                  Movie Search
                </Button>
              </Link>
              <Link
                to="favorite-movies"
                className="link"
                style={{ textDecoration: "none" }}
              >
                <Button color="inherit" variant="text">
                  Favorites
                </Button>
              </Link>
            </div>
            <div className="navbar-mobile">
              <MenuIcon
                onClick={() => setOpen(true)}
                style={{ cursor: "pointer" }}
              />
            </div>
          </Toolbar>
        </Grid>
      </AppBar>
      <Drawer open={open} setOpen={setOpen} />
    </div>
  );
};

export default Navbar;
