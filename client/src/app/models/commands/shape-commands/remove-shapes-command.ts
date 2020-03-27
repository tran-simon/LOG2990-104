import { EditorService } from 'src/app/services/editor.service';
import { BaseShape } from '../../shapes/base-shape';
import { ShapeCommand } from './shape-command';

export class RemoveShapesCommand extends ShapeCommand {
  constructor(shapes: BaseShape[], private editorService: EditorService) {
    super(shapes);
  }

  execute(): void {
    this.editorService.removeShapes(this.shapes);
  }

  undo(): void {
    this.editorService.addShapesToBuffer(this.shapes);
    this.editorService.applyShapesBuffer();
  }
}
