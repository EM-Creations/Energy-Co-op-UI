import {Routes} from '@angular/router';
import {HomeComponent} from './home/home/home.component';
import {StatsComponent} from './stats/stats.component';
import {authGuardFn} from '@auth0/auth0-angular';
import {ProfileComponent} from './profile/profile.component';
import {AdminHomeComponent} from './admin/admin-home/admin-home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuardFn] },
  // Re-enable the projects page once developed if it has a use.
  // { path: 'projects', component: ProjectsComponent, canActivate: [authGuardFn] },
  { path: 'stats/:site', component: StatsComponent, canActivate: [authGuardFn] },
  { path: 'admin', component: AdminHomeComponent, canActivate: [authGuardFn] },
];
