import { useState, useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import {
  DialogContent,
  DialogContentText,
  TextField,
  InputAdornment,
  Paper,
  List,
  ListItemButton,
  Box,
  ListSubheader,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import { debounce } from "lodash";

import { search } from "./api/index.js";

import styles from "./AddEntryDialog.module.css";

function SimpleDialog(props) {
  const { onClose, open } = props;
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [suggestionsOpen, setSuggestionsOpen] = useState(false);
  const firstRender = useRef(true);

  useEffect(() => {
    console.log("suggestions: ", suggestions);
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    if (!loading && suggestions.length > 0) {
      setSuggestionsOpen(true);
    } else {
      setSuggestionsOpen(false);
    }
  }, [loading, suggestions]);

  const changeInput = async (e) => {
    console.log("in changeInput");
    const value = e.target.value;
    setInput(value);
  };

  const handleClick = (text, id) => {
    if (id) {
      console.log("id passed in: ", id);
    }
    setInput(text);
    setSuggestionsOpen(false);
  };

  const handleSuggestions = async (e) => {
    const value = e.target.value;
    console.log("value: ", value);
    setLoading(true);

    if (value) {
      const results = await search(value);
      if (results.length > 0) {
        setSuggestions([value, ...results]);
      } else {
        setSuggestions([value]);
      }

      setLoading(false);
    } else {
    }
  };

  const debouncedHandleSuggestions = useMemo(
    () => debounce(handleSuggestions, 500),
    []
  );

  const handleClose = () => {
    onClose();
  };

  const list = suggestions.map((suggestion, i) => {
    if (i === 1)
      return (
        <ListSubheader key={i + 1}>
          Or maybe it already exists here:{" "}
        </ListSubheader>
      );
    return typeof suggestion === "string" ? (
      <ListItemButton onClick={() => handleClick(suggestion)} key={i + 1}>
        Add new "{suggestion}"
      </ListItemButton>
    ) : (
      <ListItemButton
        onClick={() => handleClick(suggestion.title, suggestion.id)}
        key={i + 1}
      >
        {suggestion.title}
      </ListItemButton>
    );
  });

  return (
    <Dialog onClose={handleClose} open={open}>
      <DialogTitle>Suggest related entry</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To suggest a related entry, please enter the text of that phrase here.
          If that entry already exists, selecting it here would be considered an
          upvote of that relation.
        </DialogContentText>
        <Box style={{ position: "relative" }}>
          <TextField
            autoFocus
            autoComplete="off"
            margin="dense"
            id="phrase"
            label="input related phrase here"
            fullWidth
            value={input}
            onChange={(e) => {
              changeInput(e);
              debouncedHandleSuggestions(e);
            }}
            variant="standard"
            endAdornment={
              <InputAdornment position="end">
                <IconButton onClick={() => setInput("")}>
                  <CloseIcon />
                </IconButton>
              </InputAdornment>
            }
          />
          {!suggestionsOpen ? null : (
            <Paper className={styles.suggestions}>
              <List className={styles.list}>{list}</List>
            </Paper>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default function SimpleDialogDemo() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        <AddCircleIcon />
        <span style={{ margin: "0 0.5rem" }}>Suggest a related entry</span>
      </Button>
      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
}
