import { EditorService } from 'src/app/services/editor.service';
import { BaseShape } from '../../shapes/base-shape';
import { ShapeCommand } from './shape-command';

export class AddShapeCommand extends ShapeCommand {
  constructor(shape: BaseShape, private editorService: EditorService) {
    super(shape);
  }

  execute(): void {
    if (!this.editorService.view.svg.contains(this._shape.svgNode)) {
      // todo - move logic to view
      this.editorService.addShapeToBuffer(this._shape);
    }
    this.editorService.applyShapesBuffer();
  }

  undo(): void {
    this.editorService.removeShape(this._shape);
  }
}
