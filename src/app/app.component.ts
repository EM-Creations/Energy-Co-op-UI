import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {HeaderComponent} from './header/header/header.component';
import {LeftNavComponent} from './left-nav/left-nav/left-nav.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, LeftNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Energy Co-op UI';
}
