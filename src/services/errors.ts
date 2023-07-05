type ErrorStatus = 404 | 500;

class ErrorService {
  private static readonly STATUS_ERROR_MAP: { [key in ErrorStatus ]: string }= {
    404: 'Unable to find collection log for user {username}',
    500: 'Error connecting to api.collectionlog.net',
  };

  public static mapError(error: any, username: string) {
    const statusCode = error.request.status as ErrorStatus;
    return this.formatErrorMessage(
      this.STATUS_ERROR_MAP[statusCode],
      username
    );
  }

  private static formatErrorMessage(errorMessage: string, username: string) {
    return errorMessage.replace('{username}', username);
  }
}

export default ErrorService;
