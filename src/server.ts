import express from "express";
const app = express();

app.get("/", function (req, res) {
  res.json({
    name: "gaowujian",
    age: req.query.age,
  });
});

app.listen(3000, () => {
  console.log("server is running on 3000");
});
