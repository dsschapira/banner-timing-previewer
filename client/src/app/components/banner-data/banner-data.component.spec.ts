import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BannerDataComponent } from './banner-data.component';

describe('BannerDataComponent', () => {
  let component: BannerDataComponent;
  let fixture: ComponentFixture<BannerDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BannerDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BannerDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
