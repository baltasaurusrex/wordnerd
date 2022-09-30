import { useEffect, useState, useRef } from "react";
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

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useState(() => {
    setSuggestions([
      { title: "first suggestion" },
      { title: "second suggestion" },
      {
        title:
          "third super long suggestion or quote lorem Velit duis ex nulla eu eiusmod est dolor qui. Tempor ullamco sit consectetur et aliquip Lorem ex deserunt. Duis sit voluptate ex et est aliquip reprehenderit tempor do aute sit voluptate. Commodo dolor et pariatur sit. In sint officia sint quis sit sit.",
      },
    ]);
  }, []);

  const mappedSuggestions = suggestions.map((suggestion, i) => {
    return <CardAdd key={i} entry={suggestion} />;
  });

  return loading ? <CircularProgress /> : <div>{mappedSuggestions}</div>;
}

function RelatedEntriesDialog({
  input,
  handleInput,
  handleClear,
  open,
  handleClose,
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
        <Suggestions />
      </Box>
    </Dialog>
  );
}

const RelatedEntriesForm = ({ formData, setFormData, setValid }) => {
  const [input, setInput] = useState("");
  const [open, setOpen] = useState(false);

  setValid(true);

  const handleClear = () => {
    setInput("");
  };

  const handleInput = (value) => {
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
      />
    </Box>
  );
};

export default RelatedEntriesForm;
