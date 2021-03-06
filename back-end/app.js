import "dotenv/config";
import express from "express";
import morgan from "morgan";
import cors from "cors";

import auth from "./middleware/auth.js";

// routes imports
import authRoutes from "./apps/auth/routes.js";
import companyRoutes from "./apps/companies/routes.js";
import contactRoutes from "./apps/contacts/routes.js";
import dealRoutes from "./apps/deals/routes.js";
import quoteRoutes from "./apps/quotes/routes.js";
import ticketRoutes from "./apps/tickets/routes.js";
import taskRoutes from "./apps/tasks/routes.js";
import picklistRoutes from "./apps/fields/picklist/routes.js";

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.use(auth());

app.get("/check", (req, res) => {
  res.json({ data: "Application is up & running!" });
});

app.use("/v1/api/auth", authRoutes);
app.use("/v1/api/companies", companyRoutes);
app.use("/v1/api/contacts", contactRoutes);
app.use("/v1/api/deals", dealRoutes);
app.use("/v1/api/quotes", quoteRoutes);
app.use("/v1/api/tickets", ticketRoutes);
app.use("/v1/api/tasks", taskRoutes);
app.use("/v1/api/fields/picklist", picklistRoutes);

app.all("*", (req, res) => {
  res.status(404).json({ error: "4-0-4" });
});

app.use((err, req, res, next) => {
  console.log(err);
  if (err.code === "invalid_token") {
    res.status(401).json({ error: "Authentication token is expired" });
  } else if (err.code === "credentials_required") {
    res.status(401).json({ error: "No authorization token was found" });
  } else {
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Application is up & running at ${PORT}!`);
});
