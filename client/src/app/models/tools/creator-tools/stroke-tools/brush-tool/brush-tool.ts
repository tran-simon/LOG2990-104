import { BrushPath } from 'src/app/models/shapes/brush-path';
import { BrushToolProperties } from 'src/app/models/tool-properties/brush-tool-properties';
import { EditorService } from 'src/app/services/editor.service';
import { StrokeTool } from '../stroke-tool';

export class BrushTool extends StrokeTool<BrushToolProperties> {
  protected path: BrushPath;

  constructor(editorService: EditorService) {
    super(editorService);
    this.toolProperties = new BrushToolProperties();
  }

  protected initPath(): void {
    this.path = new BrushPath(this.mousePosition);

    this.path.shapeProperties.strokeColor = this.editorService.colorsService.primaryColor;
    this.path.shapeProperties.strokeOpacity = this.editorService.colorsService.primaryColor.a;
    this.path.shapeProperties.strokeWidth = this.toolProperties.strokeWidth;
    this.path.changeFilter(this.toolProperties.texture);

    this.path.updateProperties();
    this.addShape();
    this.path.addPoint(this.mousePosition);
  }
}
