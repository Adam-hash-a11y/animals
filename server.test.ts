import request from "supertest";
import { app } from "./server";
import { Server } from "node:http";

describe("GET /", () => {
  let server: Server;
  beforeAll((done) => {
    server = app.listen(3000);
    done();
  });

  afterAll((done) => {
    server.close();
    done();
  });

  it("should return Hello world ", async () => {
    // When
    const response = await request(app).get("/");

    // Then
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello World");
  });
});

describe("POST /adam", () => {
  let server: Server;
  beforeAll((done) => {
    server = app.listen(3000);
    done();
  });

  afterAll((done) => {
    server.close();
    done();
  });
  it("should return the given body in the request ", async () => {
    //Given

    const payload = { name: "adam", secondName: "hamdi" };
    // When
    const response = await request(app)
      .post("/adam")
      .send(payload)
      .set("Content-Type", "application/json")
      .set("Accept", "application/json");

    // Then
    expect(response.status).toBe(200);
    expect(response.body).toStrictEqual({ name: "adam", secondName: "hamdi" });
  });
});
