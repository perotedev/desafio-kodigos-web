import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuDesktop } from './menu-desktop';

describe('MenuDesktop', () => {
  let component: MenuDesktop;
  let fixture: ComponentFixture<MenuDesktop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuDesktop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MenuDesktop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
