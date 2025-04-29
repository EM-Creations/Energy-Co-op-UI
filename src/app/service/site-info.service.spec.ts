import {TestBed} from '@angular/core/testing';
import {SiteInfoService} from './site-info.service';
import {GraigFathaSiteDataService} from './impl/graig-fatha-site-data.service';

describe('SiteInfoService', () => {
  let service: SiteInfoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SiteInfoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return correct SiteInfo for "Graig Fatha"', () => {
    const siteInfo = service.getSiteInfoFromName('Graig Fatha');
    expect(siteInfo.name).toBe('Graig Fatha');
    expect(siteInfo.description).toBe('Graig Fatha Wind Turbine, based in Wales, UK.');
    expect(siteInfo.mapURL).toContain('Graig+Fatha+Wind+Farm');
  });

  it('should return correct SiteInfo for "Kirk Hill"', () => {
    const siteInfo = service.getSiteInfoFromName('Kirk Hill');
    expect(siteInfo.name).toBe('Kirk Hill');
    expect(siteInfo.description).toBe('Kirk Hill Wind Farm, based in Scotland, UK.');
    expect(siteInfo.mapURL).toContain('Kirk+Hill+Windfarm');
  });

  it('should return correct SiteInfo for "Derril Water"', () => {
    const siteInfo = service.getSiteInfoFromName('Derril Water');
    expect(siteInfo.name).toBe('Derril Water');
    expect(siteInfo.description).toBe('Derril Water solar park, based in England, UK.');
    expect(siteInfo.mapURL).toContain('Derrill+Water');
  });

  it('should return default SiteInfo for unknown site name', () => {
    const siteInfo = service.getSiteInfoFromName('Unknown Site Name');
    expect(siteInfo.name).toBe('Unknown Site');
    expect(siteInfo.description).toBe('No description available.');
    expect(siteInfo.mapURL).toBe('https://www.google.com/maps');
  });

  it('should return default SiteInfo for null site name', () => {
    const siteInfo = service.getSiteInfoFromName(null);
    expect(siteInfo.name).toBe('Unknown Site');
    expect(siteInfo.description).toBe('No description available.');
    expect(siteInfo.mapURL).toBe('https://www.google.com/maps');
  });

  it('should return GraigFathaSiteDataService for "Graig Fatha" site', () => {
    const siteInfo = service.getSiteInfoFromName('Graig Fatha');
    const dataService = service.getDataService(siteInfo);
    expect(dataService).toBeInstanceOf(GraigFathaSiteDataService);
  });

  it('should return GraigFathaSiteDataService for a non "Graig Fatha" site', () => {
    const siteInfo = service.getSiteInfoFromName('Kirk Hill');
    const dataService = service.getDataService(siteInfo);
    expect(dataService).toBeInstanceOf(GraigFathaSiteDataService);
  });
});
