import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {

  isInvalidField(form: FormGroup, fieldName: string): boolean | null {
    const field = form.get(fieldName);
    if (field) {
      return field.touched && field.errors ? true : false
    }
    return null;
  }

  // isInvalidFieldInArray(form: FormArray, index: number): boolean | null {
  //   const field = form.controls[index];
  //   if (field) {
  //     return field.touched && field.errors ? true : false
  //   }
  //   return null;
  // }

  getErrorField(form: FormGroup, fieldName: string): string | null {
    return this.getError(form.get(fieldName));
  }
  // getErrorFieldInArray(form: FormArray, index: number): string | null {
  //   return this.getError(form.controls[index]);
  // }

  getError(field: any){
    if (field && field.errors) {
      const error = Object.keys(field.errors!)[0];

      switch (error) {
        case 'required':
          return 'El campo es requerido';
        case 'minlength':
          return `Debe tener minimo ${field.errors['minlength'].requiredLength} caracteres`;
        case 'maxlength':
            return `Debe tener maximo ${field.errors['maxlength'].requiredLength} caracteres`;
        case 'min':
          return `El valor minimo debe ser: ${field.errors['min'].min}`;
        case 'digitsOnly':
            return `Solo numeros`;
        default: return 'Error';
      }

    }
    return null;
  }

}
