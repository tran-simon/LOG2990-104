import { Tool } from 'src/app/models/tools/tool';
import { EditorService } from 'src/app/services/editor.service';
import { SelectedColorType } from 'src/app/services/selected-color-type.enum';
import { Color } from 'src/app/utils/color/color';
import { Coordinate } from 'src/app/utils/math/coordinate';

/**
 * Based on: https://stackoverflow.com/questions/3768565/drawing-an-svg-file-on-a-html5-canvas
 */
export class PipetteTool extends Tool {
  constructor(editorService: EditorService) {
    super(editorService);
  }

  static colorAtPointInCanvas(canvasContext: CanvasRenderingContext2D, point: Coordinate): Color {
    const colorData = canvasContext.getImageData(point.x, point.y, 1, 1).data;
    return Color.rgb255(colorData[0], colorData[1], colorData[2]);
  }

  private pickColor(position: Coordinate, selectedColorType: SelectedColorType): void {
    this.editorService.viewToCanvas().then((ctx) => {
      const color = PipetteTool.colorAtPointInCanvas(ctx, position);
      this.editorService.colorsService.setColorByTypeAndUpdateHistory(color, selectedColorType);
    });
  }

  private handleLeftOrRightClick(selectedColorType: SelectedColorType): void {
    if (this.editorService.view) {
      this.pickColor(this.mousePosition, selectedColorType);
    }
  }

  initMouseHandler(): void {
    this.handleClick = () => this.handleLeftOrRightClick(SelectedColorType.primary);

    this.handleContextMenu = (): boolean => {
      this.handleLeftOrRightClick(SelectedColorType.secondary);
      return super.handleContextMenu();
    };
  }
}
