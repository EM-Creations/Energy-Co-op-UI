import {inject, Injectable} from '@angular/core';
import {SiteInfo} from '../model/site-info';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {switchMap} from 'rxjs/operators';
import {UserService} from './user.service';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteInfoService {
  http = inject(HttpClient);
  userService = inject(UserService);

  private readonly baseURL: string;

  constructor() {
    this.baseURL = environment.api.baseURL;
  }

  getSiteInfoFromName(siteName: string | null | undefined): SiteInfo {
    let siteInfo: SiteInfo;

    switch (siteName) {
      case "GRAIG_FATHA":
      case "Graig Fatha":
        siteInfo = new SiteInfo(
          "Graig Fatha",
          "Graig Fatha Wind Turbine, based in Wales, UK.",
          "https://www.google.com/maps/place/Graig+Fatha+Wind+Farm/@51.5620376,-3.4539043,624m/data=!3m2!1e3!4b1!4m6!3m5!1s0x486e15df2d34d83b:0xac0a5bf10333b675!8m2!3d51.5620343!4d-3.4513294!16s%2Fg%2F11jdzd9bl3?entry=ttu&g_ep=EgoyMDI1MDQwMi4xIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D",
          "https://dashboard.windcoop.co.uk/"
        );
        break;

      case "KIRK_HILL":
      case "Kirk Hill":
        siteInfo = new SiteInfo(
          "Kirk Hill",
          "Kirk Hill Wind Farm, based in Scotland, UK.",
          "https://www.google.com/maps/place/Kirk+Hill+Windfarm/@55.3074996,-4.7395864,546m/data=!3m2!1e3!4b1!4m6!3m5!1s0x4862712bb5eb99b7:0xea9eb190c1b8758c!8m2!3d55.3074996!4d-4.7370115!16s%2Fg%2F11t4m6g41k?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D",
          "http://localhost:4200/"
        );
        break;

      case "DERRIL_WATER":
      case "Derril Water":
        siteInfo = new SiteInfo(
          "Derril Water",
          "Derril Water solar park, based in England, UK.",
          "https://www.google.com/maps/place/Derrill+Water/@50.7879156,-4.4262718,6860m/data=!3m1!1e3!4m6!3m5!1s0x486c7024c16bcc47:0xa4d5fafe9a1db52b!8m2!3d50.789696!4d-4.4106362!16s%2Fg%2F11bw7rntsb?entry=ttu&g_ep=EgoyMDI1MDQyMy4wIKXMDSoJLDEwMjExNDUzSAFQAw%3D%3D",
          "http://localhost:4200/"
        );
        break;

      default:
        siteInfo = new SiteInfo("Unknown Site", "No description available.", "https://www.google.com/maps", "http://localhost:4200/");
    }

    return siteInfo;
  }

  getSuppportedSites(): Observable<string[]> {
    return this.userService.getAccessTokenSilently$().pipe(
      switchMap(token => {
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`
        });
        return this.http.get<string[]>(`${this.baseURL}/info/sites`, {headers});
      })
    );
  }

}
