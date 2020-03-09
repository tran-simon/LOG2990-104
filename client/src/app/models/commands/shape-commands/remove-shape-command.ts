import { EditorService } from 'src/app/services/editor.service';
import { BaseShape } from '../../shapes/base-shape';
import { ShapeCommand } from './shape-command';

export class RemoveShapeCommand extends ShapeCommand {
  constructor(shape: BaseShape, private editorService: EditorService) {
    super(shape);
  }

  execute(): void {
    this.editorService.removeShape(this._shape);
  }

  undo(): void {
    if (!this.editorService.view.svg.contains(this._shape.svgNode)) {
      this.editorService.addShapeToBuffer(this._shape);
    }
    this.editorService.applyShapesBuffer();
  }
}
