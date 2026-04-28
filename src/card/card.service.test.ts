import { validateCard } from "./card.service";

describe("validateCard", () => {
  it("returns true for a valid Visa test card number", () => {
    expect(validateCard("4111111111111111")).toBe(true);
  });

  it("returns true for a card number with spaces", () => {
    expect(validateCard("4111 1111 1111 1111")).toBe(true);
  });

  it("returns true for a card number with dashes", () => {
    expect(validateCard("4111-1111-1111-1111")).toBe(true);
  });

  it("returns false for a number that fails Luhn", () => {
    expect(validateCard("1234567890123456")).toBe(false);
  });

  it("returns false for an empty string", () => {
    expect(validateCard("")).toBe(false);
  });

  it("returns false for non-numeric characters", () => {
    expect(validateCard("abcd1234efgh5678")).toBe(false);
  });

  it("returns false for a number that is too short", () => {
    expect(validateCard("411111")).toBe(false);
  });

  it("returns false for a number that is too long", () => {
    expect(validateCard("41111111111111111111")).toBe(false);
  });
});