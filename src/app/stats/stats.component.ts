import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {SiteInfoService} from '../service/site-info.service';
import {SiteInfo} from '../model/site-info';
import {UserService} from '../service/user.service';
import {AuthService} from '@auth0/auth0-angular';
import {AsyncPipe, CurrencyPipe, DecimalPipe} from '@angular/common';
import {MemberService} from '../service/member.service';
import {BaseChartDirective} from 'ng2-charts';
import {ChartConfiguration} from 'chart.js';

@Component({
  selector: 'app-stats',
  imports: [MatIconModule, AsyncPipe, BaseChartDirective, CurrencyPipe, DecimalPipe],
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
  protected savingsLast30Days = 0;
  protected ownership = 0;
  private barChartLegendEnabled = true;

  protected barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [ '1', '2', '3', '4', '5' ],
    datasets: [
      { data: [ 1, 2, 3, 4, 5 ], label: 'Loading savings..' }
    ]
  };

  protected barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          autoSkip: false
        }
      },
      y: {
        ticks: {
          // Include a currency symbol in the ticks
          callback: (value) => {
            return '£' + value;
          }
        }
      }
    },
    plugins: {
      legend: {
        display: this.barChartLegendEnabled,
        position: 'top'
      }
    }
  };

  ngOnInit(): void {
    this.siteName = this.route.snapshot.paramMap.get('site');
    this.siteInfo = this.siteInfoService.getSiteInfoFromName(this.siteName);
    this.setOwnershipForSite();

    this.memberService.getTodaySavings(this.siteInfo).subscribe((data => {
      this.savingsToday = data.amount;
    }))

    const thirtyOneDaysAgo = new Date();
    thirtyOneDaysAgo.setDate(thirtyOneDaysAgo.getDate() - 31);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    this.memberService.getHistoricalSavings(this.siteInfo, thirtyOneDaysAgo, yesterday).subscribe((data => {
      const sortedData = Array.from(data).sort((a, b) => new Date(a.to).getTime() - new Date(b.to).getTime());
      console.log('Historical savings data:', sortedData);

      const barChartLabels: string[] = [];
      const barChartDataValues: number[] = [];

      let total = 0;
      for (const saving of sortedData) {
        total += saving.amount;

        const toDate = new Date(saving.to);

        barChartLabels.push(toDate.toDateString());
        barChartDataValues.push(saving.amount);
      }

      this.savingsLast30Days = total;

      this.barChartData = {
        labels: barChartLabels,
        datasets: [
          { data: barChartDataValues, label: 'Savings' }
        ]
      };
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
