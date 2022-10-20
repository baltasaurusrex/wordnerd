import { getToken } from "next-auth/jwt";
import { getUserDetails } from "../../../controllers/users.js";
import { createPhrase } from "../../../controllers/phrases.js";

const secret = process.env.NEXTAUTH_SECRET;

export default async function (req, res) {
  try {
    console.log("req: ", req);
    let result = {};
    switch (req.method) {
      case "POST":
        console.log(`case "POST"`);
        result = await post_controller(req);
        break;
      default:
        break;
    }

    return res.status(200).json({ ...result });
  } catch (err) {
    res.status(err.code).send(err.message);
  }
}

const post_controller = async (req) => {
  try {
    console.log("in post_controller");
    const token = await getToken({ req, secret });
    console.log("token: ", token);

    if (!token) {
      throw { code: 401, message: "Not signed in." };
    }

    const user = await getUserDetails(token.email);
    console.log("user: ", user);

    let newPhrase = await createPhrase({ ...req.body, userId: user._id });

    return newPhrase;
  } catch (err) {
    throw err;
  }
};
