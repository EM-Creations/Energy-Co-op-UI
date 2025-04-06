import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LeftNavComponent} from './left-nav.component';
import {provideRouter} from '@angular/router';

describe('LeftNavComponent', () => {
  let component: LeftNavComponent;
  let fixture: ComponentFixture<LeftNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeftNavComponent],
      providers: [provideRouter([])]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeftNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
