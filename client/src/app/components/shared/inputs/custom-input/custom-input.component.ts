import {Component, EventEmitter, Input, NgIterable, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {defaultErrorMessages} from "./error-messages";


@Component({
  selector: 'app-custom-input',
  templateUrl: './custom-input.component.html',
  styleUrls: ['./custom-input.component.scss']
})
export class CustomInputComponent implements OnInit {
  static id = 0;
  @Input() id = `custom-input-${CustomInputComponent.id++}`;
  @Input() formGroup = new FormGroup({});
  @Input() format = (v: string) => v;
  @Input() stringToMatch: string;
  @Input() messages :string;

  formControl: FormControl;

  @Input() value = "";
  @Output() valueChange = new EventEmitter<string>();

  @Input() errorMessages: Dictionary<string> = defaultErrorMessages();

  ngOnInit() {
    if (!this.formControl) {
      this.formControl = new FormControl(this.value, this.makeValidators());
    }
    this.formGroup.addControl(this.id, this.formControl);
  }

  onBlur(value = "") {
    if (this.formControl) {
      this.value = this.format(this.formControl.valid ? value : this.value);
      this.formControl.setValue(this.value);
      this.valueChange.emit(this.value)
    }
  }

  getErrorMessage(errorName:string):string{
    return this.errorMessages[errorName];
  }

  makeValidators(): ValidatorFn[] {
    const validators: ValidatorFn[] = [];
    this.stringToMatch && validators.push(Validators.pattern(this.stringToMatch));
    return validators;
  }

  get errors(): NgIterable<string>{
    const errors: ValidationErrors | null = this.formControl.errors;
    return errors ? Object.keys(errors) : [];
  }

}
