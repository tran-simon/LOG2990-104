import { DrawingSurfaceComponent } from '@components/pages/editor/drawing-surface/drawing-surface.component';
import { FilterType } from '@components/pages/export-modal/filter-type.enum';
import { BaseShape } from '@models/shapes/base-shape';
import { Color } from '@utils/color/color';
import { Coordinate } from '@utils/math/coordinate';

export class EditorUtils {
  static async colorAtPoint(view: DrawingSurfaceComponent, position: Coordinate): Promise<Color> {
    return EditorUtils.viewToCanvas(view).then(async (ctx) => {
      const color = EditorUtils.colorAtPointInCanvas(ctx, position);
      return new Promise<Color>((resolve) => {
        resolve(color);
      });
    });
  }

  static colorAtPointInCanvas(canvasContext: CanvasRenderingContext2D, point: Coordinate): Color {
    const colorData = canvasContext.getImageData(point.x, point.y, 1, 1).data;
    return Color.rgb255(colorData[0], colorData[1], colorData[2]);
  }

  /**
   * Based on http://www.graphicalweb.org/2010/papers/62-From_SVG_to_Canvas_and_Back/#canvas_to_svg
   */
  static canvasToSvg(canvas: HTMLCanvasElement): SVGImageElement {
    const imgDataUrl = canvas.toDataURL('image/png');

    const svgImage: SVGImageElement = document.createElementNS(BaseShape.SVG_NAMESPACE_URL, 'image') as SVGImageElement;

    svgImage.setAttributeNS(BaseShape.XLINK_NAMESPACE_URL, 'xlink:href', imgDataUrl);
    return svgImage;
  }

  static async viewToCanvas(view: DrawingSurfaceComponent, svg: SVGElement = view.svg): Promise<CanvasRenderingContext2D> {
    const image = new Image();
    const { width, height } = view;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.imageSmoothingEnabled = false;
    ctx.canvas.width = width;
    ctx.canvas.height = height;

    const xml = new XMLSerializer().serializeToString(svg);
    image.src = 'data:image/svg+xml;base64,' + btoa(xml);
    image.style.display = 'none';

    return new Promise((resolve) => {
      image.onload = () => {
        ctx.drawImage(image, 0, 0);
        resolve(ctx);
      };
    });
  }

  /**
   *  https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas
   */
  static colorAtPointFromUint8ClampedArray(data: Uint8ClampedArray, point: Coordinate, width: number): Color {
    const getColorIndicesForCoord = (x: number, y: number) => {
      const dataSize = 4;
      const rIndex = y * (width * dataSize) + x * dataSize;

      // tslint:disable-next-line:no-magic-numbers
      return [rIndex, rIndex + 1, rIndex + 2, rIndex + 3];
    };

    const indices = getColorIndicesForCoord(point.x, point.y);
    const r = data[indices[0]];
    const g = data[indices[1]];
    const b = data[indices[2]];
    return Color.rgb255(r, g, b);
  }

  static addFilter(surface: DrawingSurfaceComponent, filter: FilterType): void {
    switch (filter) {
      case FilterType.EMPTY:
        surface.svg.setAttribute('filter', 'none');
        break;
      case FilterType.BLACKWHITE:
        surface.svg.setAttribute('filter', 'grayscale(100%)');
        break;
      case FilterType.BLUR:
        surface.svg.setAttribute('filter', 'blur(5px)');
        break;
      case FilterType.INVERT:
        surface.svg.setAttribute('filter', 'invert(100%)');
        break;
      case FilterType.SATURATE:
        surface.svg.setAttribute('filter', 'saturate(200%)');
        break;
      case FilterType.SEPIA:
        surface.svg.setAttribute('filter', 'sepia(100%)');
        break;
    }
  }

  static removeFilter(surface: DrawingSurfaceComponent): void {
    surface.svg.removeAttribute('filter');
  }

  /**
   * Based on: https://stackoverflow.com/questions/3768565/drawing-an-svg-file-on-a-html5-canvas
   */
  static createDataURL(surface: DrawingSurfaceComponent): string {
    const xmlSerializer = new XMLSerializer();
    const svgString = xmlSerializer.serializeToString(surface.svg);
    return 'data:image/svg+xml,' + encodeURIComponent(svgString);
  }
}
