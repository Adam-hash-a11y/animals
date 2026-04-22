import request from "supertest";
import { app } from "../../src/api/api";
import { Server } from "node:http";

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
