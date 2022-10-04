import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Dialog,
  CircularProgress,
  ListItemButton,
  Paper,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

import "animate.css";

import styles from "./CardAdd.module.css";

function CardAdd({ entry, disabled, selected, handleClick, outlined }) {
  if (outlined) {
    return (
      <Paper>
        <ListItemButton
          disabled={disabled}
          className={styles.card}
          onClick={() => handleClick(entry, selected)}
        >
          {entry.title}
          {selected ? <RemoveIcon /> : <AddIcon />}
        </ListItemButton>
      </Paper>
    );
  }
  return (
    <ListItemButton
      disabled={disabled}
      className={styles.card}
      onClick={() => handleClick(entry, selected)}
    >
      {entry.title}
      {selected ? <RemoveIcon /> : <AddIcon />}
    </ListItemButton>
  );
}

export default CardAdd;
