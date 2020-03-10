import { Path } from '../../../shapes/path';
import { ToolProperties } from '../../../tool-properties/tool-properties';
import { CreatorTool } from '../creator-tool';

export abstract class StrokeTool<T = ToolProperties> extends CreatorTool<T> {
  shape: Path;
  abstract createShape(): Path;

  protected updateProperties(): void {
    this.shape.shapeProperties.strokeColor = this.editorService.colorsService.primaryColor;
    this.shape.shapeProperties.strokeOpacity = this.editorService.colorsService.primaryColor.a;
  }

  protected startShape(): void {
    super.startShape();
    this.shape.addPoint(this.mousePosition);
  }

  initMouseHandler(): void {
    this.handleMouseDown = () => {
      if (!this.isActive) {
        this.startShape();
      }
    };

    this.handleMouseMove = () => {
      if (this.isActive) {
        this.shape.addPoint(this.mousePosition);
      }
    };

    this.handleMouseUp = () => {
      if (this.isActive) {
        this.applyShape();
      }
    };

    this.handleMouseLeave = this.handleMouseUp;
  }

}
