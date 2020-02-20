import { Path } from 'src/app/models/shapes/path';
import { PenToolProperties } from 'src/app/models/tool-properties/pen-tool-properties';
import { CreatorTool } from 'src/app/models/tools/creator-tools/creator-tool';
import { ToolType } from 'src/app/models/tools/tool';
import { EditorService } from 'src/app/services/editor.service';

export class PenTool extends CreatorTool {
  toolProperties: PenToolProperties;

  path: Path;

  constructor(editorService: EditorService, type = ToolType.Pen) {
    super(editorService, type);
    this.toolProperties = new PenToolProperties();
  }

  get shape(): Path {
    return this.path;
  }

  handleToolMouseEvent(e: MouseEvent): void {
    if (this.isActive) {
      if (e.type === 'mouseup' || e.type === 'mouseleave') {
        this.applyShape();
      } else if (e.type === 'mousemove') {
        this.shape.addPoint(this.mousePosition);
      }
    } else if (e.type === 'mousedown') {
      this.isActive = true;
      this.initPath();
    }
  }

  initPath(): void {
    this.path = new Path(this.mousePosition);

    this.path.shapeProperties.strokeColor = this.editorService.colorsService.primaryColor;
    this.path.shapeProperties.strokeOpacity = this.editorService.colorsService.primaryColor.a;
    this.path.shapeProperties.strokeWidth = this.toolProperties.strokeWidth;

    this.path.updateProperties();
    this.drawShape();
    this.path.addPoint(this.mousePosition);
  }
}
