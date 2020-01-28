import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Color } from './color';

@Component({
    selector: 'app-color-picker',
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent {
    color: Color = Color.BLUE;
    width = 300;
    height = 300;

    formGroup: FormGroup = new FormGroup({});
}
