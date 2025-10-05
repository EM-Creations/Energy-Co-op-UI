import {Component, inject, OnInit} from '@angular/core';
import {SiteInfoService} from '../../service/site-info.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {CommonModule} from '@angular/common';
import {AdminService} from '../../service/admin.service';
import moment from 'moment/moment';
import {SavingsRateUpdate} from '../../model/SavingsRateUpdate';

@Component({
  selector: 'app-admin-home',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './admin-home.component.html',
  styleUrl: './admin-home.component.scss'
})
export class AdminHomeComponent implements OnInit {
  private siteInfoService = inject(SiteInfoService);
  private adminService = inject(AdminService);
  private fb = inject(FormBuilder);

  protected sites: string[] = [];
  protected savingsRateForm: FormGroup;

  constructor() {
    this.savingsRateForm = this.fb.group({
      site: ['', Validators.required],
      effectiveDate: ['', Validators.required],
      savingsRate: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.siteInfoService.getSuppportedSites().subscribe(sites => {
      this.sites = sites;
    });
  }

  onSubmit() {
    if (this.savingsRateForm.valid) {
      const formValue = this.savingsRateForm.value;
      const payload : SavingsRateUpdate = {
        site: formValue.site,
        effectiveDate: moment(formValue.effectiveDate).format('YYYY-MM-DD'),
        ratePerKWH: formValue.savingsRate
      };

      this.adminService.setSavingsRate(payload).subscribe({
        next: () => {
          alert('Savings rate updated successfully');
          this.savingsRateForm.reset();
        },
        error: (error) => {
          console.error('Error updating savings rate:', error);
          alert('Error updating savings rate. Please try again.');
        }
      });
    }
  }
}
