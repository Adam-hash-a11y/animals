import { GENDER, Person, TYPE } from "../../src/types/person.type";
import {
  isValidId,
  isValidBody,
  isExisitingPerson,
  isValidAge,
  isValidGender,
  isValidKeys,
  isValidName,
  isValidType,
} from "../../src/validator/person.validator";

describe("test isValidId validator function", () => {
  it("should return true if the given id is an integer", () => {
    //Given
    const id = 15;

    //When
    const result = isValidId(id);

    //Then
    expect(result).toBeTruthy();
  });

  it("should return false if the given id is a string", () => {
    //Given
    const id = "aa" as unknown as number;

    //When
    const result = isValidId(id);

    //Then
    expect(result).toBeFalsy();
  });
});

describe("test IsValidBody validator function", () => {
  it("should return true if the body properties are valid", () => {
    //Given
    const body = {
      id: 15,
      name: "Amelia Harris",
      age: 5,
      gender: GENDER.female,
      type: TYPE.kid,
    };

    //When
    const result = isValidBody(body);

    //Then
    expect(result).toBeTruthy();
  });

  it("should return false any of the given properties are misstyped", () => {
    //Given
    const body = {
      i: 15, // wrong prop typed as i not id
      name: "Amelia Harris",
      age: 5,
      gender: GENDER.female,
      type: TYPE.kid,
    } as unknown as Person;

    //When
    const result = isValidBody(body);

    //Then
    expect(result).toBeFalsy();
  });

  it("should return false any of the given properties are missing", () => {
    //Given
    const body = {
      name: "Amelia Harris",
      age: 5,
      gender: GENDER.female,
      type: TYPE.kid,
    } as unknown as Person;

    //When
    const result = isValidBody(body);

    //Then
    expect(result).toBeFalsy();
  });
});

describe("isValidKeys", () => {
  it("should return true when all keys are valid", () => {
    // Given
    const body = {
      id: 1,
      name: "Adam Hamdi",
      age: 25,
      gender: GENDER.male,
      type: TYPE.men,
    };

    // When
    const result = isValidKeys(body);

    // Then
    expect(result).toBe(true);
  });

  it("should return false when an extra key is present", () => {
    // Given
    const body = {
      id: 1,
      name: "Adam Hamdi",
      age: 25,
      gender: GENDER.male,
      type: TYPE.men,
      extra: "x",
    } as unknown as Person;

    // When
    const result = isValidKeys(body);

    // Then
    expect(result).toBe(false);
  });

  it("should return false when a key is missing", () => {
    // Given
    const body = {
      name: "Adam Hamdi",
      age: 25,
      gender: GENDER.male,
      type: TYPE.men,
    } as unknown as Person;

    // When
    const result = isValidKeys(body);

    // Then
    expect(result).toBe(false);
  });
});

describe("isValidName", () => {
  it("should return true for a valid name", () => {
    // Given
    const name = "Adam Hamdi";

    // When
    const result = isValidName(name);

    // Then
    expect(result).toBe(true);
  });

  it("should return false when name contains numbers", () => {
    // Given
    const name = "Adam123";

    // When
    const result = isValidName(name);

    // Then
    expect(result).toBe(false);
  });

  it("should return false when name is less than 3 characters", () => {
    // Given
    const name = "Ad";

    // When
    const result = isValidName(name);

    // Then
    expect(result).toBe(false);
  });
});

describe("isValidGender", () => {
  it("should return true for male", () => {
    // Given
    const gender = GENDER.male;

    // When
    const result = isValidGender(gender);

    // Then
    expect(result).toBe(true);
  });

  it("should return true for female", () => {
    // Given
    const gender = GENDER.female;

    // When
    const result = isValidGender(gender);

    // Then
    expect(result).toBe(true);
  });

  it("should return false for invalid gender", () => {
    // Given
    const gender = "attack helicopter";

    // When
    const result = isValidGender(gender);

    // Then
    expect(result).toBe(false);
  });
});

describe("isValidType", () => {
  it("should return true for kid", () => {
    // Given
    const type = TYPE.kid;

    // When
    const result = isValidType(type);

    // Then
    expect(result).toBe(true);
  });

  it("should return false for invalid type", () => {
    // Given
    const type = "invalid";

    // When
    const result = isValidType(type);

    // Then
    expect(result).toBe(false);
  });
});

describe("isValidId", () => {
  it("should return true for a positive integer", () => {
    // Given
    const id = 5;

    // When
    const result = isValidId(id);

    // Then
    expect(result).toBe(true);
  });

  it("should return false for 0", () => {
    // Given
    const id = 0;

    // When
    const result = isValidId(id);

    // Then
    expect(result).toBe(false);
  });

  it("should return false for negative number", () => {
    // Given
    const id = -1;

    // When
    const result = isValidId(id);

    // Then
    expect(result).toBe(false);
  });

  it("should return false for a string", () => {
    // Given
    const id = "abc" as unknown as number;

    // When
    const result = isValidId(id);

    // Then
    expect(result).toBe(false);
  });
});

describe("isValidAge", () => {
  it("should return true for a valid age", () => {
    // Given
    const age = 25;

    // When
    const result = isValidAge(age);

    // Then
    expect(result).toBe(true);
  });

  it("should return false for 0", () => {
    // Given
    const age = 0;

    // When
    const result = isValidAge(age);

    // Then
    expect(result).toBe(false);
  });

  it("should return false for age above 150", () => {
    // Given
    const age = 151;

    // When
    const result = isValidAge(age);

    // Then
    expect(result).toBe(false);
  });

  it("should return false for a float", () => {
    // Given
    const age = 25.5;

    // When
    const result = isValidAge(age);

    // Then
    expect(result).toBe(false);
  });
});

describe("isExistingPerson", () => {
  it("should return false when person exists", () => {
    // Given
    const id = 11;

    // When
    const result = isExisitingPerson(id);

    // Then
    expect(result).toBe(false);
  });

  it("should return true when person does not exist", () => {
    // Given
    const id = 99999;

    // When
    const result = isExisitingPerson(id);

    // Then
    expect(result).toBe(true);
  });
});
