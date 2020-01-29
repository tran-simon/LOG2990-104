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
    size = 300;

    formGroup: FormGroup = new FormGroup({});

    colorChange(color: Color) {
        this.color = color;
    }

    changeColor(value: string, component: string) {
        switch (component) {
            case 'r':
                this.color.r255 = +value;
                break;
            case 'g':
                this.color.g255 = +value;
                break;
            case 'b':
                this.color.b255 = +value;
                break;
        }
    }

    onClick() {
        console.log('CLICK');
    }

    get hexForm() {
        return this.formGroup.get('hex');
    }
}
