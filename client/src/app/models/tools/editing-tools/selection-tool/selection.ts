import { BaseShape } from '@models/shapes/base-shape';

export class Selection {
  readonly shapes: BaseShape[];

  constructor() {
    this.shapes = new Array<BaseShape>();
  }

  clear(): void {
    this.shapes.length = 0;
  }

}
