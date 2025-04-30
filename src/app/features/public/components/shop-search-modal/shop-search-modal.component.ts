import { ChangeDetectionStrategy, Component, ElementRef, inject, viewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormValidatorService } from '@core/services/form-validator.service';

@Component({
  selector: 'shop-search-modal',
  imports: [
    ReactiveFormsModule,
  ],
  templateUrl: './shop-search-modal.component.html',
  styleUrl: './shop-search-modal.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ShopSearchModalComponent {

  private cartRemoveModal = viewChild<ElementRef<HTMLDialogElement>>('shopSearchModal');

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private formValidatorService = inject(FormValidatorService);


  public myForm = this.fb.group({
    title: ['',
      [Validators.required, Validators.minLength(2), Validators.maxLength(50)]
    ]
  })

  public openModal(open: boolean): void {

    const modal = this.cartRemoveModal();
    if (!modal) return;
    if (open) {
      modal.nativeElement.showModal();
      this.myForm.reset();
    }
    else modal.nativeElement.close();

  }

  public isInvalidField(field: string): boolean | null {
    return this.formValidatorService.isInvalidField(this.myForm, field);
  }
  public getErrorField(field: string): string | null {
    return this.formValidatorService.getErrorField(this.myForm, field);
  }


  public myFormSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }

    const title = (this.myForm.controls.title.value)!.trim();
    if(!title) return;
    this.router.navigate(['/shop'], { queryParams: { title: title } });
    this.openModal(false);
  }


}
