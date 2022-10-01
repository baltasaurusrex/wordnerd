import React from "react";

import { Box, Typography, Select, MenuItem } from "@mui/material";

import "animate.css";

import styles from "./TypeForm.module.css";

const TypeForm = ({ formData, setFormData, setValid }) => {
  setValid(true);
  const handleChange = (e) => {
    setFormData({ ...formData, ["type"]: e.target.value });
  };
  return (
    <Box className="animate__animated animate__fadeIn">
      <Typography variant="h5">What category does it fall under? </Typography>
      {/* drop down here */}
      <Select
        className={styles.select}
        value={formData.type}
        onChange={handleChange}
      >
        <MenuItem value="word">Word</MenuItem>
        <MenuItem value="idiom">Idiom</MenuItem>
        <MenuItem value="proverb">Proverb</MenuItem>
        <MenuItem value="quote">Quote</MenuItem>
      </Select>

      {/* explanation of what the diff of each is */}
      {/* popover menu with (?) */}
      {/* if something with an author is selected, create a dropdown for the author */}
    </Box>
  );
};

export default TypeForm;
