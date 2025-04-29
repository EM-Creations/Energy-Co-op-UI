export class SiteInfo {
  name: string;
  description: string;
  mapURL: string;

  constructor(name: string, description: string, mapURL: string) {
    this.name = name;
    this.description = description;
    this.mapURL = mapURL;
  }
}
