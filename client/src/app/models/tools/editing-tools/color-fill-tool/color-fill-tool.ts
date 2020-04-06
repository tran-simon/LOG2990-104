import { EditorService } from '@services/editor.service';
import { Tool } from '@tools/tool';
import { Color } from '@utils/color/color';
import { EditorUtils } from '@utils/color/editor-utils';
import { Coordinate } from '@utils/math/coordinate';

/**
 * https://en.wikipedia.org/wiki/Flood_fill
 * todo: move to colorFillUtil
 */
export class ColorFillTool extends Tool {
  private context: CanvasRenderingContext2D | undefined;
  private targetColor: Color | undefined;

  constructor(editorService: EditorService) {
    super(editorService);
    // todo: tool properties
  }

  setColorAtPoint(point: Coordinate, color: Color): void {
    console.log(color.rgbString + ' at: ' + point.toString());
  }

  setTargetColor(): Color | undefined {
    if (this.context) {
      this.targetColor = EditorUtils.colorAtPointInCanvas(this.context, this.mousePosition);
    }
    return this.targetColor;
  }

  initMouseHandler(): void {
    this.handleClick = () => {
      EditorUtils.viewToCanvas(this.editorService.view).then((ctx) => {
        this.context = ctx;
        this.setTargetColor();
        // todo
      });
    };
  }

  get replacementColor(): Color {
    return this.editorService.colorsService.primaryColor;
  }
}
