import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Select,
  MenuItem,
  Paper,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import styles from "./new.module.css";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    wordnerdred: {
      main: "#64748B",
    },
    black: {
      main: "#1B1717",
    },
  },
});

export default function New() {
  const [formData, setFormData] = useState({
    title: "",
    type: "word",
    description: "",
    sampleSentences: [""],
    keywords: [],
    relations: [],
  });
  const [page, setPage] = useState(0);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    console.log("formData: ", formData);
  }, [formData]);

  const renderForm = () => {
    switch (page) {
      case 0:
        return (
          <First
            formData={formData}
            setFormData={setFormData}
            setValid={setValid}
          />
        );
      case 1:
        return (
          <Second
            formData={formData}
            setFormData={setFormData}
            setValid={setValid}
          />
        );
      case 2:
        return (
          <Third
            formData={formData}
            setFormData={setFormData}
            setValid={setValid}
          />
        );
      case 3:
        return (
          <Fourth
            formData={formData}
            setFormData={setFormData}
            setValid={setValid}
          />
        );
      case 4:
        return (
          <Fifth
            formData={formData}
            setFormData={setFormData}
            setValid={setValid}
          />
        );
      case 5:
        return (
          <Sixth
            formData={formData}
            setFormData={setFormData}
            setValid={setValid}
          />
        );
      default:
        return "last";
    }
  };

  const handleChange = (event) => {
    let { value, name } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  const handleSentenceChange = (e, index) => {
    const { value } = e.target;
    const sentences = [...formData.sampleSentences];
    sentences[index] = value;

    setFormData((prev) => ({ ...prev, sampleSentences: [...sentences] }));
  };

  const handleKeywordChange = (keywords) => {
    setFormData({ ...formData, keywords });
  };

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Box className={styles.container}>
        <Box component="form" className={styles.form}>
          {renderForm()}
        </Box>
        <Box className={styles.navigation}>
          {page > 0 && (
            <Button
              onClick={() => {
                setPage((prev) => prev - 1);
                setValid(true);
              }}
            >
              Previous
            </Button>
          )}
          <Button
            onClick={() => {
              setPage((prev) => prev + 1);
              setValid(false);
            }}
            disabled={!valid}
          >
            Next
          </Button>
        </Box>
      </Box>
    </>
  );
}

const First = ({ formData, setFormData, setValid }) => {
  const [error, setError] = useState(false);
  const [errorHelperText, setErrorHelperText] = useState("");

  const handleChange = (e) => {
    let { value, name } = e.target;

    setFormData({ ...formData, [name]: value });
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
  };

  return (
    <Box>
      <Typography variant="h5">What's the phrase?</Typography>
      <TextField
        error={error}
        helperText={errorHelperText}
        className={styles.textfield}
        variant="standard"
        multiline
        name="title"
        onChange={handleChange}
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
    </Box>
  );
};

const Second = ({ formData, setFormData, setValid }) => {
  setValid(true);
  const handleChange = (e) => {
    setFormData({ ...formData, ["type"]: e.target.value });
  };
  return (
    <Box>
      {/* put phrase text here (should've been validated first) */}
      <div className={styles.formData}>
        <Typography variant="h5">" {formData.title} "</Typography>
      </div>
      <Typography variant="h4">What category does it fall under? </Typography>
      {/* drop down here */}
      <Select value={formData.type} onChange={handleChange}>
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

const Third = ({ formData, setFormData }) => (
  <Box>
    <div className={styles.formData}>
      {/* put phrase text here (should've been validated first) */}
      <Typography variant="h5">" {formData.title} "</Typography>
      {/* put phrase type here */}
      <Paper className={styles.type}>{formData.type}</Paper>
    </div>
    <Typography variant="h4">What does it mean? </Typography>
    {/* textbox */}
  </Box>
);
const Fourth = ({ formData, setFormData }) => (
  <Box>
    {/* put phrase text here (should've been validated first) */}
    {/* put phrase type here */}
    <Typography variant="h4">Any sample sentences? </Typography>
    {/* sentences input
     */}
  </Box>
);
const Fifth = ({ formData, setFormData }) => (
  <Box>
    {/* put phrase text here (should've been validated first) */}
    {/* put phrase type here */}
    {/* put sample sentences here */}
    <Typography variant="h4">Any keywords? </Typography>
    {/* keywords input box (in a paper) */}
  </Box>
);

const Sixth = ({ formData, setFormData }) => (
  <Box>
    {/* put phrase text here (should've been validated first) */}
    {/* put phrase type here */}
    {/* put sample sentences here */}
    {/* put keywords here */}
    <Typography variant="h4">Any related entries? </Typography>
    {/* add related entries like adding keywords (all in one paper) */}
  </Box>
);

const Review = ({ formData, setFormData }) => {
  <Box>
    <Typography variant="h4">Review your data: </Typography>
  </Box>;
};

// when submitted
// "your phrase has been submitted for approval"
// turn it into a "pending" phrase
// a new phrase but tagged as "pending"
// that the user can see too
