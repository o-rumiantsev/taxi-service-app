export default class APIError extends Error {
  code: number; // API Error Code
  statusCode = 400; // Bad Request Error

  constructor(message: string, code: number) {
    super(message);
    this.code = code;
  }
}
