import express from "express";
import {
  findPersonById,
  addPersons,
  getStats,
  getPersons,
  deletePersonById,
} from "../controller/person.controller";

export const personRouter = express.Router();
personRouter.delete("/:id", deletePersonById);
personRouter.get("/", getPersons);
personRouter.get("/stats", getStats);
personRouter.get("/:id", findPersonById);
personRouter.post("/add-person", addPersons);
