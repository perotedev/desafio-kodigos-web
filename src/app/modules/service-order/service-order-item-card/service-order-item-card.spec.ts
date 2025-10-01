import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOrderItemCard } from './service-order-item-card';

describe('ServiceOrderItemCard', () => {
  let component: ServiceOrderItemCard;
  let fixture: ComponentFixture<ServiceOrderItemCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceOrderItemCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceOrderItemCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
