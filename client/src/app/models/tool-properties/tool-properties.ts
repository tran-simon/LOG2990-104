import { MathUtil } from 'src/app/utils/math/math-util';

export abstract class ToolProperties {
  toolName: string;

  private _thickness: number;
  abstract readonly minThickness: number;
  abstract readonly maxThickness: number;

  protected constructor(toolName: string) {
    this.toolName = toolName;
  }

  get thickness(): number {
    return this._thickness;
  }

  set thickness(thickness: number) {
    this._thickness = MathUtil.fit(thickness, this.minThickness, this.maxThickness);
  }
}
