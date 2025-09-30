import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerContent } from './container-content';

describe('ContainerContent', () => {
  let component: ContainerContent;
  let fixture: ComponentFixture<ContainerContent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContainerContent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContainerContent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
