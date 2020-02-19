import { EditorComponent } from 'src/app/components/pages/editor/editor/editor.component';
import { BrushPath } from 'src/app/models/shapes/brush-path';
import { BrushToolProperties } from 'src/app/models/tool-properties/brush-tool-properties';
import { PenTool } from 'src/app/models/tools/creator-tools/stroke-tools/pen-tool';
import { ToolType } from 'src/app/models/tools/tool';

export class BrushTool extends PenTool {
  toolProperties: BrushToolProperties;
  path: BrushPath;

  constructor(editorComponent: EditorComponent) {
    super(editorComponent, ToolType.Brush);
    this.toolProperties = new BrushToolProperties();
  }

  initPath(): void {
    this.path = new BrushPath(this.mousePosition);

    this.path.shapeProperties.strokeColor = this.editorComponent.colorsService.primaryColor;
    this.path.shapeProperties.strokeOpacity = this.editorComponent.colorsService.primaryColor.a;
    this.path.shapeProperties.strokeWidth = this.toolProperties.strokeWidth;
    this.path.changeFilter(this.toolProperties.texture);

    this.path.updateProperties();
    this.drawShape();
    this.path.addPoint(this.mousePosition);
  }
}
