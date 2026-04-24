import express from "express";
import {
  findPersonById,
  addPersons,
  getStats,
  getPersons,
} from "../controller/person.controller";

export const personRouter = express.Router();
personRouter.get("/", getPersons);
personRouter.get("/stats", getStats);
personRouter.get("/:id", findPersonById);
personRouter.post("/add-person", addPersons);
