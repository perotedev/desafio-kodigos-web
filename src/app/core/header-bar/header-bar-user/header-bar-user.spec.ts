import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderBarUser } from './header-bar-user';

describe('HeaderBarUser', () => {
  let component: HeaderBarUser;
  let fixture: ComponentFixture<HeaderBarUser>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderBarUser]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderBarUser);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
