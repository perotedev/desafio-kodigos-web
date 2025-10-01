import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOrderDetails } from './service-order-details';

describe('ServiceOrderDetails', () => {
  let component: ServiceOrderDetails;
  let fixture: ComponentFixture<ServiceOrderDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceOrderDetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceOrderDetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
