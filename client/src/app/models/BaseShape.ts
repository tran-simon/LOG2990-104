import { Coordinate } from './Coordinate';
import { ShapeProperties } from './ShapeProperties';

export abstract class BaseShape {
  protected _origin: Coordinate;
  protected _svgNode: SVGElement;

  properties: ShapeProperties;

  get svgNode(): SVGElement {
    return this._svgNode;
  }

  abstract get origin(): Coordinate;
  abstract set origin(c: Coordinate);

  constructor(type: string) {
    this._svgNode = document.createElementNS('http://www.w3.org/2000/svg', type);
    this.properties = new ShapeProperties();
    this._origin = new Coordinate();

    this.updateProperties();
  }

  updateProperties() {
    this._svgNode.style.strokeWidth = this.properties.strokeWidth.toString();
    this._svgNode.style.strokeOpacity = this.properties.strokeOpacity.toString();
    this._svgNode.style.stroke = this.properties.strokeColor.rgbString;
    this._svgNode.style.fillOpacity = this.properties.fillColor.a.toString();
    this._svgNode.style.fill = this.properties.fillColor.rgbString;
    this._svgNode.style.visibility = this.properties.visibility;
  }
}
