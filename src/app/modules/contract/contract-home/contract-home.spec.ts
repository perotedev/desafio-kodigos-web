import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractHome } from './contract-home';

describe('ContractHome', () => {
  let component: ContractHome;
  let fixture: ComponentFixture<ContractHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContractHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
