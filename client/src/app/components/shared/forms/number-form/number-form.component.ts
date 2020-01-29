import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
    @Input() value: string;
    @Output() valueChange = new EventEmitter<string>();

    formControl: FormControl;

    ngOnInit() {
        this.formControl = new FormControl(this.value, [Validators.required, Validators.pattern(/^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/)]);

        if (!this.formGroup) {
            this.formGroup = new FormGroup({});
        }
        this.formGroup.addControl(this.inputId, this.formControl);
        this.formControl.valueChanges.subscribe((value) => {
            this.valueChange.emit(value);
        });
    }
}
