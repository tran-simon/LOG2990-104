import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-number-form',
    templateUrl: './number-form.component.html',
    styleUrls: ['./number-form.component.scss'],
})
export class NumberFormComponent implements OnInit {
    static id = 0;
    id = `number-input-${NumberFormComponent.id++}`;

    @Input() formGroup: FormGroup;
    @Input() inputId: string;

    formControl = new FormControl('', [Validators.required, Validators.pattern(/^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/)]);

    ngOnInit() {
        this.formGroup.addControl(this.inputId, this.formControl);
    }
}
