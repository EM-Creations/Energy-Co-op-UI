import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './header/header/header.component';
import {LeftNavComponent} from './left-nav/left-nav/left-nav.component';
import {VERSION} from '../environments/version';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, LeftNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  versionString = VERSION.version + (VERSION.tag ? ' [' + VERSION.tag + ']' : '') + (VERSION.hash ? ' #' + VERSION.hash : '');
}
