import { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import "animate.css";

import styles from "./RelatedEntriesForm.module.css";

import CardAdd from "../Phrase/CardAdd.js";

const RelatedEntriesForm = ({ formData, setFormData, setValid }) => {
  const [input, setInput] = useState("");
  setValid(true);

  const handleClear = () => {
    setInput("");
  };

  return (
    <Box>
      <Typography variant="h5">Any related entries? </Typography>
      {/* add related entries like adding keywords (all in one paper) */}
      <TextField
        variant="standard"
        className={styles.textfield}
        value={input}
        onChange={(e) => setInput(e.target.value)}
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
  );
};

export default RelatedEntriesForm;
