import { app } from "../app";
import request from "supertest";

describe("task", () => {
  describe("get all tasks route", () => {
    it("should return status 200 and an array of tasks", async () => {
      const response = await request(app).get("/api/v1/tasks");
      console.log("Res", response);

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
    });
  });
});
