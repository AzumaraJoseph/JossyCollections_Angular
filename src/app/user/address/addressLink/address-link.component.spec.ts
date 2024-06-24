import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressLinkComponent } from '../../../address/address-link/address-link.component';

describe('AddressLinkComponent', () => {
  let component: AddressLinkComponent;
  let fixture: ComponentFixture<AddressLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressLinkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
