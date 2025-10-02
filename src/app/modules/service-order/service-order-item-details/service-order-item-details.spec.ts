import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOrderItemDetails } from './service-order-item-details';

describe('ServiceOrderItemDetails', () => {
  let component: ServiceOrderItemDetails;
  let fixture: ComponentFixture<ServiceOrderItemDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceOrderItemDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceOrderItemDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
