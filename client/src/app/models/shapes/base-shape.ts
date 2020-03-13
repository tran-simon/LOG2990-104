import { Color } from 'src/app/utils/color/color';
import { Coordinate } from 'src/app/utils/math/coordinate';

export abstract class BaseShape {
  static readonly NO_STYLE: string = 'none';
  protected _origin: Coordinate;
  protected _svgNode: SVGElement;

  thickness: number;
  strokeWidth: number;
  secondaryColor: Color;
  primaryColor: Color;

  get svgNode(): SVGElement {
    return this._svgNode;
  }

  abstract get origin(): Coordinate;
  abstract set origin(c: Coordinate);

  abstract get width(): number;
  abstract get height(): number;

  get end(): Coordinate {
    return Coordinate.add(this.origin, new Coordinate(this.width, this.height));
  }

  constructor(type: string) {
    this._svgNode = document.createElementNS('http://www.w3.org/2000/svg', type);
    this._origin = new Coordinate();
    this.thickness = 1;
    this.strokeWidth = 1;
    this.secondaryColor = Color.BLACK;
    this.primaryColor = Color.WHITE;

    this.updateProperties();
  }

  updateProperties(): void {
    const strokeAlpha = this.secondaryColor.a;
    const fillAlpha = this.primaryColor.a;

    this._svgNode.style.strokeWidth = this.strokeWidth.toString();
    this._svgNode.style.strokeOpacity = strokeAlpha.toString();
    this._svgNode.style.fillOpacity = fillAlpha.toString();

    this._svgNode.style.stroke = strokeAlpha ? this.secondaryColor.rgbString : BaseShape.NO_STYLE;
    this._svgNode.style.fill = fillAlpha ? this.primaryColor.rgbString : BaseShape.NO_STYLE;
  }
}
