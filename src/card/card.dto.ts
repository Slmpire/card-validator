export interface ValidateCardRequest {
  cardNumber: unknown;
}

export interface ValidateCardResponse {
  valid: boolean;
}

export interface ErrorResponse {
  error: string;
}