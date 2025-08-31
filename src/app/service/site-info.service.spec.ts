import {SiteInfoService} from './site-info.service';
import {SiteInfo} from '../model/site-info';

describe('SiteInfoService', () => {
  let service: SiteInfoService;

  beforeEach(() => {
    service = new SiteInfoService();
  });

  it('should return correct SiteInfo for Graig Fatha', () => {
    const info = service.getSiteInfoFromName('Graig Fatha');
    expect(info).toBeInstanceOf(SiteInfo);
    expect(info.name).toBe('Graig Fatha');
    expect(info.description).toContain('Graig Fatha Wind Turbine');
    expect(info.mapURL).toContain('Graig+Fatha+Wind+Farm');
  });

  it('should return correct SiteInfo for Kirk Hill', () => {
    const info = service.getSiteInfoFromName('Kirk Hill');
    expect(info).toBeInstanceOf(SiteInfo);
    expect(info.name).toBe('Kirk Hill');
    expect(info.description).toContain('Kirk Hill Wind Farm');
    expect(info.mapURL).toContain('Kirk+Hill+Windfarm');
  });

  it('should return correct SiteInfo for Derril Water', () => {
    const info = service.getSiteInfoFromName('Derril Water');
    expect(info).toBeInstanceOf(SiteInfo);
    expect(info.name).toBe('Derril Water');
    expect(info.description).toContain('Derril Water solar park');
    expect(info.mapURL).toContain('Derrill+Water');
  });

  it('should return default SiteInfo for unknown site', () => {
    const info = service.getSiteInfoFromName('Unknown');
    expect(info).toBeInstanceOf(SiteInfo);
    expect(info.name).toBe('Unknown Site');
    expect(info.description).toBe('No description available.');
    expect(info.mapURL).toBe('https://www.google.com/maps');
  });

  it('should return default SiteInfo for null', () => {
    const info = service.getSiteInfoFromName(null);
    expect(info).toBeInstanceOf(SiteInfo);
    expect(info.name).toBe('Unknown Site');
    expect(info.description).toBe('No description available.');
    expect(info.mapURL).toBe('https://www.google.com/maps');
  });
});

