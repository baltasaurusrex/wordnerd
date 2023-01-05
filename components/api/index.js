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
export async function get_authors(q) {
  try {
    const res = (await axios.get("/api/get_authors", { params: { q } })).data;

    return res;
  } catch (err) {
    return err;
  }
}

export async function create_phrase(data) {
  try {
    console.log("in create_phrase API");
    const res = await axios.post("/api/phrase", { ...data });
    return res;
  } catch (err) {
    return err;
  }
}
