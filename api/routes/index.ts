import type ApiRequest from "../domain/apirequest";
import ApiResponse from "../domain/apiresponse";
import config from "./config";
import me from "./me";
import players from "./players";
import ready from "./ready";
import Route from "./route";

async function handle(req: ApiRequest): Promise<ApiResponse> {
  let response: ApiResponse;
  try {
    if (req.url.pathname === "/ready") response = await ready.handle(req);
    else if (req.url.pathname === "/me") response = await me.handle(req);
    else if (req.url.pathname === "/players")
      response = await players.handle(req);
    else if (req.url.pathname === "/config")
      response = await config.handle(req);
    else response = await Route.defaultHandle(req);
  } catch (error) {
    req.error = error as Error;
    response = await Route.errorHandle(req);
  }
  return response;
}

export default handle;
