import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appEmailValidator]',
     providers: [{provide: NG_VALIDATORS, useExisting: EmailValidatorDirective, multi: true}]
   })
  

export class EmailValidatorDirective implements Validator {

  validate(control: AbstractControl<string, any>): ValidationErrors | null {
      if(control.value?.includes("test")){
        return {
          invalidEmail:true
        }
      }
      return null;
  }
  constructor() { }

}
