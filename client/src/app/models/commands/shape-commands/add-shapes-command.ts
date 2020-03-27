import { EditorService } from 'src/app/services/editor.service';
import { BaseShape } from '../../shapes/base-shape';
import { ShapeCommand } from './shape-command';

export class AddShapesCommand extends ShapeCommand {
  constructor(shapes: BaseShape[], private editorService: EditorService) {
    super(shapes);
  }

  execute(): void {
    this.editorService.addShapesToBuffer(this.shapes);
    this.editorService.applyShapesBuffer();
  }

  undo(): void {
    this.editorService.removeShapes(this.shapes);
  }
}
