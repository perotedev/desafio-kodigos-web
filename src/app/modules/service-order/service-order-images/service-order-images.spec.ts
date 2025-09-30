import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOrderImages } from './service-order-images';

describe('ServiceOrderImages', () => {
  let component: ServiceOrderImages;
  let fixture: ComponentFixture<ServiceOrderImages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceOrderImages]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceOrderImages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
