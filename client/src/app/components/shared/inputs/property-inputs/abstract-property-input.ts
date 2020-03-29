import { Input } from '@angular/core';
import { Property } from '@tool-properties/props/property';

export abstract class AbstractPropertyInput<T extends Property<any>>{
  @Input() property: Property<any>;
}
