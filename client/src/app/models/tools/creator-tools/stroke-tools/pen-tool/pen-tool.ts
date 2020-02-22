import { Path } from 'src/app/models/shapes/path';
import { PenToolProperties } from 'src/app/models/tool-properties/pen-tool-properties';
import { EditorService } from 'src/app/services/editor.service';
import { StrokeTool } from '../stroke-tool';

export class PenTool extends StrokeTool<PenToolProperties> {
  constructor(editorService: EditorService) {
    super(editorService);
    this.toolProperties = new PenToolProperties();
  }

  protected initPath(): void {
    this.path = new Path(this.mousePosition);

    this.path.shapeProperties.strokeColor = this.editorService.colorsService.primaryColor;
    this.path.shapeProperties.strokeOpacity = this.editorService.colorsService.primaryColor.a;
    this.path.shapeProperties.strokeWidth = this.toolProperties.strokeWidth;

    this.path.updateProperties();
    this.addShape();
    this.path.addPoint(this.mousePosition);
  }
}
