import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSortModule, Sort} from '@angular/material/sort';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {SiteInfoService} from '../../service/site-info.service';
import {AlertsService} from '../../service/alerts.service';
import {firstValueFrom} from 'rxjs';

interface Alert {
  createdAt: string;
  site: string;
  message: string;
}

@Component({
  selector: 'app-director-alerts',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
  ],
  templateUrl: './director-alerts.component.html',
  styleUrl: './director-alerts.component.scss'
})
export class DirectorAlertsComponent implements OnInit {
  private siteInfoService = inject(SiteInfoService);
  private alertsService = inject(AlertsService);

  protected sites: string[] = [];
  alertsBySite: Record<string, MatTableDataSource<Alert>> = {};
  displayedColumns: string[] = ['createdAt', 'message'];
  isLoading = true;

  ngOnInit(): void {
    this.loadSites();
  }

  private loadSites(): void {
    this.siteInfoService.getOwnedSites().subscribe({
      next: async (sites: string[]) => {
        this.sites = sites;
        await this.loadAlertsForOwnedSites();
      },
      error: (error) => {
        console.error('Error loading sites:', error);
        this.isLoading = false;
      }
    });
  }

  private async loadAlertsForOwnedSites(): Promise<void> {
    try {
      for (const site of this.sites) {
        const alerts = await firstValueFrom(this.alertsService.getAlerts(site));
        this.alertsBySite[site] = new MatTableDataSource(alerts);
        this.alertsBySite[site].sortingDataAccessor = (item: Alert, property: string) => {
          switch (property) {
            case 'createdAt':
              return new Date(item.createdAt).getTime();
            default:
              return item[property as keyof Alert];
          }
        };
      }
    } catch (error) {
      console.error('Error loading alerts:', error);
    } finally {
      this.isLoading = false;
    }
  }

  applyFilter(event: Event, site: string): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.alertsBySite[site].filter = filterValue.trim().toLowerCase();
  }

  sortData(sort: Sort, site: string): void {
    const data = this.alertsBySite[site].data.slice();
    if (!sort.active || sort.direction === '') {
      this.alertsBySite[site].data = data;
      return;
    }

    this.alertsBySite[site].data = data.sort((a, b) => {
      const isAsc = 'asc' === sort.direction;
      switch (sort.active) {
        case 'createdAt':
          return compare(new Date(a.createdAt).getTime(), new Date(b.createdAt).getTime(), isAsc);
        case 'message':
          return compare(a.message, b.message, isAsc);
        default:
          return 0;
      }
    });
  }
}

function compare(a: number | string, b: number | string, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
