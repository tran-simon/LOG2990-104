import { ContourType } from 'src/app/models/tool-properties/contour-type.enum';
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
  contourType: ContourType;

  get svgNode(): SVGElement {
    return this._svgNode;
  }

  abstract get origin(): Coordinate;
  abstract set origin(c: Coordinate);

  get width(): number {
    return 0;
  }
  get height(): number {
    return 0;
  }

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
    this.contourType = ContourType.FILLED_CONTOUR;

    this.updateProperties();
  }

  updateProperties(): void {
    const hasStroke = this.contourType !== ContourType.FILLED;
    const hasFill = this.contourType !== ContourType.CONTOUR;

    this._svgNode.style.strokeWidth = this.strokeWidth.toString();
    this._svgNode.style.strokeOpacity = this.secondaryColor.a.toString();
    this._svgNode.style.fillOpacity = this.primaryColor.a.toString();

    this._svgNode.style.stroke = hasStroke ? this.secondaryColor.rgbString : BaseShape.NO_STYLE;
    this._svgNode.style.fill = hasFill ? this.primaryColor.rgbString : BaseShape.NO_STYLE;
  }
}
