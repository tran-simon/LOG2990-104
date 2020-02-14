import { Injectable } from '@angular/core';
import { Color } from 'src/app/utils/color/color';
import { MathUtil } from 'src/app/utils/math/math-util';

export enum SelectedColorType {
  primary,
  secondary,
}

@Injectable({
  providedIn: 'root',
})
export class SelectedColorsService {
  private _colors: Color[] = [Color.WHITE, Color.BLACK];

  swapColors(): void {
    const tempColor = this.secondaryColor;
    this.secondaryColor = this.primaryColor;
    this.primaryColor = tempColor;
  }

  colorByIndex(index: number): Color {
    return this._colors[MathUtil.fit(index)];
  }

  setColorByIndex(color: Color, index: number) {
    this._colors[MathUtil.fit(index)] = color;
  }

  get primaryColor(): Color {
    return this.colorByIndex(SelectedColorType.primary);
  }

  set primaryColor(color: Color) {
    this.setColorByIndex(color, SelectedColorType.primary);
  }

  get secondaryColor(): Color {
    return this.colorByIndex(SelectedColorType.secondary);
  }

  set secondaryColor(color: Color) {
    this.setColorByIndex(color, SelectedColorType.secondary);
  }
}
