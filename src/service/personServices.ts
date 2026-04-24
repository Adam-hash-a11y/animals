import { Person, TYPE } from "../types/person.type";
import { personList } from "../data/personData";

export function filterById(id: number): Person[] {
  return personList.filter((p) => {
    return p.id === id;
  });
}

export const addPerson = (body: Person): Person[] => {
  const { id, age, gender, type, name } = body;
  personList.push({ id, age, gender, type, name });
  return personList;
};

export const getPeopleStats = (): {
  "Number of kids": number;
  "Number of men": number;
  "Number of women": number;
} => {
  let kids = 0;
  let men = 0;
  let women = 0;
  for (const element of personList) {
    if (element.type === TYPE.kid) {
      kids++;
    }
    if (element.type === TYPE.men) {
      men++;
    }
    if (element.type === TYPE.women) {
      women++;
    }
  }
  return {
    "Number of kids": kids,
    "Number of men": men,
    "Number of women": women,
  };
};

export const getFilteredPersons = (gender?: string, type?: string) => {
  return personList.filter((person) => {
    if (gender && type) {
      return person.gender === gender && person.type === type;
    }
    if (gender) {
      return person.gender === gender;
    }
    if (type) {
      return person.type === type;
    }
    return true;
  });
};
