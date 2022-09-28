import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Paper,
  Grid,
  IconButton,
  Input,
} from "@mui/material";

import ClearIcon from "@mui/icons-material/Clear";
import "animate.css";

import styles from "./KeywordsForm.module.css";

import { get_keywords } from "../api";

import { debounce } from "lodash";

function KeywordsForm({ formData, setFormData, setValid }) {
  const [keywords, setKeywords] = useState([...formData.keywords]);
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const removeKeyword = (indexToRemove) => {
    setKeywords(keywords.filter((keyword, index) => index !== indexToRemove));
  };

  const [width, setWidth] = useState(10);
  const inputRef = useRef();
  const popperRef = useRef();

  const getKeywords = async (keyword) => {
    const { data } = await get_keywords(keyword);

    setSuggestions(data);
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
      </div>
    </Box>
  );
}

export default KeywordsForm;
