export type LogProperties = { [_: string]: unknown };
export type LogMessage = {
  message: string;
  timestamp: string;
  error?: Error;
} & LogProperties;

export class Logger {
  context: LogProperties = {};

  get isDebug() {
    return process.env.DEBUG;
  }

  getMessage(
    message: string,
    properties: LogProperties = {}
  ): LogMessage | string {
    const logMessage = {
      message,
      timestamp: new Date().toISOString(),
      ...this.context,
      ...properties,
    };
    return this.isDebug ? logMessage : JSON.stringify(logMessage);
  }

  debug(message: string, properties?: LogProperties) {
    if (!this.isDebug) return;
    this.info(message, properties);
  }

  info(message: string, properties?: LogProperties) {
    console.log(this.getMessage(message, properties));
  }

  warn(message: string, properties?: LogProperties) {
    console.warn(this.getMessage(message, properties));
  }

  error(message: string, err: Error, properties?: LogProperties) {
    console.warn(
      this.getMessage(message, {
        ...properties,
        errorMessage: err.message,
        errorStack: err.stack,
        error: err.name ?? err,
      })
    );
  }

  set(properties: LogProperties) {
    this.context = { ...this.context, ...properties };
  }

  create() {
    return new Logger();
  }
}

const server = new Logger();
server.set({ from: "server" });
export default server;
