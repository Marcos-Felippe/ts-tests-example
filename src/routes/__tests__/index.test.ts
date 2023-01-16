import app from "../../app";
import request from "supertest";
import { describe, expect } from '@jest/globals';

describe("POST /register", () => {
  it("should return status code 201 if first name is passed", async () => {
    const res = await request(app)
      .post("/register")
      .send({ firstName: "John" });
      
    expect(res.statusCode).toEqual(201);
  });

  it("should return bad request if firstname is missing", async () => {
    const res = await request(app).post("/register").send();
    expect(res.statusCode).toEqual(400);
  });
});

describe("GET /user", () => {
    it("should return status code 200", async () => {
        const res = await request(app)
          .get("/user");
        
        expect(res.statusCode).toEqual(200);
        expect(res.body).toEqual({
            user: {
                name: "Felippe"
            }
        });
    });
});