import { AddShapesCommand } from '@models/commands/shape-commands/add-shapes-command';
import { MaskedShape } from '@models/shapes/masked-shape';
import { EditorService } from '@services/editor.service';
import { FillToolProperties } from '@tool-properties/editor-tool-properties/fill-tool-properties';
import { ColorFillUtils, ColorGetter, ColorSetter } from '@tools/editing-tools/color-fill-tool/color-fill-utils';
import { Tool } from '@tools/tool';
import { Color } from '@utils/color/color';
import { EditorUtils } from '@utils/color/editor-utils';
import { Coordinate } from '@utils/math/coordinate';

export class ColorFillTool extends Tool {
  constructor(editorService: EditorService) {
    super(editorService);
    this.colorFillUtils = new ColorFillUtils();
    this.pointsToColorize = new Map();
    this.toolProperties = new FillToolProperties();
  }

  private colorFillUtils: ColorFillUtils;
  private colorData: Uint8ClampedArray | undefined;
  private readonly pointsToColorize: Map<string, Coordinate>;
  private replacementColor: Color;

  private minPoint?: Coordinate;
  private maxPoint?: Coordinate;

  toolProperties: FillToolProperties;

  initMouseHandler(): void {
    this.handleClick = () => {
      this.minPoint = undefined;
      this.maxPoint = undefined;
      this.editorService.loading = true;
      this.colorData = undefined;
      this.pointsToColorize.clear();
      const { width, height } = this.editorService.view;

      EditorUtils.viewToCanvas(this.editorService.view)
        .then((ctx) => {
          this.colorData = ctx.getImageData(0, 0, width, height).data;
          this.floodFill();
        })
        .finally(() => {
          this.applyShape();
          this.editorService.loading = false;
        });
    };
  }

  private applyShape(): void {
    const maskCanvas = document.createElement('CANVAS') as HTMLCanvasElement;
    if (this.minPoint && this.maxPoint) {
      maskCanvas.width = this.maxPoint.x - this.minPoint.x;
      maskCanvas.height = this.maxPoint.y - this.minPoint.y;
      const context = maskCanvas.getContext('2d') as CanvasRenderingContext2D;

      context.fillStyle = Color.WHITE.rgbString;
      this.pointsToColorize.forEach((point) => {
        const coord = Coordinate.subtract(point, this.minPoint as Coordinate);
        context.fillRect(coord.x, coord.y, 1, 1);
      });

      const maskedShape = MaskedShape.fromCanvas(maskCanvas, this.minPoint);
      maskedShape.primaryColor = this.replacementColor;
      maskedShape.updateProperties();
      this.editorService.commandReceiver.add(new AddShapesCommand(maskedShape, this.editorService));
    }
  }

  private floodFill(): void {
    const targetColor = this.getColor()(this.mousePosition);
    this.replacementColor = this.editorService.colorsService.primaryColor;

    if (targetColor) {
      this.colorFillUtils.getColor = this.getColor(this.pointsToColorize);
      this.colorFillUtils.setColor = this.setColor(this.pointsToColorize);
      this.colorFillUtils.floodFill(
        this.mousePosition,
        targetColor,
        this.replacementColor,
        this.toolProperties.tolerance.value / FillToolProperties.TOLERANCE_MAX,
      );
    }
  }

  private setColor(pointsToColorize: Map<string, Coordinate>): ColorSetter {
    return (point: Coordinate) => {
      pointsToColorize.set(point.toString(), point);
      this.minPoint = this.minPoint ? Coordinate.minXYCoord(this.minPoint, point) : point;
      this.maxPoint = this.maxPoint ? Coordinate.maxXYCoord(this.maxPoint, point) : point;
    };
  }

  private getColor(pointsToColorize?: Map<string, Coordinate>): ColorGetter {
    const { width, height } = this.editorService.view;
    return (point: Coordinate): Color | undefined => {
      const inBounds = point.inBounds(new Coordinate(width, height));
      const nodeNotSet = !pointsToColorize || !pointsToColorize.get(point.toString());
      return inBounds && nodeNotSet ? EditorUtils.colorAtPointFromUint8ClampedArray(this.colorData, point, width) : undefined;
    };
  }
}
