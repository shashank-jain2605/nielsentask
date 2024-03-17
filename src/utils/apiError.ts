class ApiError extends Error {
  statusCode: number;
  success: boolean;
  errors: string[];

  constructor(
    statusCode: number,
    message: string = "something went wrong",
    errors: string[] = []
  ) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.errors = errors;
  }
}
export { ApiError };
