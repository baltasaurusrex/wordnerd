export default async (req, res) => {
  try {
    console.log("req.method", req.method);
    return res.send("hi");
  } catch (err) {
    return res.status(400).send(err);
  }
};
