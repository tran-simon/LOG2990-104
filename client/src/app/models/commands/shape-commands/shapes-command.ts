import { Command } from '@models/commands/command';
import { EditorService } from '@services/editor.service';
import { BaseShape } from '../../shapes/base-shape';

export abstract class ShapesCommand implements Command {
  constructor(shapes: BaseShape[] | BaseShape, protected editorService: EditorService) {
    this.shapes = Array.isArray(shapes) ? shapes : [shapes];
  }

  protected readonly shapes: BaseShape[];
  abstract execute(): void;
  abstract undo(): void;
}
