import { Component } from '@angular/core';
import { AbstractPropertyInput } from '@components/shared/inputs/property-inputs/abstract-property-input';
import { EnumProperty } from '@tool-properties/props/enum-property/enum-property';

@Component({
  selector: 'app-enum-property-input',
  templateUrl: './enum-property-input.component.html',
  styleUrls: ['./enum-property-input.component.scss']
})
export class EnumPropertyInputComponent<E> extends AbstractPropertyInput<EnumProperty>{//todo remove any
  property: EnumProperty;
}
