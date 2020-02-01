import {Component} from '@angular/core';
import {CustomInputComponent} from "../custom-input/custom-input.component";

@Component({
  selector: 'app-number-input',
  templateUrl: '../custom-input/custom-input.component.html',
  styleUrls: ['../custom-input/custom-input.component.scss']
})
export class NumberInputComponent extends CustomInputComponent{
  allowDecimals = false;
  allowNegatives = false;

  ngOnInit() {
    this.format = (v: string): string => (+v).toString();
    this.stringToMatch = this.makeRegexString();
    this.errorMessages['pattern'] = "Valeur doit être numérique";
    super.ngOnInit();
  }

  //todo: tests
  makeRegexString(): string {
    let regexString = "^";
    if (this.allowNegatives) {
      regexString += "-?";
    }
    regexString += "([0-9]*";
    if (this.allowDecimals) {
      regexString += "\.)?[0-9]*$";
    }
    else{
      regexString += ")$"
    }
    return regexString;
  }
}
