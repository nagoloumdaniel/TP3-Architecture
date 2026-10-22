export class ConsoleLogger {
  constructor({ clock = () => new Date() } = {}) { this.clock = clock; this.history = []; }
  info(message) {
    const line = `[${this.clock().toISOString()}] ${message}`;
    this.history.push(line);
    console.log(line);
  }
}
