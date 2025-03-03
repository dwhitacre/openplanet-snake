import Json from "./json";

export class Leaderboard {
  id: string;
  name: string;
  dateModified?: Date;

  static fromJson(json: { [_: string]: any }): Leaderboard {
    json = Json.lowercaseKeys(json);

    if (!json.id) throw new Error("Failed to get id");
    if (!json.name) throw new Error("Failed to get name");

    const gamemode = new Leaderboard(json.id, json.name);
    if (json.datemodified) gamemode.dateModified = json.datemodified;

    return gamemode;
  }

  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      dateModified: this.dateModified,
    };
  }
}

export default Leaderboard;
