import express from "express";
import smartSearch from "../controllers/searchController.js";

const searchRouter = express.Router();

searchRouter.get("/", smartSearch);

export default searchRouter;