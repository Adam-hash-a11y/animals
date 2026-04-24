import request from "supertest";
import { app } from "../../src/api/api";
import { Server } from "node:http";
import {
  getFilteredPersons,
  getPeopleStats,
} from "../../src/service/personServices";

describe("GET /:id", () => {
  let server: Server;
  beforeAll((done) => {
    server = app.listen(3000);
    done();
  });

  afterAll((done) => {
    server.close();
    done();
  });

  it("should return the body of the given id", async () => {
    //Given
    const userId = 11;

    //When
    const response = await request(app).get(`/api/persons/${userId}`);

    //Then
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual([
      {
        id: 11,
        name: "Mia Taylor",
        age: 26,
        gender: "female",
        type: "women",
      },
    ]);
  });
  it("should return an error (404) not found for non existing id", async () => {
    //Given
    const userId = 30;

    //When
    const response = await request(app).get(`/api/persons/${userId}`);

    //Then
    expect(response.status).toBe(404);
    expect(response.body.error).toBe("person is not found");
  });

  it("should return an error (400) bad request if the id is a string ", async () => {
    //Given
    const userId = "abc";

    //When
    const response = await request(app).get(`/api/persons/${userId}`);

    //Then
    expect(response.status).toBe(400);
    expect(response.body).toStrictEqual({
      error: "invalid id, the id must a number",
    });
  });
});

describe("test GET/ stats", () => {
  let server: Server;
  beforeAll((done) => {
    server = app.listen(3000);
    done();
  });

  afterAll((done) => {
    server.close();
    done();
  });
  it("should return the statistics of people", async () => {
    //Given
    const expectedStats = getPeopleStats();

    //When
    const response = await request(app).get(`/api/persons/stats`);

    //Then
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual(expectedStats);
  });

  it("should return an object with kids, men and women counts", async () => {
    // When
    const response = await request(app).get("/api/persons/stats");

    // Then
    expect(response.body).toHaveProperty("Number of kids");
    expect(response.body).toHaveProperty("Number of men");
    expect(response.body).toHaveProperty("Number of women");
  });
});

describe("test GET / ", () => {
  let server: Server;
  beforeAll((done) => {
    server = app.listen(3000);
    done();
  });

  afterAll((done) => {
    server.close();
    done();
  });
  it("should return peolple who matches the given query params", async () => {
    //Given
    const gender = "male";
    const type = "kid";
    const expectedResult = getFilteredPersons(gender, type);

    //When
    const result = await request(app).get(
      `/api/persons/?gender=${gender}&type=${type}`,
    );

    //Then
    expect(result.status).toBe(200);
    expect(result.body).toStrictEqual(expectedResult);
  });
  it("should return people who match gender only", async () => {
    // Given
    const gender = "male";
    const expectedResult = getFilteredPersons(gender);

    // When
    const result = await request(app).get(`/api/persons/?gender=${gender}`);

    // Then
    expect(result.status).toBe(200);
    expect(result.body).toStrictEqual(expectedResult);
  });
  it("should return people who match type only", async () => {
    // Given
    const type = "kid";
    const expectedResult = getFilteredPersons(undefined, type);

    // When
    const result = await request(app).get(`/api/persons/?type=${type}`);

    // Then
    expect(result.status).toBe(200);
    expect(result.body).toStrictEqual(expectedResult);
  });
  it("should return all people when no query params are provided", async () => {
    // When
    const result = await request(app).get(`/api/persons/`);

    // Then
    expect(result.status).toBe(200);
    expect(result.body).toStrictEqual(getFilteredPersons());
  });
  it("should return 400 for invalid gender query param key", async () => {
    // Given
    const invalidParam = "gendr=male";

    // When
    const result = await request(app).get(`/api/persons/?${invalidParam}`);

    // Then
    expect(result.status).toBe(400);
    expect(result.body.message).toBe("invalid query params");
  });

  it("should return 400 for invalid type query param key", async () => {
    // Given
    const invalidParam = "vkc=kid";

    // When
    const result = await request(app).get(`/api/persons/?${invalidParam}`);

    // Then
    expect(result.status).toBe(400);
    expect(result.body.message).toBe("invalid query params");
  });

  it("should return 400 for invalid gender value", async () => {
    //Given
    const gender = "animal";

    // When
    const result = await request(app).get(`/api/persons/?gender=${gender}`);

    // Then
    expect(result.status).toBe(400);
    expect(result.body.message).toBe("gender must be male or female");
  });
  it("should return 400 for invalid gender value", async () => {
    //Given
    const type = "car";

    // When
    const result = await request(app).get(`/api/persons/?type=${type}`);

    // Then
    expect(result.status).toBe(400);
    expect(result.body.message).toBe("type must be kid, men or women");
  });
});
