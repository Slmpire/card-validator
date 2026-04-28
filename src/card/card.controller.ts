import { Request, Response } from "express";
import { validateCard } from "./card.service";
import { ValidateCardRequest } from "./card.dto";

export function validateCardController(req: Request, res: Response): void {
  const { cardNumber } = req.body as ValidateCardRequest;

  if (cardNumber === undefined || cardNumber === null) {
    res.status(400).json({ error: "cardNumber is required" });
    return;
  }

  if (typeof cardNumber !== "string") {
    res.status(400).json({ error: "cardNumber must be a string" });
    return;
  }

  if (cardNumber.trim() === "") {
    res.status(400).json({ error: "cardNumber must not be empty" });
    return;
  }

  const valid = validateCard(cardNumber);
  res.status(200).json({ valid });
}