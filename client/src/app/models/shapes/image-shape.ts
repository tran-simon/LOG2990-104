import { BaseShape } from '@models/shapes/base-shape';
import { Coordinate } from '@utils/math/coordinate';

/**
 * Based on http://www.graphicalweb.org/2010/papers/62-From_SVG_to_Canvas_and_Back/#canvas_to_svg
 */
export class ImageShape extends BaseShape {
  static readonly XLINK_NAMESPACE_URL: string = 'http://www.w3.org/1999/xlink';
  private readonly _width: number;
  private readonly _height: number;

  get origin(): Coordinate {
    return new Coordinate();
  }

  get height(): number {
    return this._height;
  }

  get width(): number {
    return this._width;
  }

  constructor(imageUrl: string, width: number, height: number) {
    super('image');
    this._width = width;
    this._height = height;
    this.svgNode.setAttributeNS(ImageShape.XLINK_NAMESPACE_URL, 'xlink:href', imageUrl);
  }

  static fromCanvas(canvas: HTMLCanvasElement): ImageShape {
    const imgDataUrl: string = canvas.toDataURL('image/png');
    return new ImageShape(imgDataUrl, canvas.width, canvas.height);
  }
}
