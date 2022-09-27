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
  Grid,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";

import "animate.css";

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
          <TitleForm
            formData={formData}
            setFormData={setFormData}
            setValid={setValid}
          />
        );
      case 1:
        return (
          <TypeForm
            formData={formData}
            setFormData={setFormData}
            setValid={setValid}
          />
        );
      case 2:
        return (
          <DescriptionForm
            formData={formData}
            setFormData={setFormData}
            setValid={setValid}
          />
        );
      case 3:
        return (
          <SentencesForm
            formData={formData}
            setFormData={setFormData}
            setValid={setValid}
          />
        );
      case 4:
        return (
          <KeywordsForm
            formData={formData}
            setFormData={setFormData}
            setValid={setValid}
          />
        );
      case 5:
        return (
          <RelatedEntriesForm
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

  const previewCard = (
    <Paper elevation={1} className={styles.preview_card}>
      <Grid
        container
        style={{ justifyContent: "space-between", alignItems: "center" }}
      >
        {page > 0 && (
          <Grid item>
            <Typography variant="h5">{formData.title}</Typography>
          </Grid>
        )}
        {page > 1 && (
          <Grid item>
            <Paper component="span" style={{ padding: "0.5rem" }}>
              {formData.type}
            </Paper>
          </Grid>
        )}
      </Grid>
      {page > 2 && (
        <Grid style={{ margin: "1rem 0" }}>
          <Typography variant="subtitle">{formData.description}</Typography>
        </Grid>
      )}
    </Paper>
  );

  return (
    <>
      <Head>
        <title>WordNerd Beta</title>
        <link rel="icon" href="/WordNerd Logo Transparent.png" />
      </Head>
      <Box className={styles.container}>
        <Grid container className={styles.grid}>
          <Grid item lg={6} md={8} sm={12} xs={12}>
            {page > 0 && previewCard}
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
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

const TitleForm = ({ formData, setFormData, setValid }) => {
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

const DescriptionForm = ({ formData, setFormData, setValid }) => {
  const [error, setError] = useState(false);
  const [errorHelperText, setErrorHelperText] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, ["description"]: e.target.value });
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

const SentencesForm = ({ formData, setFormData }) => (
  <Box className="animate__animated animate__fadeIn">
    <Typography variant="h5">Any sample sentences? </Typography>
  </Box>
);

const KeywordsForm = ({ formData, setFormData }) => (
  <Box>
    <Typography variant="h4">Any keywords? </Typography>
    {/* keywords input box (in a paper) */}
  </Box>
);

const RelatedEntriesForm = ({ formData, setFormData }) => (
  <Box>
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
