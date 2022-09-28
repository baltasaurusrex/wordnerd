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

import styles from "./DescriptionForm.module.css";

const DescriptionForm = ({
  formData,
  setFormData,
  valid,
  setValid,
  goToNextPage,
}) => {
  const [error, setError] = useState(false);
  const [errorHelperText, setErrorHelperText] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, ["description"]: e.target.value });
  };

  const handleEnter = (e) => {
    if (e.key == "Enter" && valid) {
      goToNextPage();
    }
  };

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current && formData.description.length == 0) {
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
    if (test(formData.description)) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [formData.description]);

  const handleClear = () => {
    setFormData({ ...formData, ["description"]: "" });
    setValid(false);
  };

  return (
    <Box className="animate__animated animate__fadeIn">
      <Typography variant="h5">What does it mean? </Typography>
      <TextField
        error={error}
        helperText={errorHelperText}
        className={styles.textfield}
        variant="standard"
        multiline
        name="description"
        onChange={handleChange}
        onKeyDown={handleEnter}
        value={formData.description}
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

export default DescriptionForm;
