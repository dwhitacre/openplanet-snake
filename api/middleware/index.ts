import type ApiRequest from "../domain/apirequest";
import type ApiResponse from "../domain/apiresponse";

export class Middleware {
  async applyRequest(_: ApiRequest): Promise<ApiRequest | void> {}
  async applyResponse(_: ApiResponse): Promise<ApiResponse | void> {}
}

const middleware: { [_: string]: Middleware } = {};
export default middleware;
