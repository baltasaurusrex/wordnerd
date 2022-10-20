import React, { useEffect, useState, useRef, useMemo } from "react";

import { debounce } from "lodash";

import {
  Box,
  Typography,
  Input,
  Select,
  Grid,
  MenuItem,
  Paper,
  Popper,
  MenuList,
  CircularProgress,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import "animate.css";

import { get_authors } from "../api";

import styles from "./TypeForm.module.css";

const TypeForm = ({ formData, setFormData, setValid }) => {
  const handleTypeChange = (e) => {
    console.log("handle change");
    if (e.target.value == "quote") {
      setFormData({ ...formData, ["type"]: e.target.value });
      // setValid(false);
    } else {
      setFormData({ ...formData, ["author"]: "" });
      setFormData({ ...formData, ["type"]: e.target.value });
    }
  };

  const inputRef = useRef();
  const popperRef = useRef();
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (formData.type == "quote") {
      if (formData.author == "") {
        setValid(false);
      } else {
        setValid(true);
      }
    } else {
      setFormData({ ...formData, ["author"]: "" });
      // setFormData({ ...formData, ["type"]: e.target.value });
    }
  }, [formData.type]);

  const getAuthors = async (author, formData) => {
    let res = await get_authors(author);
    console.log("res: ", res);

    let no_repetitions = res?.filter((sugg) => {
      console.log("formData.author: ", formData.author);
      return formData.author !== sugg;
    });

    console.log("no_repetitions: ", no_repetitions);

    setSuggestions([...no_repetitions]);
    setLoading(false);
  };

  const debouncedHandleChange = useMemo(() => debounce(getAuthors, 500), []);

  const handleInput = async (e) => {
    e.preventDefault();
    setOpen(true);
    setLoading(true);
    setFormData({ ...formData, ["author"]: e.target.value });

    // if it has a value, do a debounced search for suggested authors
    if (e.target.value !== "") {
      debouncedHandleChange(e.target.value, formData);
    } else {
      // if input is blank, no suggestions
      setSuggestions([]);
      setOpen(false);
    }

    // if enter was pressed and there's a value
    if (e.key === "Enter" && e.target.value !== "") {
      // check first if value already provided
      if (formData.author == e.target.value) {
        console.log("already in author");
        return;
      }
      // add this to the author
      setFormData({ ...formData, ["author"]: e.target.value });

      // and close the suggestions
      setOpen(false);
    }
  };

  const handleSelect = (sugg) => {
    // check first if value already provided

    setFormData({ ...formData, ["author"]: sugg });
    setOpen(false);
    setValid(true);
  };

  const handleClear = () => {
    setFormData({ ...formData, ["author"]: "" });
    setValid(false);
  };

  const authorField = (
    <Grid item>
      <Input
        component="div"
        ref={inputRef}
        style={{ flexGrow: 1 }}
        className={styles.input}
        placeholder="Coined by?"
        onChange={(e) => {
          setFormData({ ...formData, ["author"]: e.target.value });
        }}
        value={formData.author}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            e.preventDefault();
          }
        }}
        onKeyUp={handleInput}
        endAdornment={
          <InputAdornment position="end">
            {formData.author.length > 0 ? (
              <IconButton onClick={handleClear}>
                <CloseIcon />
              </IconButton>
            ) : null}
          </InputAdornment>
        }
      />
      <Popper
        name="keyword"
        style={{ zIndex: 999 }}
        open={open}
        ref={popperRef}
        className={styles.popper}
        anchorEl={inputRef.current}
        placement="bottom-start"
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
            {!suggestions.includes(formData.author) && (
              <MenuItem
                key={formData.author}
                onClick={(e) => {
                  handleSelect(formData.author);
                }}
              >
                Add new "{formData.author}"
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
    </Grid>
  );

  useEffect(() => {
    if (formData.type !== "quote") {
      console.log(`not a quote`);
      setValid(true);
    } else {
      // if its a quote
      // check if author is filled
      // if author is filled, then its valid
      // if author is blank, then its not
    }
  }, [formData.type]);

  return (
    <Box className="animate__animated animate__fadeIn">
      <Typography variant="h5">What category does it fall under? </Typography>
      {/* drop down here */}
      <Grid container className={styles.grid}>
        <Grid item>
          <Select
            variant="standard"
            className={styles.select}
            value={formData.type}
            onChange={handleTypeChange}
          >
            <MenuItem value="word">Word</MenuItem>
            <MenuItem value="idiom">Idiom</MenuItem>
            <MenuItem value="proverb">Proverb</MenuItem>
            <MenuItem value="quote">Quote</MenuItem>
          </Select>
        </Grid>
        {formData.type == "quote" && authorField}

        {/* explanation of what the diff of each is */}
        {/* popover menu with (?) */}
        {/* if something with an author is selected, create a dropdown for the author */}
      </Grid>
    </Box>
  );
};

export default TypeForm;
