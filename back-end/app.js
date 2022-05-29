import express from "express";
import morgan from "morgan";
import cors from "cors";

const app = express();

app.use(cors());
app.use(morgan("tiny"));

app.get("/check", (req, res) => {
  res.json({ data: "Application is up & running!" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Application is up & running at ${PORT}!`);
});
