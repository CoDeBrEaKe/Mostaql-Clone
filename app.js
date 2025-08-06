const express = require("express");
const app = express();
const PORT = 3000;
const userRoutes = require("./routes/userRoutes");
// This line parses the incoming requests to json format
app.use(express.json());

app.use("/api/users", userRoutes);

app.get("/", (req, res) => {
  res.json("sss");
});

app.listen(PORT, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port " + PORT
    );
  else console.log("Error occurred, server can't start", error);
});
