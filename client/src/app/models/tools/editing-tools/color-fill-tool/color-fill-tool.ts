import { CompositeParticle } from '@models/shapes/composite-particle';
import { EditorService } from '@services/editor.service';
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
  private colorData: Uint8ClampedArray;
  private pointsToColorize: Map<string, Coordinate>;

  constructor(editorService: EditorService) {
    super(editorService);
    this.colorFillUtils = new ColorFillUtils();
    this.pointsToColorize = new Map();
  }

  initMouseHandler(): void {
    this.handleClick = () => {
      this.editorService.loading = true;
      EditorUtils.viewToCanvas(this.editorService.view)
        .then((ctx) => {
          this.context = ctx;
          const { width, height } = this.editorService.view;
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
      const tolerance = 0; //todo
      this.pointsToColorize.clear();

      if (targetColor) {
        const shape = new CompositeParticle();
        shape.primaryColor = replacementColor;
        shape.updateProperties();

        this.editorService.addShapeToBuffer(shape);
        this.colorFillUtils.getColor = this.getColor(this.context);
        this.colorFillUtils.setColor = this.setColor();
        this.colorFillUtils.floodFillScanLine(this.mousePosition, targetColor, replacementColor, tolerance);

        this.pointsToColorize.forEach((coord) => {
          shape.addSingleParticle(coord);
        });

        shape.updateProperties();
        this.editorService.applyShapesBuffer();
      }
    }
  }

  private setColor(): ColorSetter {
    return (point: Coordinate) => {
      this.pointsToColorize.set(point.toString(), point);
    };
  }

  private getColor(context: CanvasRenderingContext2D): ColorGetter {
    const { width, height } = this.editorService.view;
    return (point: Coordinate): Color | undefined => {
      const inBounds = point.inBounds(new Coordinate(width, height));
      const nodeNotSet = !this.pointsToColorize.get(point.toString());
      if (inBounds && nodeNotSet && context) {
        /* https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas */
        const getColorIndicesForCoord = (x: number, y: number, width: number) => {
          const rIndex = y * (width * 4) + x * 4;
          return [rIndex, rIndex + 1, rIndex + 2, rIndex + 3];
        };

        const indices = getColorIndicesForCoord(point.x, point.y, width);
        const r = this.colorData[indices[0]];
        const g = this.colorData[indices[1]];
        const b = this.colorData[indices[2]];
        return Color.rgb255(r, g, b);
      }
      return undefined;
    };
  }
}
