import type ApiRequest from "../domain/apirequest";
import ApiResponse from "../domain/apiresponse";

export class Route {
  static async defaultHandle(req: ApiRequest): Promise<ApiResponse> {
    req.logger.warn("Fellback to default handler.");
    return ApiResponse.notFound(req);
  }
  static async errorHandle(req: ApiRequest): Promise<ApiResponse> {
    req.logger.error(
      "Unhandled error",
      req.error ?? new Error("No error, but in unhandled?")
    );
    return ApiResponse.serverError(req);
  }

  async handle(req: ApiRequest): Promise<ApiResponse> {
    return Route.defaultHandle(req);
  }
}

export default Route;
