import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CounselorPersonalDetailsComponent } from './counselor-personal-details.component';

describe('CounselorPersonalDetailsComponent', () => {
  let component: CounselorPersonalDetailsComponent;
  let fixture: ComponentFixture<CounselorPersonalDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CounselorPersonalDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CounselorPersonalDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
