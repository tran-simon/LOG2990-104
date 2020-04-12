import { ContourType } from '@tool-properties/creator-tool-properties/contour-type.enum';
import { Color } from 'src/app/utils/color/color';
import { Coordinate } from 'src/app/utils/math/coordinate';

export abstract class BaseShape {
  // tslint:disable-next-line:typedef
  private static SHAPE_ID = 0;
  static readonly CSS_NONE: string = 'none';
  static readonly SVG_NAMESPACE_URL: string = 'http://www.w3.org/2000/svg';
  readonly svgNode: SVGElement;
  readonly id: number;
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
    this.svgNode = document.createElementNS(BaseShape.SVG_NAMESPACE_URL, type) as SVGElement;
    this.id = BaseShape.SHAPE_ID++;
    this.svgNode.id = `shape-${type}-${this.id}`;

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

  highlight(color: Color, thickness: number): void {
    const highlightNode = (node: SVGElement) => {
      const { strokeWidth } = node.style;
      if (!strokeWidth || +strokeWidth < thickness) {
        node.style.strokeWidth = thickness.toString();
      }

      node.style.stroke = color.rgbString;
      node.style.strokeOpacity = '1';
      node.childNodes.forEach(highlightNode);
    };

    highlightNode(this.svgNode);
  }
}
