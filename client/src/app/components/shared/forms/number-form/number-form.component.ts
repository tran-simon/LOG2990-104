import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-number-form',
    templateUrl: './number-form.component.html',
    styleUrls: ['./number-form.component.scss'],
})
export class NumberFormComponent implements OnInit {
    formGroup: FormGroup;
    @Input() name: string;
    formControl = new FormControl('', [Validators.required, Validators.pattern(/^(([1-9]*)|(([1-9]*)\.([0-9]*)))$/)]);

    ngOnInit() {
        this.formGroup = new FormGroup({ number: this.formControl });
    }

    get number() {
        return this.formGroup.get('number');
    }
}
