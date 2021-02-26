import request from "supertest";
import { app } from "../app";

describe("urls", () => {

  it("Should be and invalid URL", async () => {
    const response = await request(app).post("/encurtador")
      .send({
        url: "https://wiser"
      });

    expect(response.status).toBe(400);
    return;
  });
});