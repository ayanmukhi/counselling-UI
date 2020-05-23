import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CousnelorUpdateComponent } from './cousnelor-update.component';

describe('CousnelorUpdateComponent', () => {
  let component: CousnelorUpdateComponent;
  let fixture: ComponentFixture<CousnelorUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CousnelorUpdateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CousnelorUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
