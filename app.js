const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const route = require("./Routes/health");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});
app.use(express.json());
app.use("/", route);
