import { BrushPath } from 'src/app/models/shapes/brush-path';
import { BrushToolProperties } from 'src/app/models/tool-properties/brush-tool-properties';
import { EditorService } from 'src/app/services/editor.service';
import { StrokeTool } from '../stroke-tool';

export class BrushTool extends StrokeTool<BrushToolProperties> {
  shape: BrushPath;

  constructor(editorService: EditorService) {
    super(editorService);
    this.toolProperties = new BrushToolProperties();
  }

  protected updateProperties(): void {
    super.updateProperties();
    this.shape.shapeProperties.secondaryColor = this.editorService.colorsService.primaryColor;
    this.shape.shapeProperties.strokeWidth = this.toolProperties.strokeWidth;
    this.shape.changeFilter(this.toolProperties.texture);
    this.shape.updateProperties();
  }

  createShape(): BrushPath {
    return new BrushPath(this.mousePosition);
  }
}
