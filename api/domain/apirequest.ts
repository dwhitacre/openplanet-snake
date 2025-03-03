import type { Services } from "../services";
import type Player from "./player";

export type ApiMethods = "get" | "post" | "delete";

type Cache = {
  url?: URL;
  me?: Player;
};

export class ApiRequest {
  raw: Request;
  services: Services;
  logger: Services["logger"];
  start: DOMHighResTimeStamp;
  error?: Error;

  #cache: Cache = {};

  constructor(req: Request, services: Services) {
    this.start = performance.now();
    this.raw = req;
    this.services = services;
    this.logger = this.services.logger.create();
    this.logger.set({
      from: "request",
      start: this.start,
      pathname: this.url.pathname,
      source: this.getQueryParam("source"),
    });
  }

  get url(): URL {
    return this.#cache.url ?? (this.#cache.url = new URL(this.raw.url));
  }

  get method(): ApiMethods {
    return this.raw.method.toLowerCase() as ApiMethods;
  }

  getQueryParam(param: string): string | undefined {
    if (!this.url.searchParams.has(param)) return undefined;
    return this.url.searchParams.get(param) ?? undefined;
  }

  checkMethod(allowed: Array<ApiMethods> | ApiMethods = []): boolean {
    if (!(allowed instanceof Array)) allowed = [allowed];
    return allowed.includes(this.method);
  }

  async checkPermission(permission: Array<string> | string): Promise<boolean> {
    if (!(permission instanceof Array)) permission = [permission];

    const me = await this.me();
    if (!me) return false;

    return permission.some((p) => me.hasPermission(p));
  }

  async parse<
    T extends {
      new (...args: Array<any>): any;
      fromJson: (json: { [_: string]: any }) => InstanceType<T>;
    }
  >(domain: T): Promise<InstanceType<T> | undefined> {
    if (typeof domain.fromJson !== "function") return undefined;

    let json;
    try {
      json = await this.raw.json();
      return domain.fromJson(json);
    } catch (error) {
      this.logger.warn("Failed to parse domain", { json, error });
      return undefined;
    }
  }

  async me(): Promise<Player | undefined> {
    if (this.#cache.me) return this.#cache.me;

    const player = await this.services.players.getByApiKey(
      this.raw.headers.get("x-api-key") || this.getQueryParam("api-key")
    );
    return (this.#cache.me = player);
  }
}

export default ApiRequest;
