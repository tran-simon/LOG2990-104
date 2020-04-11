import { EditorService } from '@services/editor.service';
import { FillToolProperties } from '@tool-properties/editor-tool-properties/fill-tool-properties';
import { ColorFillUtils, ColorGetter, ColorSetter } from '@tools/editing-tools/color-fill-tool/color-fill-utils';
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
  private colorFillUtils: ColorFillUtils;
  private colorData: Uint8ClampedArray | undefined;
  private pointsToColorize: Map<string, Coordinate>;

  private drawingCanvas: HTMLCanvasElement;

  toolProperties: FillToolProperties;

  constructor(editorService: EditorService) {
    super(editorService);
    this.colorFillUtils = new ColorFillUtils();
    this.pointsToColorize = new Map();
    this.toolProperties = new FillToolProperties();
  }

  initMouseHandler(): void {
    this.handleClick = () => {
      this.editorService.loading = true;
      this.context = undefined;
      this.colorData = undefined;
      this.pointsToColorize.clear();
      this.drawingCanvas = document.createElement('CANVAS') as HTMLCanvasElement;
      const { width, height } = this.editorService.view;
      this.drawingCanvas.width = width;
      this.drawingCanvas.height = height;

      EditorUtils.viewToCanvas(this.editorService.view)
        .then((ctx) => {
          this.context = ctx;
          this.colorData = ctx.getImageData(0, 0, width, height).data;
          this.floodFill();
        })
        .finally(() => (this.editorService.loading = false));
    };
  }

  private floodFill(): void {
    if (this.context) {
      const targetColor = this.getColor(this.context)(this.mousePosition);
      const replacementColor = this.editorService.colorsService.primaryColor;

      this.drawingContext.fillStyle = replacementColor.rgbString;

      if (targetColor) {
        this.colorFillUtils.getColor = this.getColor(this.context);
        this.colorFillUtils.setColor = this.setColor(this.drawingContext);
        this.colorFillUtils.floodFill(
          this.mousePosition,
          targetColor,
          replacementColor,
          this.toolProperties.tolerance.value / FillToolProperties.TOLERANCE_MAX,
        );

        this.editorService.view.svg.appendChild(EditorUtils.canvasToSvg(this.drawingCanvas));
      }
    }
  }

  private setColor(drawingContext: CanvasRenderingContext2D): ColorSetter {
    return (point: Coordinate) => {
      drawingContext.fillRect(point.x, point.y, 1, 1);
      this.pointsToColorize.set(point.toString(), point);
    };
  }

  private getColor(context: CanvasRenderingContext2D): ColorGetter {
    const { width, height } = this.editorService.view;
    return (point: Coordinate): Color | undefined => {
      const inBounds = point.inBounds(new Coordinate(width, height));
      const nodeNotSet = !this.pointsToColorize.get(point.toString());
      return inBounds && nodeNotSet && context ? EditorUtils.colorAtPointFromUint8ClampedArray(this.colorData, point, width) : undefined;
    };
  }

  private get drawingContext(): CanvasRenderingContext2D {
    return this.drawingCanvas.getContext('2d') as CanvasRenderingContext2D;
  }
}
