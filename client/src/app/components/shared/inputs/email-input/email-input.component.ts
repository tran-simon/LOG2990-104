import { Component, OnInit } from '@angular/core';
import { CustomInputComponent } from '../custom-input/custom-input.component';

@Component({
  selector: 'app-email-input',
  templateUrl: '../custom-input/custom-input.component.html',
  styleUrls: ['../custom-input/custom-input.component.scss'],
})
export class EmailInputComponent extends CustomInputComponent implements OnInit {
  ngOnInit(): void {
    // tslint:disable-next-line: max-line-length
    this.stringToMatch = '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$';
    this.format = (v: string): string => v;
    this.hintLabel = 'Lettres, espaces et nombres. Maximum 20 charactères';
    super.ngOnInit();
  }
}
