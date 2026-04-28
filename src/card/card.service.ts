function normalise(cardNumber: string): string {
  return cardNumber.replace(/[\s-]/g, "");
}

function isWellFormed(digits: string): boolean {
  return /^\d+$/.test(digits) && digits.length >= 13 && digits.length <= 19;
}

function passesLuhn(digits: string): boolean {
  let sum = 0;
  let shouldDouble = false;

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = parseInt(digits[i], 10);

    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    shouldDouble = !shouldDouble;
  }

  return sum % 10 === 0;
}

export function validateCard(cardNumber: string): boolean {
  const digits = normalise(cardNumber);

  if (!isWellFormed(digits)) {
    return false;
  }

  return passesLuhn(digits);
}