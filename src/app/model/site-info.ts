export class SiteInfo {
  name: string;
  description: string;
  mapURL: string;
  statsURL: string;

  constructor(name: string, description: string, mapURL: string, statsURL: string) {
    this.name = name;
    this.description = description;
    this.mapURL = mapURL;
    this.statsURL = statsURL;
  }
}
