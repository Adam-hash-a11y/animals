import { Request, Response } from "express";
import { filterById, addPerson } from "../service/personServices";
import {
  isValidId,
  validatePersonCreation,
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

export const addPersons = (req: Request, res: Response) => {
  const valid = validatePersonCreation(req.body);
  if (valid) {
    const result = addPerson(req.body);

    return res.status(200).json(result);
  } else {
    return res
      .status(403)
      .json({ message: "missing paramaters or invalid paramaters" });
  }
};
