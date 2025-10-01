import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOrderItems } from './service-order-items';

describe('ServiceOrderItems', () => {
  let component: ServiceOrderItems;
  let fixture: ComponentFixture<ServiceOrderItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceOrderItems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceOrderItems);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
