import { useEffect, useState } from "react";
import Head from "next/head";
import {
  Box,
  Button,
  Typography,
  Paper,
  Grid,
  Divider,
  Chip,
  Snackbar,
} from "@mui/material";

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
import RelatedEntriesForm from "../components/new/RelatedEntriesForm.js";

import * as API from "../components/api";

export default function New() {
  const [formData, setFormData] = useState({
    title: "",
    type: "word",
    author: "",
    description: "",
    sampleSentences: [""],
    keywords: [],
    relations: [],
  });
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(6);
  const [valid, setValid] = useState(false);

  useEffect(() => {
    console.log("valid: ", valid);
  }, [valid]);

  const goToNextPage = () => {
    setPage((prev) => prev + 1);
    setValid(false);
  };

  const goToPrevPage = () => {
    setPage((prev) => prev - 1);
    setValid(true);
  };

  const submitEntry = async () => {
    try {
      const res = await API.create_phrase(formData);
      console.log("res: ", res);
    } catch (err) {
      // if unsuccessful, redirect to error page
    }
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
            valid={valid}
          />
        );
      default:
        return <></>;
    }
  };

  const previewCard = (
    <Paper elevation={1} className={styles.preview_card}>
      <Grid
        container
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "nowrap",
        }}
      >
        {page > 0 && (
          <Grid item className="animate__animated animate__fadeIn">
            <Typography variant="h5">{formData.title}</Typography>
          </Grid>
        )}
        {page > 1 && (
          <Grid item className="animate__animated animate__fadeIn">
            <Paper component="span" style={{ padding: "0.5rem" }}>
              {formData.type}
            </Paper>
          </Grid>
        )}
      </Grid>
      {page > 1 && formData.type === "quote" && (
        <Grid container>
          <Grid item className={styles.author}>{`- ${formData.author}`}</Grid>
        </Grid>
      )}
      {page > 2 && (
        <Grid
          style={{ margin: "1rem 0" }}
          className="animate__animated animate__fadeIn"
        >
          <Typography>{formData.description}</Typography>
        </Grid>
      )}
      {page > 3 && (
        <Grid
          style={{ margin: "1rem 0" }}
          className="animate__animated animate__fadeIn"
        >
          <Typography
            variant="subtitle1"
            style={{ fontStyle: "italic", paddingLeft: "1rem" }}
          >
            &#x2022; "{formData.sampleSentences[0]}"
          </Typography>
        </Grid>
      )}
      {page > 4 && (
        <Grid
          className={`${styles.keywords_grid} animate__animated animate__fadeIn`}
        >
          {formData.keywords?.map((keyword, i) => (
            <Paper key={i} component="span">
              {keyword}
            </Paper>
          ))}
        </Grid>
      )}
      {page > 5 && formData.relations?.length > 0 && (
        <>
          <Divider className={`animate__animated animate__fadeIn`}>
            <Chip label="Related entries: " />
          </Divider>
          <Grid
            className={`${styles.keywords_grid} animate__animated animate__fadeIn`}
          >
            {formData.relations?.map((entry, i) => (
              <Paper key={i} component="span">
                {entry.title}
              </Paper>
            ))}
          </Grid>
        </>
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
            <Box className={styles.form}>{renderForm()}</Box>
            <Box className={styles.navigation}>
              {page > 0 && <Button onClick={goToPrevPage}>Previous</Button>}

              {page < 6 && (
                <Button onClick={goToNextPage} disabled={!valid}>
                  Next
                </Button>
              )}
              {page == 6 && <Button onClick={submitEntry}>Submit</Button>}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

// when submitted
// "your phrase has been submitted for approval"
// turn it into a "pending" phrase
// a new phrase but tagged as "pending"
// that the user can see too
