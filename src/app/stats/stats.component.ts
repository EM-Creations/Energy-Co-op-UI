import {Component, inject, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {SiteInfoService} from '../service/site-info.service';
import {SiteInfo} from '../model/site-info';
import {SiteDataService} from '../service/site-data.service';
import {GraigFathaSiteDataService} from '../service/impl/graig-fatha-site-data.service';
import {VensysEnergyYield} from '../model/VensysEnergyYield';

@Component({
  selector: 'app-stats',
  imports: [MatIconModule],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent implements OnInit {
  protected siteName: string | null = "";
  protected siteInfo?: SiteInfo;
  protected todayGenerationWatts = 0;

  private siteInfoService = inject(SiteInfoService);
  protected siteDataService : SiteDataService = inject(GraigFathaSiteDataService);

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.siteName = this.route.snapshot.paramMap.get('site');
    this.siteInfo = this.siteInfoService.getSiteInfoFromName(this.siteName);

    this.siteDataService.getTodayGenerationWatts().subscribe(response => {
      console.log("--------- RESPONSE ---------", response);

      const energyYieldObj: VensysEnergyYield = response.data as VensysEnergyYield;

       this.todayGenerationWatts = energyYieldObj.value;
    });
  }
}
