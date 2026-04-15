/*import express from "express";
import { submitContact } from "../controllers/contactController.js";

const contactRouter = express.Router();

contactRouter.post("/submit", submitContact);

export default contactRouter;*/

import express from "express";
import { submitContact, getMessages } from "../controllers/contactController.js";
import adminAuth from "../middleware/adminAuth.js";

const contactRouter = express.Router();

contactRouter.post("/submit", submitContact);
contactRouter.get("/messages", adminAuth, getMessages);

export default contactRouter;