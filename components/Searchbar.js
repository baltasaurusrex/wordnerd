import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import SearchIcon from "@mui/icons-material/Search";

import Link from "next/link";

import { useState, useMemo } from "react";
import { debounce } from "lodash";
import { search } from "./api/index.js";

import styles from "./Searchbar.module.css";

const Searchbar = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const value = e.target.value;
    console.log(value);
    setLoading(true);

    if (value) {
      const results = await search(value);
      if (results.length > 0) {
        setSuggestions([value, ...results]);
      } else {
        setSuggestions([value]);
      }

      setLoading(false);
    } else {
    }
  };

  const debouncedHandleChange = useMemo(() => debounce(handleChange, 500), []);

  const list = suggestions.map((suggestion, i) => {
    return typeof suggestion === "string" ? (
      <ListItemButton
        style={{ backgroundColor: "#f5f5f5" }}
        key={i}
        button={true}
      >
        <italic>Search for "{suggestion}"</italic>
      </ListItemButton>
    ) : (
      <Link href={`/phrase/${encodeURIComponent(suggestion.id)}`}>
        <ListItemButton key={i} button={true}>
          {suggestion.title ? suggestion.title : suggestion}
        </ListItemButton>
      </Link>
    );
  });

  return (
    <Box className={styles.container}>
      <Paper
        component="form"
        sx={{
          p: "2px 4px 2px 16px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          borderRadius:
            loading || suggestions.length < 1 ? "25px" : "25px 25px 0px 0px",
        }}
        onSubmit={handleSubmit}
      >
        <InputBase
          sx={{ flex: 1 }}
          placeholder="Search for your phrase"
          inputProps={{ "aria-label": "search for your phrase" }}
          onChange={debouncedHandleChange}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      {loading || suggestions.length < 1 ? null : (
        <Paper
          sx={{
            borderRadius:
              (loading || suggestions.length) < 1
                ? "25px"
                : "0px 0px 25px 25px",
            position: "absolute",
            width: "inherit",
          }}
        >
          <List className={styles.list}>{list}</List>
        </Paper>
      )}
    </Box>
  );
};

export default Searchbar;
