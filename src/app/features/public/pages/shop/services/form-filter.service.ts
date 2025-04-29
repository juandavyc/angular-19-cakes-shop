import { inject, Injectable } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { FormValidatorService } from '@core/services/form-validator.service';
import { digitsOnlyValidator } from '@core/validators/digits-only.validator';

import { CATEGORIES } from '@core/configs/products/categories.config';
import { OCCASIONS } from '@core/configs/products/occasions.config';
import { SHOP_CONFIG } from '../configs/shop.config';

@Injectable({
  providedIn: 'root'
})
export class FormFilterService {

  private readonly DEFAULTS = SHOP_CONFIG.defaults; // reset
  private readonly OCCASIONS = OCCASIONS;
  private readonly CATEGORIES = CATEGORIES;

  private formValidatorService = inject(FormValidatorService);

  private fb = inject(FormBuilder);

  private myForm = this.fb.group({
    title: ['',
      [Validators.minLength(2), Validators.maxLength(50)]
    ],
    minPrice: ['',
      [Validators.minLength(4), Validators.maxLength(7), digitsOnlyValidator()]
    ],
    maxPrice: ['',
      [Validators.minLength(4), Validators.maxLength(7), digitsOnlyValidator()]
    ],
    category: [this.DEFAULTS.form.category, Validators.required],
    occasion: [this.DEFAULTS.form.occasion, Validators.required],
    sort: ['created', Validators.required],
    size: ['9', Validators.required],
    page: ['0', Validators.required]
  });

  constructor() {}

  isInvalidField(field: string): boolean | null {
    return this.formValidatorService.isInvalidField(this.myForm, field);
  }
  getErrorField(field: string): string | null {
    return this.formValidatorService.getErrorField(this.myForm, field);
  }

  public get form(){
    return this.myForm;
  }

  public get Occasions(){
    return this.OCCASIONS;
  }
  public get Categories(){
    return this.CATEGORIES;
  }

}
