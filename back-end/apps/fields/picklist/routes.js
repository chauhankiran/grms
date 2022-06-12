import { Router } from "express";

import list from "./list.js";
import details from "./details.js";
import create from "./create.js";
import update from "./update.js";
import del from "./del.js";

const router = Router();

// prefix: http://localhost:5000/v1/api/fields/picklist
router.get("/:field", list);
router.get("/:field/:id", details);
router.post("/", create);
router.put("/:field/:id", update);
router.delete("/:field/:id", del);

export default router;
