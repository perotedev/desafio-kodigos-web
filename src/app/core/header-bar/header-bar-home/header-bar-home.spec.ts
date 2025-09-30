import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBarHome } from './header-bar-home';

describe('HeaderBarHome', () => {
  let component: HeaderBarHome;
  let fixture: ComponentFixture<HeaderBarHome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderBarHome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderBarHome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
