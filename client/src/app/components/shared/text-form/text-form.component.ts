import {Component} from '@angular/core';
import {AbstractControl, FormControl, ValidationErrors, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material';

@Component({
  selector: 'app-text-form',
  templateUrl: './text-form.component.html',
  styleUrls: ['./text-form.component.scss']
})
export class TextFormComponent {
  hint: string;
  placeholder: string;
  defaultMessage = 'Invalid input';
  private validators: ((control: AbstractControl) => (ValidationErrors | null))[]
    = [Validators.required, Validators.email]; // todo: Make enum?
  private errorMessages = ['Required', 'Invalid Email'];

  formControl = new FormControl('', this.validators);
  matcher = new ErrorStateMatcher();

  getErrorMessage(index: number): string {
    const message: string = this.errorMessages[index];
    return message ? message : this.defaultMessage;
  }

}
