# Card Validator API

A REST API that validates payment card numbers using the Luhn algorithm.

## Tech Stack

- Node.js
- TypeScript (strict mode)
- Express.js
- Jest + Supertest

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

Server starts on `http://localhost:3000`

### Run tests

```bash
npx jest
```

## Endpoint

### POST /card/validate

Validates whether a card number is valid.

**Request**
```json
{
  "cardNumber": "4111111111111111"
}
```

**Response — valid card**
```json
{
  "valid": true
}
```

**Response — invalid card**
```json
{
  "valid": false
}
```

**Response — bad input**
```json
{
  "error": "cardNumber is required"
}
```

**HTTP Status Codes**
- `200` — request was valid, result is in the `valid` field
- `400` — missing, empty, or non-string input
- `500` — unexpected server error

## Design Decisions

### Why Express over NestJS?
This project requires a single endpoint. Express keeps the setup minimal and every line of code is easy to walk through and explain. NestJS would add unnecessary boilerplate for this scope.

### Why the Luhn algorithm?
The Luhn algorithm is the industry-standard checksum used by card networks (Visa, Mastercard, Amex) to catch accidental digit errors. It validates the structure and integrity of a card number without contacting any external service. It is the correct tool for this problem.

### Why does an invalid card return 200 and not 400?
A card failing Luhn is not a bad request — the input was well-formed. The client sent a string, the server processed it, and the answer is "not valid". That is a successful operation with a negative result, which maps to `200`. A `400` is reserved for requests the server cannot process at all — missing fields, wrong types, empty strings.

### Card number formatting
The API accepts card numbers with spaces or dashes (e.g. `4111 1111 1111 1111`) and strips them before validation. This matches how users typically see and copy card numbers.