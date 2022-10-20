import { getToken } from "next-auth/jwt";
import { getUserDetails } from "../../../controllers/users.js";

import { deletePhrase } from "../../../controllers/phrases.js";
export default async function (req, res) {
  try {
    console.log("req: ", req);
    let result = {};
    switch (req.method) {
      case "DELETE":
        console.log(`case "DELETE"`);
        result = await delete_controller(req);
      default:
        break;
    }

    return res.status(200).json({ deleted_phrase: result });
  } catch (err) {
    console.log("error");
    return res.status(err.errCode).send(err.message);
  }
}

const delete_controller = async (req) => {
  try {
    console.log("in delete_controller");
    // check if you have permissions
    let hasPermission = true;

    if (!hasPermission) throw { errCode: 401, message: "Unauthorized." };
    const res = await deletePhrase(req.query.id);
    return res;
  } catch (err) {
    console.log("err: ", err);
    throw err;
  }
};
