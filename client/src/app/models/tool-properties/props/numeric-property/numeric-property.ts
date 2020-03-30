import { Property } from '@tool-properties/props/property';
import { MathUtil } from '@utils/math/math-util';

export class NumericProperty implements Property<number> {// todo setter?
  private _value: number;
  minValue: number;
  maxValue: number;

  constructor(minValue: number, maxValue: number, value: number = minValue) {
    this._value = value;
    this.maxValue = maxValue;
    this.minValue = minValue;
  }

  get value(): number {
    return this._value;
  }

  set value(value: number) {
    this._value = MathUtil.fit(value, this.minValue, this.maxValue);
  }
}
