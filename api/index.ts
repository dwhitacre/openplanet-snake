import services from "./services";
import ApiRequest from "./domain/apirequest";
import handle from "./routes";

const server = Bun.serve({
  port: 8081,
  hostname: process.env.HOST ?? "localhost",
  async fetch(req) {
    const request = new ApiRequest(req, services);
    const response = await handle(request);
    return response.complete();
  },
});

process.on("SIGINT", async () => {
  services.logger.warn("Shutting down");
  await services.db.close();
  services.logger.info("Successful shutdown");
});

services.logger.info("Server started", {
  hostname: server.hostname,
  port: server.port,
});
