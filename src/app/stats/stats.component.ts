import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {SiteInfoService} from '../service/site-info.service';
import {SiteInfo} from '../model/site-info';
import {UserService} from '../service/user.service';
import {AuthService} from '@auth0/auth0-angular';
import {AsyncPipe} from '@angular/common';
import {MemberService} from '../service/member.service';

@Component({
  selector: 'app-stats',
  imports: [MatIconModule, AsyncPipe],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private siteInfoService = inject(SiteInfoService);
  auth = inject(AuthService);
  userService = inject(UserService);
  memberService = inject(MemberService);

  protected siteName: string | null = "";
  protected siteInfo?: SiteInfo;

  protected savingsToday = 0;
  protected ownership = 0;

  ngOnInit(): void {
    this.siteName = this.route.snapshot.paramMap.get('site');
    this.siteInfo = this.siteInfoService.getSiteInfoFromName(this.siteName);
    this.setOwnershipForSite();

    this.memberService.getTodaySavings(this.siteInfo).subscribe((data => {
      this.savingsToday = data.amount;
    }))
  }

  setOwnershipForSite(): void {
    if (this.auth.isAuthenticated$) {
      this.auth.user$.subscribe(user => {
        console.log('Setting ownership for site:', this.siteName, 'User:', user);
        if (user) {
          switch (this.siteName) {
            case 'Graig Fatha':
              this.ownership = user['ownerships']['gf-wattage'];
              break;
            case 'Kirk Hill':
              this.ownership = user['ownerships']['kh-wattage'];
              break;
            case 'Derril Water':
              this.ownership = user['ownerships']['dw-wattage'];
              break;
            default:
              this.ownership = 0;
          }
        }
      });
    }
  }
}
