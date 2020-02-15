import { Component, Input, OnInit } from '@angular/core';
import { CustomInputComponent } from '../custom-input/custom-input.component';

@Component({
  selector: 'app-number-input',
  templateUrl: '../custom-input/custom-input.component.html',
  styleUrls: ['../custom-input/custom-input.component.scss'],
})
export class NumberInputComponent extends CustomInputComponent implements OnInit {
  @Input() allowDecimals = false;
  @Input() allowNegatives = false;

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
    super.ngOnInit();
  }
}
