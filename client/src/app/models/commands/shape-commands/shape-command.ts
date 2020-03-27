import { BaseShape } from '../../shapes/base-shape';

export abstract class ShapeCommand {//todo: change to ShapesCommand
  protected readonly shapes: BaseShape[];

  protected constructor(shapes: BaseShape[]) {
    this.shapes = shapes;
  }
}
