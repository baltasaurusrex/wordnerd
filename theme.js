import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";

// color design tokens
export const tokens = () => ({
  maroon: {
    100: "#e6cccc",
    200: "#cc9999",
    300: "#b36666",
    400: "#993333",
    500: "#800000",
    600: "#660000",
    700: "#4d0000",
    800: "#330000",
    900: "#1a0000",
  },

  white: {
    100: "#fefefe",
    200: "#fdfdfd",
    300: "#fcfcfc",
    400: "#fbfbfb",
    500: "#fafafa",
    600: "#c8c8c8",
    700: "#969696",
    800: "#646464",
    900: "#323232",
  },

  black: {
    100: "#d4d6da",
    200: "#a9acb4",
    300: "#7e838f",
    400: "#535969",
    500: "#283044",
    600: "#202636",
    700: "#181d29",
    800: "#10131b",
    900: "#080a0e",
  },
});
