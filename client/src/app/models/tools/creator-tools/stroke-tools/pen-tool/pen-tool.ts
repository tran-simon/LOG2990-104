import { Path } from 'src/app/models/shapes/path';
import { PenToolProperties } from 'src/app/models/tool-properties/pen-tool-properties';
import { EditorService } from 'src/app/services/editor.service';
import { StrokeTool } from '../stroke-tool';

export class PenTool extends StrokeTool<PenToolProperties> {
  constructor(editorService: EditorService) {
    super(editorService);
    this.toolProperties = new PenToolProperties();
  }

  protected updateProperties(): void {
    super.updateProperties();
    this.shape.shapeProperties.strokeWidth = this.toolProperties.strokeWidth;
    this.shape.updateProperties();
  }

  createShape(): Path {
    return new Path(this.mousePosition);
  }
}
