import { BrushPath } from 'src/app/models/shapes/brush-path';
import { BrushToolProperties } from 'src/app/models/tool-properties/brush-tool-properties';
import { PenTool } from 'src/app/models/tools/creator-tools/stroke-tools/pen-tool';
import { ToolType } from 'src/app/models/tools/tool';
import { EditorService } from 'src/app/services/editor.service';

export class BrushTool extends PenTool {
  toolProperties: BrushToolProperties;
  path: BrushPath;

  constructor(editorService: EditorService) {
    super(editorService, ToolType.Brush);
    this.toolProperties = new BrushToolProperties();
  }

  initPath(): void {
    this.path = new BrushPath(this.mousePosition);

    this.path.shapeProperties.strokeColor = this.editorService.colorsService.primaryColor;
    this.path.shapeProperties.strokeOpacity = this.editorService.colorsService.primaryColor.a;
    this.path.shapeProperties.strokeWidth = this.toolProperties.strokeWidth;
    this.path.changeFilter(this.toolProperties.texture);

    this.path.updateProperties();
    this.drawShape();
    this.path.addPoint(this.mousePosition);
  }
}
