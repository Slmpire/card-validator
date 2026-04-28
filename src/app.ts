import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import cardRouter from "./card/card.router";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/card", cardRouter);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: "An unexpected error occurred" });
});

export default app;