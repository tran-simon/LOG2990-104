import { Component, Input } from '@angular/core';
import { CustomInputComponent } from '@components/shared/inputs/custom-input/custom-input.component';

@Component({
  selector: 'img-button',
  templateUrl: './img-button.component.html',
  styleUrls: ['./img-button.component.scss'],
})
export class ImgButtonComponent extends CustomInputComponent {
  static readonly DEFAULT_IMG_SIZE: number = 24;
  @Input() src: string;
  @Input() imgHeight: number;
  @Input() imgWidth: number;
  @Input() disable: boolean;

  constructor() {
    super();
    this.imgHeight = ImgButtonComponent.DEFAULT_IMG_SIZE;
    this.imgWidth = ImgButtonComponent.DEFAULT_IMG_SIZE;
    this.disable = false;
  }
}
