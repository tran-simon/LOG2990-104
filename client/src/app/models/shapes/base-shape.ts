import { ShapeProperties } from 'src/app/models/shape-properties';
import { Coordinate } from 'src/app/utils/math/coordinate';

export abstract class BaseShape {
  protected _origin: Coordinate;
  protected _svgNode: SVGElement;
  shapeProperties: ShapeProperties;

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

    this.shapeProperties = new ShapeProperties();

    this.updateProperties();
  }

  updateProperties(): void {
    this._svgNode.style.strokeWidth = this.shapeProperties.strokeWidth.toString();
    this._svgNode.style.strokeOpacity = this.shapeProperties.strokeOpacity.toString();
    this._svgNode.style.stroke = this.shapeProperties.strokeColor.rgbString;
    this._svgNode.style.fillOpacity = this.shapeProperties.fillColor.a.toString();
    this._svgNode.style.fill = this.shapeProperties.fillColor.rgbString;
    this._svgNode.style.visibility = this.shapeProperties.visibility;
  }
}
