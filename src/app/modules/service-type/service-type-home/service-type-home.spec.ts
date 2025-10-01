import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceTypeHome } from './service-type-home';

describe('ServiceTypeHome', () => {
  let component: ServiceTypeHome;
  let fixture: ComponentFixture<ServiceTypeHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceTypeHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceTypeHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
