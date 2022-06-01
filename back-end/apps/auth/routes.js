import { Router } from "express";

import login from "./login.js";
import register from "./register.js";
import reset from "./reset.js";

const router = Router();

// prefix: http://localhost:5000/v1/api/auth
router.post("/login", login);
router.post("/register", register);
router.post("/reset", reset);

export default router;
