import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-number-form',
  templateUrl: './number-form.component.html',
  styleUrls: ['./number-form.component.scss'],
})
export class NumberFormComponent implements OnInit {
  static readonly NUMERIC_REGEX: RegExp = new RegExp(/^(([0-9]*)|(([0-9]*)\.([0-9]*)))$/);
  static id = 0;

  @Input() id: string;

  @Input() required = true;
  @Input() formGroup: FormGroup;
  @Input() value = "0";
  @Output() valueChange = new EventEmitter<string>();
  @Input() format = (v: string) => v;

  formControl: FormControl;

  onBlur(value = "") {
    this.value = this.format(this.formControl.valid ? value : this.value);
    this.formControl.setValue(this.value);
    this.valueChange.emit(this.value);
  }

  ngOnInit() {
    if (!this.id) {
      this.id = `number-input-${NumberFormComponent.id++}`;
    }

    this.formControl = new FormControl(this.value, [Validators.required, Validators.pattern(NumberFormComponent.NUMERIC_REGEX)]);

    if (!this.formGroup) {
      this.formGroup = new FormGroup({});
    }
    this.formGroup.addControl(this.id, this.formControl);
  }
}
