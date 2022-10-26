// We would do all the hard work in this class.
export class WorkHandler {
  static handle(message: string): string {
    return `pong: ${message}`;
  }
}
