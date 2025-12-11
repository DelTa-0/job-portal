import CustomError from ".";

class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 404);
  }
}

class UnauthorizedError extends CustomError {
  constructor(message: string) {
    super(message, 401);
  }
}

class ForbiddenError extends CustomError {
  constructor(message: string) {
    super(message, 403);
  }
}

class EmailError extends CustomError {
  constructor(message: string) {
    super(message, 403);
  }
}

export { NotFoundError, UnauthorizedError, ForbiddenError, EmailError };