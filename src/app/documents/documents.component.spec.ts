import {ComponentFixture, TestBed} from '@angular/core/testing';
import {DocumentsComponent} from './documents.component';
import {SiteInfoService} from '../service/site-info.service';
import {MemberService} from '../service/member.service';
import {SiteInfo} from '../model/site-info';
import {of} from 'rxjs';
import {FormsModule} from '@angular/forms';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';

describe('DocumentsComponent', () => {
  let component: DocumentsComponent;
  let fixture: ComponentFixture<DocumentsComponent>;
  let siteInfoService: Partial<SiteInfoService>;
  let memberService: Partial<MemberService>;

  const mockSiteName = 'Graig Fatha';
  const mockSiteNames = [mockSiteName];
  const mockSiteInfo = new SiteInfo(mockSiteName, 'Test Site', '', '');

  beforeEach(async () => {
    siteInfoService = {
      getOwnedSites: jest.fn().mockReturnValue(of(mockSiteNames)),
      getSiteInfoFromName: jest.fn().mockReturnValue(mockSiteInfo)
    };

    memberService = {
      generateTaxDocument: jest.fn().mockReturnValue(of(new Blob()))
    };

    await TestBed.configureTestingModule({
      imports: [
        DocumentsComponent,
        FormsModule,
        MatSelectModule,
        MatButtonModule,
        MatFormFieldModule
      ],
      providers: [
        { provide: SiteInfoService, useValue: siteInfoService },
        { provide: MemberService, useValue: memberService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(DocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Site Loading', () => {
    it('should load sites on init', () => {
      expect(siteInfoService.getOwnedSites).toHaveBeenCalled();
      expect(component.siteNames).toEqual(mockSiteNames);
    });
  });

  describe('Tax Year Generation', () => {
    beforeEach(() => {
      // Reset tax years before each test
      component.taxYears = [];
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should include current tax year when after April 5th', () => {
      jest.useFakeTimers().setSystemTime(new Date('2025-11-01'));
      component.ngOnInit();
      expect(component.taxYears).toContain('2024-2025');
      expect(component.taxYears[0]).toBe('2024-2025');
    });

    it('should not include next tax year when before April 5th', () => {
      jest.useFakeTimers().setSystemTime(new Date('2025-04-05'));
      component.ngOnInit();
      expect(component.taxYears[0]).toBe('2023-2024');
    });

    it('should include current tax year on April 6th', () => {
      jest.useFakeTimers().setSystemTime(new Date('2025-04-06'));
      component.ngOnInit();
      expect(component.taxYears[0]).toBe('2024-2025');
    });

    it('should generate tax years back to 2022', () => {
      jest.useFakeTimers().setSystemTime(new Date('2025-11-01'));
      component.ngOnInit();
      expect(component.taxYears).toEqual([
        '2024-2025',
        '2023-2024',
        '2022-2023'
      ]);
    });
  });

  describe('Document Generation', () => {
    it('should not generate document if site or tax year not selected', () => {
      // Test with neither selected
      component.generateDocument();
      expect(memberService.generateTaxDocument).not.toHaveBeenCalled();

      // Test with only site selected
      component.selectedSite = mockSiteName;
      component.generateDocument();
      expect(memberService.generateTaxDocument).not.toHaveBeenCalled();

      // Test with only tax year selected
      component.selectedSite = undefined;
      component.selectedTaxYear = '2024-2025';
      component.generateDocument();
      expect(memberService.generateTaxDocument).not.toHaveBeenCalled();
    });

    it('should generate document with correct parameters', () => {
      component.selectedSite = mockSiteName;
      component.selectedTaxYear = '2024-2025';

      const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

      component.generateDocument();

      expect(siteInfoService.getSiteInfoFromName).toHaveBeenCalledWith(mockSiteName);
      expect(memberService.generateTaxDocument).toHaveBeenCalledWith(
        mockSiteInfo,
        new Date('2024-04-06'),
        new Date('2025-04-05')
      );
      expect(consoleSpy).toHaveBeenCalledWith(
        "Sending request with:",
        mockSiteInfo,
        new Date('2024-04-06'),
        new Date('2025-04-05'),
        'tax-document-2024-2025.pdf'
      );

      consoleSpy.mockRestore();
    });
  });
});
