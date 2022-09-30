import axios from "axios";

export async function get_phrases(q) {
  try {
    const results = (await axios.get("/api/phrase/search", { params: { q } }))
      .data;
    return results;
  } catch (err) {
    return err;
  }
}

export async function get_keywords(q) {
  try {
    const results = (await axios.get("/api/get_keywords", { params: { q } }))
      .data;

    return results;
  } catch (err) {
    return err;
  }
}
