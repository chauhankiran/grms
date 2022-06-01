import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";

// routes imports
import authRoutes from "./apps/auth/routes.js";

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.get("/check", (req, res) => {
  res.json({ data: "Application is up & running!" });
});

app.use("/v1/api/auth", authRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ error: "4-0-4" });
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ error: "Internal server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Application is up & running at ${PORT}!`);
});
