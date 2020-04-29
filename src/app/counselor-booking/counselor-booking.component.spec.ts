import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounselorBookingComponent } from './counselor-booking.component';

describe('CounselorBookingComponent', () => {
  let component: CounselorBookingComponent;
  let fixture: ComponentFixture<CounselorBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounselorBookingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounselorBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
