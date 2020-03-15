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

  private pickColor(position: Coordinate, selectedColorType: SelectedColorType): void {
    const canvasContext = this.editorService.viewToCanvas();
    canvasContext.then((ctx) => {
      const data = ctx.getImageData(position.x, position.y, 1, 1).data;
      const color = Color.rgb255(data[0], data[1], data[2]);
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
