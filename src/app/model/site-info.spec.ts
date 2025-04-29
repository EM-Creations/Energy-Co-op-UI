import {SiteInfo} from './site-info';

describe('SiteInfo', () => {
  it('should create an instance with valid properties', () => {
    const siteInfo = new SiteInfo(
      'Test Site',
      'This is a test description.',
      'https://www.example.com'
    );

    expect(siteInfo).toBeTruthy();
    expect(siteInfo.name).toBe('Test Site');
    expect(siteInfo.description).toBe('This is a test description.');
    expect(siteInfo.mapURL).toBe('https://www.example.com');
  });

  it('should handle empty strings as properties', () => {
    const siteInfo = new SiteInfo('', '', '');

    expect(siteInfo).toBeTruthy();
    expect(siteInfo.name).toBe('');
    expect(siteInfo.description).toBe('');
    expect(siteInfo.mapURL).toBe('');
  });

  it('should handle null values gracefully', () => {
    const siteInfo = new SiteInfo(null as unknown as string, null as unknown as string, null as unknown as string);

    expect(siteInfo).toBeTruthy();
    expect(siteInfo.name).toBeNull();
    expect(siteInfo.description).toBeNull();
    expect(siteInfo.mapURL).toBeNull();
  });
});
