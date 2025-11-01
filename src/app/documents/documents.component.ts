import {Component, inject, OnInit} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {SiteInfoService} from '../service/site-info.service';
import {MemberService} from '../service/member.service';

@Component({
  selector: 'app-documents',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatSelectModule,
    MatButtonModule,
    MatFormFieldModule
  ],
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss',
})
export class DocumentsComponent implements OnInit {
  siteInfoService = inject(SiteInfoService);
  memberService = inject(MemberService);
  siteNames: string[] = [];
  selectedSite?: string;
  taxYears: string[] = [];
  selectedTaxYear?: string;

  ngOnInit(): void {
    this.generateTaxYears();

    this.siteInfoService.getSuppportedSites().subscribe(
      (siteNames: string[]) => {
        this.siteNames = siteNames;
      },
      (error: any) => {
        console.error('Error loading sites:', error);
      }
    );
  }

  private generateTaxYears(): void {
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth(); // 0-based
    const currentDay = currentDate.getDate();

    // If we're past April 5th of the current year, include it
    if (currentMonth > 3 || (currentMonth === 3 && currentDay > 5)) {
      this.taxYears.push(`${currentYear - 1}-${currentYear}`);
    }

    let previousYear = currentYear - 1;

    // Add previous tax years going back to the 2022->2023 tax year
    while (2023 <= previousYear) {
      previousYear--;
      this.taxYears.push(`${previousYear}-${previousYear + 1}`);
    }
  }

  generateDocument(): void {
    if (!this.selectedSite || !this.selectedTaxYear) {
      return;
    }

    const [startYear, endYear] = this.selectedTaxYear.split('-');
    const startDate = new Date(`${startYear}-04-06`);
    const endDate = new Date(`${endYear}-04-05`);
    const fileName = `tax-document-${this.selectedTaxYear}.pdf`;

    const site = this.siteInfoService.getSiteInfoFromName(this.selectedSite);

    console.log("Sending request with:", site, startDate, endDate, fileName);

    this.memberService.generateTaxDocument(site, startDate, endDate).subscribe((response: Blob) => {
      const downloadURL = window.URL.createObjectURL(response);
      const link = document.createElement('a');
      link.href = downloadURL;
      link.download = fileName;
      link.click();
    });
  }
}
