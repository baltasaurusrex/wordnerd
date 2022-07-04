import axios from "axios";

export async function search(q) {
  try {
    const results = (await axios.get("/api/search", { params: { q } })).data;
    return results;
  } catch (err) {
    return err;
  }
}
