import Route from "./route";
import type ApiRequest from "../domain/apirequest";
import ApiResponse from "../domain/apiresponse";
import Player, { Permissions } from "../domain/player";

class Players extends Route {
  async handle(req: ApiRequest): Promise<ApiResponse> {
    if (!req.checkMethod(["get", "post"])) return ApiResponse.badRequest(req);
    if (req.checkMethod("get")) return this.handleGet(req);
    return this.handlePost(req);
  }

  async handleGet(req: ApiRequest): Promise<ApiResponse> {
    if (!req.checkMethod("get")) return ApiResponse.badRequest(req);

    const accountId = req.getQueryParam("accountId");
    if (accountId) {
      const player = await req.services.players.get(accountId);
      if (!player) return ApiResponse.badRequest(req);

      return ApiResponse.ok(req, { player: player.toJson() });
    }

    const players = await req.services.players.getAll();
    if (!players) return ApiResponse.badRequest(req);

    return ApiResponse.ok(req, { players: players.map((p) => p.toJson()) });
  }

  async handlePost(req: ApiRequest): Promise<ApiResponse> {
    if (!req.checkMethod("post")) return ApiResponse.badRequest(req);
    if (
      !(await req.checkPermission([
        Permissions.Admin,
        Permissions.PlayerManage,
      ]))
    )
      return ApiResponse.unauthorized(req);

    const player = await req.parse(Player);
    if (!player) return ApiResponse.badRequest(req);

    await req.services.players.upsert(player);
    return ApiResponse.ok(req, { player });
  }
}

export default new Players();
