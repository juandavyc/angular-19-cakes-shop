import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidatorService {


  // patterns
  private readonly imagePattern = /\.(jpeg|jpg|png|webp|gif|bmp|svg)$/i;


  public arrayValidator(minlength: number, maxlength: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!(control instanceof FormArray)) return null;
      const length = control.length;
      if (length < minlength) return { minArray: true, min: minlength };
      if (length >= maxlength) return { maxArray: true, max: maxlength };
      return null;
    }
  }


  public isValidImage(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }
      return this.imagePattern.test(control.value) ? null : { invalidImage: true };
    };
  }

  // single controls
  public isInvalidControl(control: AbstractControl | null): boolean {
    if (!control) return false;
    return control.touched && control.errors ? true : false;
  }
  public getErrorControl(control: AbstractControl | null): string | null {
    return this.getError(control);
  }

  // public isInvalidArray(control: AbstractControl | null): boolean | null {
  //   if (!control) return false;
  //   return control.invalid;
  // }
  //

  public isInvalidField(form: FormGroup, fieldName: string): boolean | null {
    const field = form.get(fieldName);
    if (field) {
      return field.touched && field.errors ? true : false
    }
    return null;
  }

  isInvalidFieldInArray(form: FormArray, index: number): boolean | null {
    const field = form.controls[index];
    if (field) {
      return field.touched && field.errors ? true : false
    }
    return null;
  }
  public isInvalidFieldInArrayInGroup(form: FormArray, index: number, field: string) {
    const tempField = form.at(index).get(field);
    if (tempField) {
      return tempField.touched && tempField.errors ? true : false
    }
    return null;
  }

  public getErrorField(form: FormGroup, fieldName: string): string | null {
    return this.getError(form.get(fieldName));
  }
  public getErrorFieldInArray(form: FormArray, index: number): string | null {
    return this.getError(form.controls[index]);
  }

  public getErrorFieldInArrayInGroup(form: FormArray, index: number, field: string) {
    const control = form.at(index).get(field);
    return this.getError(control);
  }

  getError(field: any): string | null {
    if (field && field.errors) {
      const error = Object.keys(field.errors!)[0];
      // console.log(field.errors)
      switch (error) {
        case 'required':
          return 'El campo es requerido';
        case 'minlength':
          return `Debe tener minimo ${field.errors['minlength'].requiredLength} caracteres`;
        case 'maxlength':
          return `Debe tener maximo ${field.errors['maxlength'].requiredLength} caracteres`;
        case 'minArray':
          return `Debe tener minimo ${field.errors.min} elemento`;
        case 'maxArray':
          return `Debe tener minimo ${field.errors.max} elementos`;
        case 'min':
          return `El valor minimo debe ser: ${field.errors['min'].min}`;
        case 'max':
          return `El valor maximo debe ser: ${field.errors['max'].max}`;
        case 'invalidImage':
          return `Imagen no valida`;
        case 'digitsOnly':
          return `Solo numeros`;
        case 'isTaken':
          return `Elemento ya esta ocupado, intente con otro`;
        case 'minMaxLength':
          return `No cumple, minimo: ${field.errors['minMaxLength'].min} maximo: ${field.errors['minMaxLength'].max}`;
        default:
        return 'Error';
      }

    }
    return null;
  }

}
