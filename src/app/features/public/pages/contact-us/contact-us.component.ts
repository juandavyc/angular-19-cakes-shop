import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { HeroTitleComponent } from '@shared/components/hero-title/hero-title.component';
import { CONTACT_US_CONFIG } from './config/contact-us.config';
import { JsonPipe, NgClass } from '@angular/common';
import { SocialNetwork } from '@core/interfaces/social-network.interface';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormValidatorService } from '@core/services/form-validator.service';
import { ContactUsService } from './services/contact-us.service';
import { Contact } from './interfaces/contact.interface';
import { debounceTime, delay, distinctUntilChanged, map, of, single, tap } from 'rxjs';
import { rxResource, toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-contact',
  imports: [
    HeroTitleComponent,
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUsComponent {

  public readonly title = CONTACT_US_CONFIG.title;
  public readonly subtitle = CONTACT_US_CONFIG.subtitle;

  public readonly socialNetworks: SocialNetwork[] = CONTACT_US_CONFIG.socialNetworks;

  public readonly address = CONTACT_US_CONFIG.address;
  public readonly number = CONTACT_US_CONFIG.number;
  public readonly email = CONTACT_US_CONFIG.email;

  private fb = inject(FormBuilder);
  private formValidatorService = inject(FormValidatorService);
  private contactUsService = inject(ContactUsService);

  private payload = signal<Contact | null>(null);
  public isSubmitted = signal<boolean>(false);

  public myForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
    phoneNumber: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(11)]],
    message: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(255)]],
  });

  public isInvalidField(field: string): boolean | null {
    return this.formValidatorService.isInvalidField(this.myForm, field);
  }

  public getErrorField(field: string): string | null {
    return this.formValidatorService.getErrorField(this.myForm, field);
  }

  public formRx = rxResource({
    request: () => ({ form: this.payload() }),
    loader: (params) => {
      if(params.request.form){
        return this.contactUsService.create(params.request.form).pipe(
          tap(()=>this.isSubmitted.set(true))
        );
      }
      else{
        return of(null);
      }
    }
  });

  public onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    this.payload.set({
      name: this.myForm.controls.name.value,
      phoneNumber: this.myForm.controls.phoneNumber.value,
      message: this.myForm.controls.message.value,
    });
  }
}
