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

  handleMouseDown(e: MouseEvent): boolean | void {
    if (!this.isActive) {
      this.startShape();
    }
    return super.handleMouseDown(e);
  }

  handleMouseMove(e: MouseEvent): boolean | void {
    if (this.isActive) {
      this.shape.addPoint(this.mousePosition);
    }
    return super.handleMouseMove(e);
  }

  handleMouseUp(e: MouseEvent): boolean | void {
    if (this.isActive) {
      this.applyShape();
    }
    return super.handleMouseUp(e);
  }

  handleMouseLeave(e: MouseEvent): boolean | void {
    return this.handleMouseUp(e);
  }
}
