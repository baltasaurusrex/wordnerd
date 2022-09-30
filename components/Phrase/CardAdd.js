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
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import "animate.css";

import styles from "./CardAdd.module.css";

function CardAdd({ entry }) {
  return (
    <ListItemButton className={`${styles.card}`}>{entry.title}</ListItemButton>
  );
}

export default CardAdd;
