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

import styles from "./SentencesForm.module.css";

const SentencesForm = ({
  formData,
  setFormData,
  valid,
  setValid,
  goToNextPage,
}) => {
  const [error, setError] = useState(false);
  const [errorHelperText, setErrorHelperText] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, ["sampleSentences"]: [e.target.value] });
  };

  const handleEnter = (e) => {
    if (e.key == "Enter" && valid) {
      goToNextPage();
    }
  };

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current && formData.sampleSentences[0].length == 0) {
      firstRender.current = false;
      return;
    }

    function test(value) {
      // if value has no text
      if (/^\s*$/.test(value)) {
        setError(true);
        setErrorHelperText("Value has no text.");
        return false;
      }
      // if has quotation marks or extra spaces on either side
      if (/^["'\s]/.test(value) || /["'\s]$/.test(value)) {
        setError(true);
        setErrorHelperText(
          "Please clear quotation marks or extra spaces on either side."
        );

        return false;
      }

      setError(false);
      setErrorHelperText(null);

      return true;
    }

    // if passes formatting tests
    if (test(formData.sampleSentences[0])) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [formData.sampleSentences[0]]);

  const handleClear = () => {
    setFormData({ ...formData, ["sampleSentences"]: [""] });
    setValid(false);
  };

  return (
    <Box className="animate__animated animate__fadeIn">
      <Typography variant="h5">How do you use it in a sentence? </Typography>
      <TextField
        error={error}
        helperText={errorHelperText}
        className={styles.textfield}
        variant="standard"
        multiline
        name="sampleSentence"
        onChange={handleChange}
        onKeyDown={handleEnter}
        value={formData.sampleSentences[0]}
        InputProps={{
          classes: {
            input: styles.textfieldInput,
          },
          endAdornment: (
            <InputAdornment position="end">
              {formData.title.length > 0 ? (
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

export default SentencesForm;
