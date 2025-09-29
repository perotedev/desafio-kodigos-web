import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRecoverPassword } from './login-recover-password';

describe('LoginRecoverPassword', () => {
  let component: LoginRecoverPassword;
  let fixture: ComponentFixture<LoginRecoverPassword>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginRecoverPassword]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginRecoverPassword);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
