import { Property } from '@tool-properties/props/property';

export class NumericProperty implements Property<number>{//todo setter?
  value: number;
  minValue: number;
  maxValue: number;

  constructor(minValue: number, maxValue: number, value: number = minValue) {
    this.value = value;
    this.maxValue = maxValue;
    this.minValue = minValue;
  }
}
