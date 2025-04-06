import {Routes} from '@angular/router';
import {ProjectsComponent} from './projects/projects/projects.component';
import {HomeComponent} from './home/home/home.component';

export const routes: Routes = [{ path: '', component: HomeComponent },
  { path: 'projects', component: ProjectsComponent },];
