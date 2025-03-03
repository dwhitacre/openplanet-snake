import Route from "./route";
import type ApiRequest from "../domain/apirequest";
import ApiResponse from "../domain/apiresponse";

class Me extends Route {
  async handle(req: ApiRequest): Promise<ApiResponse> {
    if (!req.checkMethod("get")) return ApiResponse.badRequest(req);

    const me = await req.me();
    return ApiResponse.ok(req, { me: me?.toJson() });
  }
}

export default new Me();
