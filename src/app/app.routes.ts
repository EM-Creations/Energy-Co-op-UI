import {Routes} from '@angular/router';
import {ProjectsComponent} from './projects/projects/projects.component';
import {HomeComponent} from './home/home/home.component';
import {StatsComponent} from './stats/stats.component';
import {authGuardFn} from '@auth0/auth0-angular';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent, canActivate: [authGuardFn] },
  { path: 'stats/:site', component: StatsComponent, canActivate: [authGuardFn] },
];
