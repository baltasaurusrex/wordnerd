import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import TextField from "@mui/material/TextField";
import Input from "@mui/material/Input";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import { ClickAwayListener } from "@mui/material";

import Link from "next/link";
import { useRouter } from "next/router";

import { useState, useMemo, useEffect, useRef } from "react";
import { debounce } from "lodash";
import { get_phrases } from "./api/index.js";

import { createTheme, ThemeProvider } from "@mui/material/styles";

import cn from "classnames";

const theme = createTheme({
  palette: {
    wordnerdred: {
      main: "#64748B",
    },
    black: {
      main: "#1B1717",
    },
  },
});

import styles from "./Searchbar.module.css";

const Searchbar = ({ mobile }) => {
  console.log("Searchbar > mobile: ", mobile);
  const router = useRouter();
  const firstRender = useRef(true);

  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query == "" || !query) {
      return;
    } else {
      setOpen(false);
      const href = `/search?q=${encodeURIComponent(query)}`;
      console.log("href: ", href);
      router.push(href);
    }
  };

  const changeQuery = async (e) => {
    console.log("in changeQuery");
    const value = e.target.value;
    setQuery(value);
  };

  const handleChange = async (e) => {
    const value = e.target.value;
    console.log("value: ", value);
    setLoading(true);

    if (value) {
      const results = await get_phrases(value);
      if (results.length > 0) {
        setSuggestions([value, ...results]);
      } else {
        setSuggestions([value]);
      }

      setLoading(false);
    } else {
    }
  };

  useEffect(() => {
    console.log("query changed: ", query);
  }, [query]);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (!loading && suggestions.length > 0) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [loading, suggestions]);

  useEffect(() => {
    setOpen(false);
  }, [router.asPath]);

  const handleClick = (text) => {
    setQuery(text);
  };

  const debouncedHandleChange = useMemo(() => debounce(handleChange, 500), []);

  const list = suggestions.map((suggestion, i) => {
    const text = suggestion.title ? suggestion.title : suggestion;
    return typeof suggestion === "string" ? (
      <Link href={`/search?q=${encodeURIComponent(suggestion)}`} key={i}>
        <ListItemButton
          style={{ font: "1rem Noto Serif, serif", backgroundColor: "#f5f5f5" }}
          key={i}
        >
          Search for "{suggestion}"
        </ListItemButton>
      </Link>
    ) : (
      <Link href={`/phrase/${encodeURIComponent(suggestion.id)}`} key={i}>
        <ListItemButton
          component="a"
          style={{ font: "1rem Noto Serif, serif" }}
          onClick={() => handleClick(text)}
          key={i}
        >
          {text}
        </ListItemButton>
      </Link>
    );
  });

  if (mobile) {
    return (
      <ThemeProvider theme={theme}>
        <ClickAwayListener onClickAway={() => setOpen(false)}>
          <Box className={styles.container_mobile}>
            <Paper
              component="form"
              className={styles.paper_mobile}
              elevation={0}
              square={true}
              onSubmit={handleSubmit}
            >
              <Input
                className={styles.inputBaseMobile}
                placeholder="Search for your phrase"
                inputProps={{ "aria-label": "search for your phrase" }}
                variant="standard"
                color="black"
                value={query}
                onChange={(e) => {
                  changeQuery(e);
                  debouncedHandleChange(e);
                }}
                endAdornment={
                  query &&
                  query.length > 0 && (
                    <IconButton
                      onClick={() => {
                        setQuery("");
                        setOpen(false);
                      }}
                      sx={{ padding: "0 0.25rem 0 1rem" }}
                    >
                      <CloseIcon />
                    </IconButton>
                  )
                }
              />
            </Paper>
            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
            {!open ? null : (
              <Paper className={styles.suggestionsMobile}>
                <List className={styles.list}>{list}</List>
              </Paper>
            )}
          </Box>
        </ClickAwayListener>
      </ThemeProvider>
    );
  } else {
    return (
      <ClickAwayListener onClickAway={() => setOpen(false)}>
        <Box className={cn(styles.container)}>
          <Paper
            component="form"
            className={styles.search}
            sx={{
              borderRadius: !open ? "25px" : "25px 25px 0px 0px",
            }}
            onSubmit={handleSubmit}
          >
            <InputBase
              sx={{ "& input": { font: "1rem Noto Serif, serif" } }}
              className={cn(styles.inputBase)}
              placeholder="Search for your phrase"
              inputProps={{ "aria-label": "search for your phrase" }}
              value={query}
              onChange={(e) => {
                changeQuery(e);
                debouncedHandleChange(e);
              }}
            />

            {query && query.length > 0 && (
              <IconButton
                onClick={() => {
                  setQuery("");
                  setOpen(false);
                }}
              >
                <CloseIcon />
              </IconButton>
            )}

            <IconButton type="submit" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          {!open ? null : (
            <Paper
              className={styles.suggestions}
              sx={{ borderRadius: "0px 0px 25px 25px" }}
            >
              <List className={styles.list}>{list}</List>
            </Paper>
          )}
        </Box>
      </ClickAwayListener>
    );
  }
};

export default Searchbar;
