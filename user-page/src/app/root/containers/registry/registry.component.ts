import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ROUTES_STRINGS } from '../../../constants/routing';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-registry',
  templateUrl: './registry.component.html',
  styleUrls: ['./registry.component.sass']
})
export class RegistryComponent implements OnInit, AfterViewInit {
  public registerForm: FormGroup;
  @ViewChild('email') private usernameField: ElementRef;
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) {}

  public ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      email: [null, Validators.email],
      password: [null, Validators.required]
    });
  }

  public ngAfterViewInit(): void {
    this.usernameField.nativeElement.focus();
  }

  public login(): void {
    this.router.navigate([ROUTES_STRINGS.LOGIN]);
  }

  public register(): void {
    const registerData = this.registerForm.getRawValue();
    this.registerForm.disable();
    this.authService.registerUser(registerData).pipe(
      finalize(() => this.registerForm.enable())
    ).subscribe();
  }
}
