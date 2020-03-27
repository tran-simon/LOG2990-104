import { ContourType } from 'src/app/models/tool-properties/contour-type.enum';
import { Color } from 'src/app/utils/color/color';
import { Coordinate } from 'src/app/utils/math/coordinate';

export abstract class BaseShape {
  static readonly NO_STYLE: string = 'none';
  readonly svgNode: SVGElement;

  thickness: number;
  strokeWidth: number;
  secondaryColor: Color;
  primaryColor: Color;
  contourType: ContourType;

  abstract get origin(): Coordinate;
  abstract set origin(c: Coordinate);

  abstract get width(): number;
  abstract get height(): number;

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

    this.svgNode.style.strokeWidth = this.strokeWidth.toString();
    this.svgNode.style.strokeOpacity = this.secondaryColor.a.toString();
    this.svgNode.style.fillOpacity = this.primaryColor.a.toString();

    this.svgNode.style.stroke = hasStroke ? this.secondaryColor.rgbString : BaseShape.NO_STYLE;
    this.svgNode.style.fill = hasFill ? this.primaryColor.rgbString : BaseShape.NO_STYLE;
  }
}
