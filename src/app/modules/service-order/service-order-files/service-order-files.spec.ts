import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceOrderFiles } from './service-order-files';

describe('ServiceOrderFiles', () => {
  let component: ServiceOrderFiles;
  let fixture: ComponentFixture<ServiceOrderFiles>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ServiceOrderFiles]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceOrderFiles);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
