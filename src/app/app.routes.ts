import {Routes} from '@angular/router';
import {ProjectsComponent} from './projects/projects/projects.component';
import {HomeComponent} from './home/home/home.component';
import {StatsComponent} from './stats/stats.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'stats/:site', component: StatsComponent },
];
