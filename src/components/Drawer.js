import React from "react";
import {
  Box,
  Drawer,
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import BookmarksIcon from "@mui/icons-material/Bookmarks";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";

export default function TemporaryDrawer({ open, setOpen }) {
  return (
    <div>
      <Drawer open={open} onClose={() => setOpen(false)}>
        <Box
          role="presentation"
          onClick={() => setOpen(false)}
          onKeyDown={() => setOpen(false)}
        >
          <List>
            <Link to="/" style={{ textDecoration: "none" }}>
              <ListItem button>
                <ListItemIcon>
                  <SearchIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Movie Search"
                  secondary="Search for a movie"
                />
              </ListItem>
            </Link>
            <Link to="favorite-movies" style={{ textDecoration: "none" }}>
              <ListItem button>
                <ListItemIcon>
                  <BookmarksIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Favorites"
                  secondary="Your favorite movies"
                />
              </ListItem>
            </Link>
          </List>
          <Divider />
        </Box>
      </Drawer>
    </div>
  );
}
