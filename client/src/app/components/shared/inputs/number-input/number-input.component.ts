import {Component} from '@angular/core';
import {CustomInputComponent} from "../custom-input/custom-input.component";

@Component({
  selector: 'app-number-input',
  templateUrl: './number-input.component.html',
  styleUrls: ['./number-input.component.scss']
})
export class NumberInputComponent extends CustomInputComponent {
  ngOnInit() {
    this.errorMessages['pattern'] = "Valeur doit être numérique";
    super.ngOnInit();
  }
}
