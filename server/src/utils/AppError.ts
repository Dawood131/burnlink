export class AppError extends Error {
  statusCode: Number;
  code: string;

  constructor(statusCode: Number, code: string, message: string) {
    super(message);
    this.statusCode = statusCode;
    this.code = code;
  }
}
