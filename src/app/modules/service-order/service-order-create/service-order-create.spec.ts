import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOrderCreate } from './service-order-create';

describe('ServiceOrderCreate', () => {
  let component: ServiceOrderCreate;
  let fixture: ComponentFixture<ServiceOrderCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceOrderCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceOrderCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
