import { BaseShape } from '@models/shapes/base-shape';
import { Rectangle } from '@models/shapes/rectangle';
import { Color } from '@utils/color/color';
import { Coordinate } from '@utils/math/coordinate';

/**
 * Based on http://www.graphicalweb.org/2010/papers/62-From_SVG_to_Canvas_and_Back/#canvas_to_svg
 */
export class MaskedShape extends Rectangle {
  static readonly XLINK_NAMESPACE_URL: string = 'http://www.w3.org/1999/xlink';
  private readonly maskImage: SVGImageElement;
  private readonly mask: SVGMaskElement;

  constructor(origin: Coordinate, imageUrl: string, width: number, height: number) {
    super(origin, width, height);
    this.mask = document.createElementNS(MaskedShape.SVG_NAMESPACE_URL, 'mask') as SVGMaskElement;
    this.mask.id = `mask-${this.svgNode.id}`;

    this.maskImage = MaskedShape.svgImageFromDataUrl(imageUrl, origin);
    this.mask.appendChild(this.maskImage);

    const defs = document.getElementById('defs');
    if (defs) {
      defs.appendChild(this.mask);
    }

    this.strokeWidth = 0;
    this.width = width;
    this.height = height;
    this.svgNode.style.mask = `url(#${this.mask.id})`;
    this.updateProperties();
  }

  set origin(c: Coordinate) {
    super.origin = c;
    if (this.mask) {
      this.maskImage.setAttribute('x', c.x.toString());
      this.maskImage.setAttribute('y', c.y.toString());
    }
  }

  get origin(): Coordinate {
    return super.origin;
  }

  static svgImageFromDataUrl(imageUrl: string, position: Coordinate): SVGImageElement {
    const image = document.createElementNS(BaseShape.SVG_NAMESPACE_URL, 'image') as SVGImageElement;
    image.setAttributeNS(this.XLINK_NAMESPACE_URL, 'xlink:href', imageUrl);

    image.setAttribute('x', position.x.toString());
    image.setAttribute('y', position.y.toString());

    return image;
  }

  static fromCanvas(canvas: HTMLCanvasElement, point: Coordinate): MaskedShape {
    const imgDataUrl: string = canvas.toDataURL('image/png');
    return new MaskedShape(point, imgDataUrl, canvas.width, canvas.height);
  }

  highlight(color: Color, thickness: number): void {
    this.svgNode.style.fill = color.rgbString;
  }
}
