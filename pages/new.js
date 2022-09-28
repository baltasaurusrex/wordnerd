import { useEffect, useState } from "react";
import Head from "next/head";
import { Box, Button, Typography, Paper, Grid } from "@mui/material";

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

import TitleForm from "../components/new/TitleForm.js";
import TypeForm from "../components/new/TypeForm.js";
import DescriptionForm from "../components/new/DescriptionForm.js";
import SentencesForm from "../components/new/SentencesForm.js";
import KeywordsForm from "../components/new/KeywordsForm.js";

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

  const goToNextPage = () => {
    setPage((prev) => prev + 1);
    setValid(false);
  };

  const goToPrevPage = () => {
    setPage((prev) => prev - 1);
    setValid(true);
  };

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
            valid={valid}
            goToNextPage={goToNextPage}
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
            valid={valid}
            goToNextPage={goToNextPage}
            setValid={setValid}
          />
        );
      case 3:
        return (
          <SentencesForm
            formData={formData}
            setFormData={setFormData}
            valid={valid}
            goToNextPage={goToNextPage}
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
          <Typography>{formData.description}</Typography>
        </Grid>
      )}
      {page > 3 && (
        <Grid style={{ margin: "1rem 0" }}>
          <Typography variant="subtitle1" style={{ fontStyle: "italic" }}>
            "{formData.sampleSentences[0]}"
          </Typography>
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
              {page > 0 && <Button onClick={goToPrevPage}>Previous</Button>}
              <Button onClick={goToNextPage} disabled={!valid}>
                Next
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

const RelatedEntriesForm = ({ formData, setFormData }) => (
  <Box>
    <Typography variant="h5">Any related entries? </Typography>
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
