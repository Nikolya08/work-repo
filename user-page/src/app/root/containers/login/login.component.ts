import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { finalize } from 'rxjs/operators';
import { ROUTES_STRINGS } from '../../../constants/routing';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit, AfterViewInit {
  public loginForm: FormGroup;
  @ViewChild('email') private usernameField: ElementRef;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) {}

  public ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.email],
      password: [null, Validators.required]
    });
  }

  public ngAfterViewInit(): void {
    this.usernameField.nativeElement.focus();
  }

  public registry(): void {
    this.router.navigate([ROUTES_STRINGS.REGISTER]);
  }

  public login(): void {
    const loginData = this.loginForm.getRawValue();
    this.loginForm.disable();
    this.authService.login(loginData).pipe(
      finalize(() => this.loginForm.enable())
    ).subscribe();
  }
}
