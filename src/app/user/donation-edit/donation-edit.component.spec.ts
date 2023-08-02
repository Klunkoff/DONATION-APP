import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DonationEditComponent } from './donation-edit.component';

describe('DonationEditComponent', () => {
  let component: DonationEditComponent;
  let fixture: ComponentFixture<DonationEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DonationEditComponent]
    });
    fixture = TestBed.createComponent(DonationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
