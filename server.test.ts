// server.test.ts
import request from "supertest";
import express from "express";

describe("GET /", () => {
  it("Given the server is running, When GET / is called, Then it returns Hello World", async () => {
    // Given

    const app = express();
    app.get("/", (req, res) => {
      res.send("Hello World");
    });

    // When
    const response = await request(app).get("/");

    // Then
    expect(response.status).toBe(200);
    expect(response.text).toBe("Hello World");
  });
});
