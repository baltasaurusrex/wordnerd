import { useEffect, useState, useMemo } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  CircularProgress,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import "animate.css";

import styles from "./RelatedEntriesForm.module.css";

import CardAdd from "../Phrase/CardAdd.js";

import { get_phrases } from "../api";
import { debounce } from "lodash";

function Suggestions({ input, selectedEntries, setSelectedEntries }) {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    console.log("input changed");
    setLoading(true);
    const handleInputChange = async (e) => {
      if (input) {
        const results = await get_phrases(input);

        if (results.length > 0) {
          setSuggestions([...results]);
        } else {
          setSuggestions([]);
          setMessage("None found :(");
        }
      } else {
        // no input, clear suggestions
        setSuggestions([]);
        setMessage("Search for an entry!");
      }

      setLoading(false);
    };

    const debouncedHandleInputChange = debounce(handleInputChange, 1000);

    debouncedHandleInputChange();
  }, [input]);

  const mappedSuggestions = suggestions.map((suggestion, i) => {
    return (
      <CardAdd
        key={i}
        entry={suggestion}
        selected={selectedEntries.find((entry) => entry.id === suggestion.id)}
      />
    );
  });

  if (suggestions.length == 0) {
    return (
      <div className={styles.suggestions}>
        {loading ? <CircularProgress /> : `${message}`}
      </div>
    );
  } else {
    return <div className={styles.suggestions}>{mappedSuggestions}</div>;
  }
}

function RelatedEntriesDialog({
  input,
  handleInput,
  handleClear,
  open,
  handleClose,
  selectedEntries,
  setSelectedEntries,
}) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={styles.dialog}
      sx={{
        "& .MuiDialog-container": {
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        },
        "& .MuiDialog-paper": { width: "90vw", maxWidth: "90vw" },
      }}
    >
      <Box className={styles.dialog_box}>
        <Typography variant="h5">Any related entries? </Typography>
        {/* add related entries like adding keywords (all in one paper) */}
        <TextField
          variant="standard"
          className={styles.textfield}
          value={input}
          onChange={(e) => handleInput(e.target.value)}
          InputProps={{
            classes: {
              input: styles.textfieldInput,
            },
            endAdornment: (
              <InputAdornment position="end">
                {input?.length > 0 ? (
                  <IconButton onClick={handleClear}>
                    <CloseIcon />
                  </IconButton>
                ) : null}
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box>
        <Suggestions
          input={input}
          selectedEntries={selectedEntries}
          setSelectedEntries={setSelectedEntries}
        />
      </Box>
    </Dialog>
  );
}

const RelatedEntriesForm = ({ formData, setFormData, setValid }) => {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedEntries, setSelectedEntries] = useState([
    {
      id: "6134846f2607b80023caed77",
      title: "History is written by the victors",
    },
  ]);

  setValid(true);

  const handleClear = () => {
    setInput("");
  };

  const handleInput = (value) => {
    console.log("in handleInput");
    setInput(value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box>
      <Typography variant="h5">Any related entries? </Typography>
      {/* add related entries like adding keywords (all in one paper) */}
      <div onClick={() => setOpen(true)}>
        <TextField
          variant="standard"
          className={styles.textfield}
          value={input}
          onChange={(e) => handleInput(e.target.value)}
          InputProps={{
            classes: {
              input: styles.textfieldInput,
            },
            endAdornment: (
              <InputAdornment position="end">
                {input?.length > 0 ? (
                  <IconButton onClick={handleClear}>
                    <CloseIcon />
                  </IconButton>
                ) : null}
              </InputAdornment>
            ),
          }}
        />
      </div>
      <RelatedEntriesDialog
        input={input}
        handleInput={handleInput}
        handleClear={handleClear}
        open={open}
        handleClose={handleClose}
        selectedEntries={selectedEntries}
        setSelectedEntries={setSelectedEntries}
      />
      {/* selected entries list */}
    </Box>
  );
};

export default RelatedEntriesForm;
