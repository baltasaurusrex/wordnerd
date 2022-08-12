import { getToken } from "next-auth/jwt";
import { getUserDetails } from "../../../controllers/users.js";

const secret = process.env.NEXTAUTH_SECRET;

export default async function (req, res) {
  try {
    console.log("req.method: ", req.method);
    if (req.method !== "POST") {
      // throw { code: 400, message: "Not signed in." };
    }

    const token = await getToken({ req, secret });
    console.log("token: ", token);

    if (!token) {
      throw { code: 401, message: "Not signed in." };
    }

    const user = await getUserDetails(token.email);

    // let phrase = await createPhrase(req.body);

    res.status(200).send("ok");
  } catch (err) {
    res.status(err.code).send(err.message);
  }
}
