import { Component, Input } from '@angular/core';
import { AbstractPropertyInput } from '@components/shared/inputs/property-inputs/abstract-property-input';
import { NumericProperty } from '@tool-properties/props/numeric-property/numeric-property';

@Component({
  selector: 'app-numeric-property-input',
  templateUrl: './numeric-property-input.component.html',
  styleUrls: ['./numeric-property-input.component.scss']
})
export class NumericPropertyInputComponent extends AbstractPropertyInput<NumericProperty> {
  static readonly SLIDER_STEP: number = 0.1;

  @Input() sliderStep: number = NumericPropertyInputComponent.SLIDER_STEP;
  @Input() property: NumericProperty;
}
