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

declare class Example {
  public Method(): void;
}

// declare interface Person {
//   name: string;
// }

declare type Person = {
  name: string;
};

const a: Person = {
  name: "gao",
};
