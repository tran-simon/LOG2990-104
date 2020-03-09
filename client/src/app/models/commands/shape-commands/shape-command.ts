import { BaseShape } from '../../shapes/base-shape';

export abstract class ShapeCommand {
  protected _shape: BaseShape;

  constructor(shape: BaseShape) {
    this._shape = shape;
  }
}
