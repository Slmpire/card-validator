import request from "supertest";
import app from "../app";

describe("POST /card/validate", () => {
  it("returns 200 and valid true for a valid card number", async () => {
    const res = await request(app)
      .post("/card/validate")
      .send({ cardNumber: "4111111111111111" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ valid: true });
  });

  it("returns 200 and valid false for an invalid card number", async () => {
    const res = await request(app)
      .post("/card/validate")
      .send({ cardNumber: "1234567890123456" });

    expect(res.status).toBe(200);
    expect(res.body).toEqual({ valid: false });
  });

  it("returns 400 when cardNumber is missing", async () => {
    const res = await request(app)
      .post("/card/validate")
      .send({});

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("returns 400 when cardNumber is not a string", async () => {
    const res = await request(app)
      .post("/card/validate")
      .send({ cardNumber: 12345 });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });

  it("returns 400 when cardNumber is an empty string", async () => {
    const res = await request(app)
      .post("/card/validate")
      .send({ cardNumber: "" });

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});