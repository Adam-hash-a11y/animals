import { Request, Response } from "express";
import {
  filterById,
  addPerson,
  getPeopleStats,
  getFilteredPersons,
  deletePerson,
} from "../service/personServices";
import {
  isExisitingPerson,
  isValidAge,
  isValidGender,
  isValidId,
  isValidKeys,
  isValidName,
  isValidQueryParams,
  isValidType,
} from "../validator/person.validator";

export const findPersonById = (req: Request<{ id: string }>, res: Response) => {
  const userId = Number(req.params.id);

  if (!isValidId(userId)) {
    return res.status(400).json({ error: "invalid id, the id must a number" });
  }
  const result = filterById(userId);
  if (result.length === 0) {
    return res.status(404).json({ error: "person is not found" });
  } else {
    return res.status(200).json(result);
  }
};

export const deletePersonById = (req: Request, res: Response) => {
  const userId = Number(req.params.id);
  if (!isValidId(userId)) {
    return res
      .status(400)
      .json({ message: "invalid id, the id must be a number" });
  }
  if (isExisitingPerson(userId)) {
    return res.status(404).json({ message: "person not found" });
  }
  const result = deletePerson(userId);
  return res.status(200).json(result);
};

export const addPersons = (req: Request, res: Response) => {
  if (!isValidKeys(req.body)) {
    return res.status(400).json({ message: "invalid or missing fields" });
  }
  if (!isValidId(req.body.id)) {
    return res.status(400).json({ message: "id must be a positive integer" });
  }
  if (!isExisitingPerson(req.body.id)) {
    return res
      .status(409)
      .json({ message: "person with this id already exists" });
  }
  if (!isValidName(req.body.name)) {
    return res.status(400).json({
      message: "name must contain only letters and be at least 3 characters",
    });
  }
  if (!isValidAge(req.body.age)) {
    return res
      .status(400)
      .json({ message: "age must be a positive integer under 150" });
  }
  if (!isValidGender(req.body.gender)) {
    return res.status(400).json({ message: "gender must be male or female" });
  }
  if (!isValidType(req.body.type)) {
    return res.status(400).json({ message: "type must be kid, men or women" });
  }

  const result = addPerson(req.body);
  return res.status(201).json(result);
};

export const getStats = (req: Request, res: Response) => {
  const result = getPeopleStats();
  return res.status(200).json(result);
};

export const getPersons = (req: Request, res: Response) => {
  if (!isValidQueryParams(req.query)) {
    return res.status(400).json({ message: "invalid query params" });
  }
  //Validate correct Query params then deconsstructor
  const { gender, type } = req.query as { gender?: string; type?: string };

  if (gender && !isValidGender(gender)) {
    return res.status(400).json({ message: "gender must be male or female" });
  }
  if (type && !isValidType(type)) {
    return res.status(400).json({ message: "type must be kid, men or women" });
  }

  const result = getFilteredPersons(gender, type);
  if (result.length == 0) {
    return res
      .status(200)
      .json({ message: "found no people with the matching criterias" });
  }
  return res.status(200).json(result);
};
