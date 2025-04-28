import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-stats',
  imports: [],
  templateUrl: './stats.component.html',
  styleUrl: './stats.component.scss'
})
export class StatsComponent implements OnInit {
  protected siteName: string | null = "";

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.siteName = this.route.snapshot.paramMap.get('site');
  }
}
