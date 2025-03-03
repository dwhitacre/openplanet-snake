import Json from "./json";

export class Permissions {
  static View = "view";
  static PlayerManage = "player:manage";
  static ZoneManage = "gamemode:manage";
  static MapManage = "leaderboard:manage";
  static ApiKeyManage = "apikey:manage";
  static Admin = "admin";

  static #list: Array<string>;
  static list() {
    if (this.#list) return this.#list;
    return (this.#list = Object.values(this));
  }

  static has(permission: string) {
    return this.list().includes(permission);
  }
}

export class Player {
  accountId: string;
  name: string;
  color: string;
  displayName: string = "";
  dateModified?: Date;
  permissions: Array<Permissions> = [Permissions.View];

  static fromJson(json: { [_: string]: any }): Player {
    json = Json.lowercaseKeys(json);

    if (!json?.accountid) throw new Error("Failed to get accountId");
    if (!json.name) throw new Error("Failed to get name");
    if (!json.color) throw new Error("Failed to get color");

    const player = new Player(json.accountid, json.name, json.color);
    if (json.datemodified) player.dateModified = json.datemodified;
    if (json.displayname) player.displayName = json.displayname;

    return player;
  }

  constructor(accountId: string, name: string, color: string) {
    this.accountId = accountId;
    this.name = name;
    this.color = color;
  }

  toJson() {
    return {
      accountId: this.accountId,
      name: this.name,
      color: this.color,
      displayName: this.displayName,
      dateModified: this.dateModified,
      permissions: this.permissions,
    };
  }

  hydratePermissions(permissions: Array<string> = []): Player {
    this.permissions = [
      ...this.permissions,
      ...permissions.filter((p) => Permissions.has(p)),
    ];
    return this;
  }

  hasPermission(permission: string): boolean {
    return this.permissions.includes(permission);
  }
}

export default Player;
