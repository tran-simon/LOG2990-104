import { BaseShape } from '../../shapes/base-shape';
import { ShapeCommand } from './shape-command';

export class AddShapeCommand extends ShapeCommand {
  constructor(shape: BaseShape) {
    super(shape);
  }

  execute() {
    // todo
  }

  undo() {
    // todo
  }
}
