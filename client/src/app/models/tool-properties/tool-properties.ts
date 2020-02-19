import { SelectedColorType } from 'src/app/services/colors.service';
import { MathUtil } from 'src/app/utils/math/math-util';

export abstract class ToolProperties {
  toolName: string;

  private _strokeWidth: number;
  abstract readonly minThickness: number;
  abstract readonly maxThickness: number;

  fillColor: SelectedColorType;
  fillOpacity: number;
  strokeColor: SelectedColorType;
  strokeOpacity: number;

  protected constructor(toolName: string) {
    this.toolName = toolName;

    this.fillOpacity = 1;
    this.strokeOpacity = 1;
  }

  get strokeWidth(): number {
    return this._strokeWidth;
  }

  set strokeWidth(thickness: number) {
    // todo: Remove?
    this._strokeWidth = MathUtil.fit(thickness, this.minThickness, this.maxThickness);
  }
}
