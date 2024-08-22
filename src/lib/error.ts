export class BaseError extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
  }
}

export class NotFoundError extends BaseError {
  constructor() {
    super("Resource not found");
    this.name = "NotFoundError";
  }
}

export class LoginError extends BaseError {
  constructor() {
    super("Invalid email or password");
    this.name = "LoginError";
  }
}

export class AuthenticationError extends BaseError {
  constructor() {
    super("You must be logged in to access this resource");
    this.name = "AuthenticationError";
  }
}

export class RateLimitError extends BaseError {
  constructor() {
    super("Rate limit exceeded");
    this.name = "RateLimitError";
  }
}
