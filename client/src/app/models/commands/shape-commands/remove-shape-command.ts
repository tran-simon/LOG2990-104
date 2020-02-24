import { EditorService } from 'src/app/services/editor.service';
import { BaseShape } from '../../shapes/base-shape';
import { ShapeCommand } from './shape-command';

export class AddShapeCommand extends ShapeCommand {
  constructor(shape: BaseShape, private editorService: EditorService) {
    super(shape);
  }

  execute(): void {
    const index = this.editorService.shapes.findIndex((s) => s === this._shape);
    this.editorService.shapes.splice(index, 1, this._shape);
    this.editorService.view.svg.removeChild(this._shape.svgNode);
  }

  undo(): void {
    if (!this.editorService.view.svg.contains(this._shape.svgNode)) {
      this.editorService.addShapeToBuffer(this._shape);
    }
    this.editorService.applyShapesBuffer();
  }
}
