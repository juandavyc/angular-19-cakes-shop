import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormValidatorService } from '@core/services/form-validator.service';
import { HeroTitleComponent } from '@shared/components/hero-title/hero-title.component';
import { LoginService } from './services/login.service';
import { LoginFormValues } from './interfaces/login.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { sign } from 'crypto';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    HeroTitleComponent,
    RouterLink
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {


  public readonly title = 'Iniciar sesion';
  public readonly subtitle = 'Pasteleria JB';

  private fb = inject(FormBuilder);
  private router = inject(Router);

  private formValidatorService = inject(FormValidatorService);
  private loginService = inject(LoginService);

  public payload = signal<LoginFormValues | null>(null);

  private passwordInput = viewChild<ElementRef<HTMLInputElement>>('passwordInput');
  // private togglePasswordType = viewChild<ElementRef<HTMLInputElement>>('togglePasswordType');

  public form = this.fb.group({
    username: this.fb.control('', [Validators.required]), //Validators.minLength(3), Validators.maxLength(15)
    password: this.fb.control('', [Validators.required]),
  })

  constructor() {
    effect(() => {
      const response = this.loginRx;
      if (response.hasValue() && response.value() === true) {
        console.log("auth");
        this.router.navigate(['/authenticated'])
      }
    })
  }

  public loginRx = rxResource({
    request: () => ({ payload: this.payload() }),
    loader: ({ request }): Observable<boolean | null> => {
      if (!request.payload) return of(null);
      const { username, password } = request.payload;
      return this.loginService.login(username, password);

    }
  })

  public changePasswordType(checked: boolean) {
    const input = this.passwordInput();
    if (!input) return;
    input.nativeElement.type = (checked) ? 'text' : 'password';
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAsTouched();
      return;
    }
    const values = this.form.value as LoginFormValues;
    this.payload.set(values);

  }


}
