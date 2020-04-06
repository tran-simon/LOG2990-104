import { DrawingSurfaceComponent } from '@components/pages/editor/drawing-surface/drawing-surface.component';
import { FilterType } from '@components/pages/export-modal/filter-type.enum';
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
