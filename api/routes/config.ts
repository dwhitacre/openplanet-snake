import Route from "./route";
import type ApiRequest from "../domain/apirequest";
import ApiResponse from "../domain/apiresponse";

class Config extends Route {
  async handle(req: ApiRequest): Promise<ApiResponse> {
    const config = {
      healthCheckEnabled: true,
      healthCheckMs: 300000,
    };
    return ApiResponse.ok(req, { config });
  }
}

export default new Config();
