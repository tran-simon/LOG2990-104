import { Path } from '../../../shapes/path';
import { CreatorToolProperties } from 'src/app/models/tool-properties/creator-tool-properties/creator-tool-properties';
import { CreatorTool } from '../creator-tool';

export abstract class StrokeTool<T = CreatorToolProperties> extends CreatorTool<T> {
  shape: Path;
  abstract createShape(): Path;

  protected updateProperties(): void {
    this.shape.primaryColor = this.editorService.colorsService.primaryColor;
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
