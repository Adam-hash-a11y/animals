import { personList } from "../../src/data/personData";
import {
  addPerson,
  filterById,
  getFilteredPersons,
  getPeopleStats,
} from "../../src/service/personServices";
import { GENDER, TYPE } from "../../src/types/person.type";

describe("test filterById function", () => {
  test("should return the element that matches the given Id", () => {
    //Given
    const id = 12;

    //When
    const result = filterById(id);

    //Then
    expect(result).toStrictEqual([
      {
        age: 8,
        gender: "male",
        id: 12,
        name: "Lucas Moore",
        type: "kid",
      },
    ]);
  });
  test("should return an empty array when no element macthes the id", () => {
    //Given
    const id = 20;

    //When
    const result = filterById(id);

    //Then
    expect(result).toStrictEqual([]);
  });
  test("should return an empty array if id is negative", () => {
    //Given
    const id = -1;

    //When
    const result = filterById(id);

    //Then
    expect(result).toStrictEqual([]);
  });
});

describe("test addPerson service function", () => {
  it("should add a person to the list and return the updated list", () => {
    // Given
    const body = {
      id: 99999,
      name: "Adam Hamdi",
      age: 25,
      gender: GENDER.male,
      type: TYPE.men,
    };

    // When
    const result = addPerson(body);

    // Then
    expect(result).toContainEqual(body);
  });

  it("should return the full person list after adding", () => {
    // Given
    const body = {
      id: 99998,
      name: "Amelia Harris",
      age: 5,
      gender: GENDER.female,
      type: TYPE.kid,
    };

    // When
    const result = addPerson(body);

    // Then
    expect(result).toContainEqual(body);
  });
});

describe("test getPeopleStats service function", () => {
  it("should return an object with kids men and women counts", () => {
    // When
    const result = getPeopleStats();

    // Then
    expect(result).toHaveProperty("Number of kids");
    expect(result).toHaveProperty("Number of men");
    expect(result).toHaveProperty("Number of women");
  });
  it("should return counts that add up to total persons", () => {
    // When
    const result = getPeopleStats();
    const total =
      result["Number of kids"] +
      result["Number of men"] +
      result["Number of women"];

    // Then
    expect(total).toBe(personList.length);
  });
});

describe("test getFilteredPersons service function", () => {
  it("should return people matching both gender and type", () => {
    // Given
    const gender = GENDER.male;
    const type = TYPE.kid;

    // When
    const result = getFilteredPersons(gender, type);

    // Then
    for (const person of result) {
      expect(person.gender).toBe(gender);
      expect(person.type).toBe(type);
    }
  });

  it("should return people matching gender only", () => {
    // Given
    const gender = GENDER.male;

    // When
    const result = getFilteredPersons(gender);

    // Then
    for (const person of result) {
      expect(person.gender).toBe(gender);
    }
  });

  it("should return people matching type only", () => {
    // Given
    const type = TYPE.kid;

    // When
    const result = getFilteredPersons(undefined, type);

    // Then
    for (const person of result) {
      expect(person.type).toBe(type);
    }
  });

  it("should return all people when no params provided", () => {
    // When
    const result = getFilteredPersons();

    // Then
    expect(result.length).toBe(personList.length);
  });

  it("should return empty array when no match found", () => {
    // Given
    const gender = GENDER.male;
    const type = TYPE.women;

    // When
    const result = getFilteredPersons(gender, type);

    // Then
    expect(result).toStrictEqual([]);
  });
});
