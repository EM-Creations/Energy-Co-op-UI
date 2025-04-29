import {Injectable} from '@angular/core';
import {SiteInfo} from '../model/site-info';

@Injectable({
  providedIn: 'root'
})
export class SiteInfoService {
  getSiteInfoFromName(siteName: string | null): SiteInfo {
    let siteInfo: SiteInfo;

    switch (siteName) {
      case "Graig Fatha":
        siteInfo = new SiteInfo(
          siteName,
          "Graig Fatha Wind Turbine, based in Wales, UK.",
          "https://www.google.com/maps/place/Graig+Fatha+Wind+Farm/@51.5620376,-3.4539043,624m/data=!3m2!1e3!4b1!4m6!3m5!1s0x486e15df2d34d83b:0xac0a5bf10333b675!8m2!3d51.5620343!4d-3.4513294!16s%2Fg%2F11jdzd9bl3?entry=ttu&g_ep=EgoyMDI1MDQwMi4xIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D"
        );
        break;

      case "Kirk Hill":
        siteInfo = new SiteInfo(
          siteName,
          "Kirk Hill Wind Farm, based in Scotland, UK.",
          "https://www.google.com/maps/place/Kirk+Hill+Windfarm/@55.3074996,-4.7395864,546m/data=!3m2!1e3!4b1!4m6!3m5!1s0x4862712bb5eb99b7:0xea9eb190c1b8758c!8m2!3d55.3074996!4d-4.7370115!16s%2Fg%2F11t4m6g41k?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D"
        );
        break;

      case "Derril Water":
        siteInfo = new SiteInfo(
          siteName,
          "Derril Water solar park, based in England, UK.",
          "https://www.google.com/maps/place/Derrill+Water/@50.7879156,-4.4262718,6860m/data=!3m1!1e3!4m6!3m5!1s0x486c7024c16bcc47:0xa4d5fafe9a1db52b!8m2!3d50.789696!4d-4.4106362!16s%2Fg%2F11bw7rntsb?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D"
        );
        break;

      default:
        siteInfo = new SiteInfo("Unknown Site", "No description available.", "https://www.google.com/maps");
    }

    return siteInfo;
  }
}
