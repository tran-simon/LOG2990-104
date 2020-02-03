import { Component, EventEmitter, Input, NgIterable, OnChanges, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { defaultErrorMessages, ErrorMessages } from './error-messages';

@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent implements OnInit, OnChanges {
  static id = 0;
  @Input() id = `custom-input-${CustomInputComponent.id++}`;
  @Input() formGroup = new FormGroup({});
  @Input() stringToMatch: string;
  @Input() required = true;
  @Input() messages: string;
  @Input() length: number;
  @Input() minLength: number;
  @Input() maxLength: number;
  @Input() prefix: string;
  @Input() suffix: string;

  formControl: FormControl;
  validValue = '';

  @Input() value = '';
  @Output() valueChange = new EventEmitter<string>();

  @Input() errorMessages: ErrorMessages<string> = defaultErrorMessages();
  @Input() format = (v: string) => v;

  ngOnInit() {
    if (!this.formControl) {
      this.formControl = new FormControl(this.value, this.makeValidators());
    }
    this.formGroup.addControl(this.id, this.formControl);
    this.value = this.format(this.value);
    this.validValue = this.value;
  }

  onBlur(value = '') {
    if (this.formControl) {
      this.value = this.format(this.formControl.valid ? value : this.validValue);
      this.formControl.setValue(this.value);
      this.valueChange.emit(this.value);
    }
  }

  ngOnChanges(): void {
    this.value = this.format(this.value);
    this.validValue = this.value;
  }

  getErrorMessage(errorName: string): string {
    return this.errorMessages[errorName] || '';
  }

  makeValidators(): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    if (!this.minLength && !this.maxLength) {
      this.minLength = this.length;
      this.maxLength = this.length;
    }
    if (this.required) {
      validators.push(Validators.required);
    }
    if (this.stringToMatch) {
      validators.push(Validators.pattern(this.stringToMatch));
    }
    if (this.maxLength) {
      validators.push(Validators.maxLength(this.maxLength));
    }
    if (this.minLength) {
      validators.push(Validators.minLength(this.minLength));
    }
    return validators;
  }

  get errors(): NgIterable<string> {
    const errors: ValidationErrors | null = this.formControl.errors;
    return errors ? Object.keys(errors) : [];
  }
}
