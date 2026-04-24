import validator from "validator";
import { GENDER, Person, TYPE } from "../types/person.type";
import { personList } from "../data/personData";

export const isValidBody = (body: Person): boolean => {
  return (
    isValidAge(body.age) &&
    isValidGender(body.gender) &&
    isValidId(body.id) &&
    isValidName(body.name) &&
    isValidType(body.type) &&
    isValidKeys(body)
  );
};

export const isValidQueryParams = (query: Record<string, unknown>): boolean => {
  for (const key of Object.keys(query)) {
    if (key != "gender" && key != "type") {
      return false;
    }
  }
  return true;
};

export const isValidKeys = (body: Person): boolean => {
  for (const key of Object.keys(body)) {
    if (
      key !== "id" &&
      key !== "name" &&
      key !== "age" &&
      key !== "gender" &&
      key !== "type"
    )
      return false;
  }
  if (
    body.id == undefined ||
    body.id == null ||
    body.name == undefined ||
    body.name == null ||
    body.name == "" ||
    body.age == null ||
    body.age == undefined ||
    body.type == null ||
    body.type == undefined ||
    body.type == null ||
    body.type == undefined
  ) {
    return false;
  }

  return true;
};

export const isValidName = (name: string): boolean => {
  return validator.isAlpha(name, "en-US", { ignore: " " }) && name.length >= 3;
};

export const isValidGender = (gender: string): boolean => {
  return gender === GENDER.male || gender === GENDER.female;
};

export const isValidType = (type: string): boolean => {
  return type === TYPE.kid || type === TYPE.men || type === TYPE.women;
};

export const isValidId = (id: number) => {
  return Number.isInteger(id) && id > 0;
};

export const isValidAge = (age: number): boolean => {
  return Number.isInteger(age) && age > 0 && age <= 150;
};

export const isExisitingPerson = (id: number): boolean => {
  const found = personList.find((p) => p.id === id);
  if (found) {
    return false;
  }
  return true;
};
