import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ValidatorFn, Validators } from '@angular/forms';
import { CustomInputComponent } from '../custom-input/custom-input.component';

@Component({
  selector: 'app-number-input',
  templateUrl: '../custom-input/custom-input.component.html',
  styleUrls: ['../custom-input/custom-input.component.scss'],
})
export class NumberInputComponent extends CustomInputComponent implements OnInit {
  @Input()
  set numberValue(value: number) {
    this.value = value.toString();
  }

  get numberValue(): number {
    return +this.value;
  }
  @Input() allowDecimals = false;
  @Input() allowNegatives = false;
  @Input() min: number;
  @Input() max: number;

  @Output() numberValueChange = new EventEmitter<number>();

  static makeRegexString(allowNegatives = false, allowDecimals = false): string {
    let regexString = '^';
    if (allowNegatives) {
      regexString += '-?';
    }
    regexString += '([0-9]*';
    if (allowDecimals) {
      regexString += '.)?[0-9]*$';
    } else {
      regexString += ')$';
    }
    return regexString;
  }

  ngOnInit(): void {
    this.format = (v: string): string => (+v).toString();
    this.stringToMatch = NumberInputComponent.makeRegexString(this.allowNegatives, this.allowDecimals);
    this.errorMessages.pattern = 'Valeur doit être numérique';
    this.errorMessages.min = 'Valeur doit être plus grande ou égale à ' + this.min;
    this.errorMessages.max = 'Valeur doit être plus petite ou égale à ' + this.max;
    super.ngOnInit();
    this.valueChange.subscribe((value: string) => {
      this.numberValueChange.emit(+value);
    });
  }

  makeValidators(): ValidatorFn[] {
    const validators =  super.makeValidators();
    if (this.min !== undefined) {
      validators.push(Validators.min(this.min));
    }
    if (this.max !== undefined) {
      validators.push(Validators.max(this.max));
    }

    return validators;
  }
}
