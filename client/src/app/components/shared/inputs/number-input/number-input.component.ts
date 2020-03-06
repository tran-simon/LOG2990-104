import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Input() allowDecimals: boolean;
  @Input() allowNegatives: boolean;

  @Output() numberValueChange: EventEmitter<number>;

  constructor() {
    super();
    this.allowDecimals = false;
    this.allowNegatives = false;
    this.numberValueChange = new EventEmitter<number>();
  }

  static makeRegexString(allowNegatives: boolean = false, allowDecimals: boolean = false): string {
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
    this.valueChange.subscribe((value: string) => {
      this.numberValueChange.emit(+value);
    });
  }
}
