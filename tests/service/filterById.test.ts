import { filterById } from "../../src/service/personServices";

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
