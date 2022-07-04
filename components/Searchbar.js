import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { search } from "./api/index.js";

const list = ["abc", "def", "ghi"];

const Searchbar = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChange = async (e) => {
    const input = e.target.value;
    console.log(input);
    setLoading(true);
    if (input) {
      const results = await search(input);
      if (results.length > 0) {
        setSuggestions([...results]);
      } else {
        setSuggestions([input]);
      }

      setLoading(false);
    } else {
    }
  };

  return (
    <Box
      sx={{
        width: 500,
        maxWidth: "100%",
      }}
    >
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          width: "100%",
          borderRadius:
            loading || suggestions.length < 1 ? "4px" : "4px 4px 0px 0px",
        }}
        onSubmit={handleSubmit}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search for your phrase"
          inputProps={{ "aria-label": "search for your phrase" }}
          onChange={handleChange}
        />
        <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Paper>

      {loading || suggestions.length < 1 ? null : (
        <Paper
          sx={{
            borderRadius:
              (loading || suggestions.length) < 1 ? "4px" : "0px 0px 4px 4px",
          }}
        >
          <List>
            {suggestions.map((suggestion, i) => (
              <ListItem key={i}>{suggestion}</ListItem>
            ))}
          </List>
        </Paper>
      )}
    </Box>
  );
};

export default Searchbar;
