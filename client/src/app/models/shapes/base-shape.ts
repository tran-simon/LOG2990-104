import { ContourType } from 'src/app/models/tool-properties/contour-type.enum';
import { Color } from 'src/app/utils/color/color';
import { Coordinate } from 'src/app/utils/math/coordinate';

export abstract class BaseShape {
  static readonly CSS_NONE: string = 'none';
  readonly svgNode: SVGElement;
  private _offset: Coordinate;

  thickness: number;
  strokeWidth: number;
  secondaryColor: Color;
  primaryColor: Color;
  contourType: ContourType;

  abstract get origin(): Coordinate;
  abstract set origin(c: Coordinate);

  abstract get width(): number;
  abstract get height(): number;

  get offset(): Coordinate {
    return this._offset;
  }

  set offset(c: Coordinate) {
    this._offset = c;
    this.applyTransform();
  }

  get center(): Coordinate {
    return new Coordinate(this.origin.x + this.width / 2, this.origin.y + this.height / 2);
  }

  set center(c: Coordinate) {
    this.origin = new Coordinate(c.x - this.width / 2, c.y - this.height / 2);
  }

  get end(): Coordinate {
    return Coordinate.add(this.origin, new Coordinate(this.width, this.height));
  }

  constructor(type: string) {
    this.svgNode = document.createElementNS('http://www.w3.org/2000/svg', type);
    this._offset = new Coordinate();
    this.thickness = 1;
    this.strokeWidth = 1;
    this.secondaryColor = Color.BLACK;
    this.primaryColor = Color.WHITE;
    this.contourType = ContourType.FILLED_CONTOUR;

    this.updateProperties();
  }

  private applyTransform(): void {
    this.svgNode.setAttribute('transform', 'translate(' + this.offset.x + ' ' + this.offset.y + ')');
  }

  updateProperties(): void {
    const hasStroke = this.contourType !== ContourType.FILLED;
    const hasFill = this.contourType !== ContourType.CONTOUR;

    this.svgNode.style.strokeWidth = this.strokeWidth.toString();
    this.svgNode.style.strokeOpacity = this.secondaryColor.a.toString();
    this.svgNode.style.fillOpacity = this.primaryColor.a.toString();

    this.svgNode.style.stroke = hasStroke ? this.secondaryColor.rgbString : BaseShape.CSS_NONE;
    this.svgNode.style.fill = hasFill ? this.primaryColor.rgbString : BaseShape.CSS_NONE;
  }
}
