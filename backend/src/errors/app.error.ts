export class AppError {
  constructor(
    public statusCode: number,
    public body: object,
  ) {
  }
}
