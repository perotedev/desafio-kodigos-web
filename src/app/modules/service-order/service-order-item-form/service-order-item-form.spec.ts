import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOrderItemForm } from './service-order-item-form';

describe('ServiceOrderItemForm', () => {
  let component: ServiceOrderItemForm;
  let fixture: ComponentFixture<ServiceOrderItemForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceOrderItemForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceOrderItemForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
