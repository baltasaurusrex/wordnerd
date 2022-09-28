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

import styles from "./TitleForm.module.css";

const TitleForm = ({
  formData,
  setFormData,
  valid,
  setValid,
  goToNextPage,
}) => {
  const [error, setError] = useState(false);
  const [errorHelperText, setErrorHelperText] = useState("");

  const handleChange = (e) => {
    let { value, name } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleEnter = (e) => {
    if (e.key == "Enter" && valid) {
      goToNextPage();
    }
  };

  const firstRender = useRef(true);

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    console.log("title changed to: ", formData.title);

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
    if (test(formData.title)) {
      setValid(true);
    } else {
      setValid(false);
    }
  }, [formData.title]);

  const handleClear = () => {
    setFormData({ ...formData, ["title"]: "" });
    setValid(false);
  };

  return (
    <div>
      <Typography variant="h5" className="animate__animated animate__fadeIn">
        What's the phrase?
      </Typography>
      <TextField
        error={error}
        helperText={errorHelperText}
        className={styles.textfield}
        variant="standard"
        multiline
        name="title"
        onChange={handleChange}
        onKeyDown={handleEnter}
        value={formData.title}
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
      {/* suggestion */}
    </div>
  );
};

export default TitleForm;
