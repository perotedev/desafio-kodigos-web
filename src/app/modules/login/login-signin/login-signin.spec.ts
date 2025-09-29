import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginSignin } from './login-signin';

describe('LoginSignin', () => {
  let component: LoginSignin;
  let fixture: ComponentFixture<LoginSignin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginSignin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginSignin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
