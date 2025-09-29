import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOrderView } from './service-order-view';

describe('ServiceOrderView', () => {
  let component: ServiceOrderView;
  let fixture: ComponentFixture<ServiceOrderView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceOrderView]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceOrderView);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
