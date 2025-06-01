import { ChangeDetectionStrategy, Component, effect, ElementRef, inject, signal, viewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FormValidatorService } from '@core/services/form-validator.service';
import { HeroTitleComponent } from '@shared/components/hero-title/hero-title.component';
import { LoginFormValues } from './interfaces/login.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { delay, filter, Observable, of, tap } from 'rxjs';
import { AuthService } from '@auth/services/auth.service';
import { SeoService } from '@core/services/seo.service';
import { LOGIN_CONFIG } from './configs/login.config';



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

  private seo = inject(SeoService);

  public readonly title = LOGIN_CONFIG.title;
  public readonly subtitle = LOGIN_CONFIG.subtitle;

  private fb = inject(FormBuilder);
  private router = inject(Router);

  private formValidatorService = inject(FormValidatorService);

  private authService = inject(AuthService);

  constructor() {
    this.seo.setSeoMetadata(LOGIN_CONFIG.seo);
  }
  public payload = signal<LoginFormValues | null>(null);

  private passwordInput = viewChild<ElementRef<HTMLInputElement>>('passwordInput');
  // private togglePasswordType = viewChild<ElementRef<HTMLInputElement>>('togglePasswordType');
  public form = this.fb.group({
    username: this.fb.control('',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
    ),
    password: this.fb.control('',
      [Validators.required, Validators.minLength(3), Validators.maxLength(20)]
    ),
  })

  public loginRx = rxResource({
    request: () => ({ payload: this.payload() }),
    loader: ({ request }): Observable<Boolean | null> => {
      if (!request.payload) return of(null);
      const { username, password } = request.payload;
      return this.authService.login(username!, password!).pipe(
        tap((response) => {
          if (response) {
            this.router.navigate(['/authenticated'])
          }
        })
      );
    }
  })

  public isInvalidField(field: string): boolean | null {
    return this.formValidatorService.isInvalidControl(this.form.get(field))
  }

  public getErrorField(field: string): string | null {
    return this.formValidatorService.getErrorControl(this.form.get(field));
  }

  public changePasswordType(checked: boolean) {
    const input = this.passwordInput();
    if (!input) return;
    input.nativeElement.type = (checked) ? 'text' : 'password';
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { username = '', password = '' } = this.form.value;
    this.payload.set({ username, password });

  }


}
