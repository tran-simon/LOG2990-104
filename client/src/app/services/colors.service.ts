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
export class ColorsService {
  private _colors: Color[] = [Color.WHITE, Color.BLACK];

  swapColors(): void {
    const tempColor = this.secondaryColor;
    this.secondaryColor = this.primaryColor;
    this.primaryColor = tempColor;
  }

  getColor(index: SelectedColorType): Color {
    return this._colors[MathUtil.fit(index)];
  }

  setColorByIndex(color: Color, index: number): void {
    this._colors[MathUtil.fit(index)] = color;
  }

  get primaryColor(): Color {
    return this.getColor(SelectedColorType.primary);
  }

  set primaryColor(color: Color) {
    this.setColorByIndex(color, SelectedColorType.primary);
  }

  get secondaryColor(): Color {
    return this.getColor(SelectedColorType.secondary);
  }

  set secondaryColor(color: Color) {
    this.setColorByIndex(color, SelectedColorType.secondary);
  }
}
