import { Color } from '@utils/color/color';
import { EditorUtil } from '@utils/color/editor-util';
import { Tool } from 'src/app/models/tools/tool';
import { EditorService } from 'src/app/services/editor.service';
import { SelectedColorType } from 'src/app/services/selected-color-type.enum';
import { Coordinate } from 'src/app/utils/math/coordinate';

/**
 * Based on: https://stackoverflow.com/questions/3768565/drawing-an-svg-file-on-a-html5-canvas
 */
export class PipetteTool extends Tool {
  constructor(editorService: EditorService) {
    super(editorService);
  }

  private pickColor(position: Coordinate, selectedColorType: SelectedColorType): void {
    EditorUtil.colorAtPoint(this.editorService.view, position).then((color: Color) =>
      this.editorService.colorsService.setColorByTypeAndUpdateHistory(color, selectedColorType),
    );
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
