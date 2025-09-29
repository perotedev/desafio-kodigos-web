import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOrderHome } from './service-order-home';

describe('ServiceOrderHome', () => {
  let component: ServiceOrderHome;
  let fixture: ComponentFixture<ServiceOrderHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceOrderHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceOrderHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
