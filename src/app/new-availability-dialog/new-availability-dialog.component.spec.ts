import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAvailabilityDialogComponent } from './new-availability-dialog.component';

describe('NewAvailabilityDialogComponent', () => {
  let component: NewAvailabilityDialogComponent;
  let fixture: ComponentFixture<NewAvailabilityDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAvailabilityDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAvailabilityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
