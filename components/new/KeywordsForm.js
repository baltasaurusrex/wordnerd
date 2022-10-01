import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  Grid,
  IconButton,
  Input,
  Popper,
  MenuList,
  MenuItem,
  CircularProgress,
} from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import "animate.css";

import styles from "./KeywordsForm.module.css";

import { get_keywords } from "../api";

import { debounce } from "lodash";

function KeywordsForm({ formData, setFormData, setValid }) {
  //
  setValid(true);
  const [keywords, setKeywords] = useState([...formData.keywords]);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setFormData({ ...formData, ["keywords"]: [...keywords] });
  }, [keywords]);

  const removeKeyword = (indexToRemove) => {
    setKeywords(keywords.filter((keyword, index) => index !== indexToRemove));
  };

  const [width, setWidth] = useState(10);
  const inputRef = useRef();
  const popperRef = useRef();

  const getKeywords = async (keyword) => {
    const suggestions = await get_keywords(keyword);
    console.log("suggestions: ", suggestions);

    setSuggestions(suggestions);
    setLoading(false);
  };

  const debouncedHandleChange = useMemo(() => debounce(getKeywords, 500), []);

  const handleInput = async (e) => {
    e.preventDefault();
    setOpen(true);
    setLoading(true);
    setInput(e.target.value.toLowerCase());

    // if it has a value, do a debounced search for suggested keywords
    if (e.target.value !== "") {
      debouncedHandleChange(e.target.value);
    } else {
      // if input is blank, no suggestions
      setSuggestions([]);
      setOpen(false);
    }

    // if enter was pressed and there's a value
    if (e.key === "Enter" && e.target.value !== "") {
      // add this to the keywords
      setKeywords((prev) => [...prev, e.target.value]);
      // clear the input field
      setInput("");
      // and close the suggestions
      setOpen(false);
    }
  };

  const handleSelect = (sugg) => {
    setKeywords((prev) => [...prev, sugg]);
    setInput("");
    setOpen(false);
  };

  const mappedKeywords = keywords.map((keyword, index) => {
    return (
      <Paper
        key={index}
        className={`${styles.keyword} animate__animated animate__bounceIn`}
        component="span"
      >
        {keyword}
        <IconButton
          onClick={() => {
            removeKeyword(index);
          }}
          size="small"
          className={styles.clear}
        >
          <ClearIcon />
        </IconButton>
      </Paper>
    );
  });
  return (
    <Box className={`${styles.box} animate__animated animate__fadeIn`}>
      <Typography variant="h5">Any keywords? </Typography>
      <div
        className={styles.div}
        // style={{ padding: "10px 0", display: "flex", flexWrap: "wrap" }}
        onClick={(e) => {
          console.log("onClick div");
          e.stopPropagation();
          console.log(inputRef.current);
          inputRef.current.focus();
        }}
      >
        {mappedKeywords}
        <Input
          component="div"
          ref={inputRef}
          style={{ flexGrow: 1 }}
          className={styles.input}
          disableUnderline
          placeholder="Add a keyword"
          onChange={(e) => {
            setWidth(e.target.value.length);
            setInput(e.target.value.toLowerCase());
          }}
          value={input}
          onKeyDown={(e) => {
            if (e.key == "Enter") {
              e.preventDefault();
            }
          }}
          onKeyUp={handleInput}
        />
        <Popper
          style={{ zIndex: 999 }}
          open={open}
          ref={popperRef}
          className={styles.popper}
          anchorEl={inputRef.current}
          placement="bottom-start"
          modifiers={{
            flip: {
              enabled: false,
            },
            preventOverflow: {
              enabled: true,
              boundariesElement: "scrollParent",
            },
            arrow: {
              enabled: true,
              element: inputRef.current,
            },
          }}
        >
          <Paper>
            <MenuList
              open={open}
              autoFocus={false}
              onClose={() => setOpen(false)}
              style={{
                maxHeight: "150px",
                overflow: "scroll",
              }}
            >
              {!suggestions.includes(input) && (
                <MenuItem
                  key={input}
                  onClick={(e) => {
                    handleSelect(input);
                  }}
                >
                  Add new "{input}"
                </MenuItem>
              )}
              {loading ? (
                <div style={{ textAlign: "center" }}>
                  <CircularProgress size="1rem" />
                </div>
              ) : (
                suggestions.map((sugg) => (
                  <MenuItem
                    key={sugg}
                    onClick={(e) => {
                      handleSelect(sugg);
                    }}
                  >
                    {sugg}
                  </MenuItem>
                ))
              )}
            </MenuList>
          </Paper>
        </Popper>
      </div>
    </Box>
  );
}

export default KeywordsForm;
