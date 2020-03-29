import { Rectangle } from 'src/app/models/shapes/rectangle';
import { ContourType } from 'src/app/models/tool-properties/creator-tool-properties/contour-type.enum';
import { Color } from 'src/app/utils/color/color';
import { Coordinate } from 'src/app/utils/math/coordinate';

export abstract class BaseShape {
  // tslint:disable-next-line:typedef
  static id = 0;
  static readonly NO_STYLE: string = 'none';
  protected _origin: Coordinate;
  readonly svgNode: SVGElement;
  readonly id: string;
  readonly bboxes: Rectangle[];

  thickness: number;
  strokeWidth: number;
  secondaryColor: Color;
  primaryColor: Color;
  contourType: ContourType;

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
    this.svgNode = document.createElementNS('http://www.w3.org/2000/svg', type);
    this.id = `BaseShape-${BaseShape.id++}-${type}`;// todo: needed?
    this.svgNode.id = this.id;

    this._origin = new Coordinate();
    this.thickness = 1;
    this.strokeWidth = 1;
    this.secondaryColor = Color.BLACK;
    this.primaryColor = Color.WHITE;
    this.contourType = ContourType.FILLED_CONTOUR;
    this.bboxes = [];

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
