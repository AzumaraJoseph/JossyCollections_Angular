import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderTotalComponent } from './create-order-total.component';

describe('CreateOrderTotalComponent', () => {
  let component: CreateOrderTotalComponent;
  let fixture: ComponentFixture<CreateOrderTotalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrderTotalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrderTotalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
