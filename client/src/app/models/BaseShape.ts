import { Coordinate } from './Coordinate';
import { ShapeProperties } from './ShapeProperties';

export abstract class BaseShape {
  private _properties: ShapeProperties;
  protected _origin: Coordinate;
  protected _svgNode: SVGElement;

  get properties(): ShapeProperties {
    return this._properties;
  }

  set properties(p: ShapeProperties) {
    this._properties = p;
  }

  get svgNode(): SVGElement {
    return this._svgNode;
  }

  get origin(): Coordinate {
    return this._origin;
  }

  constructor(type: string) {
    this._svgNode = document.createElementNS('http://www.w3.org/2000/svg', type);
    this._properties = new ShapeProperties();
    this._origin = new Coordinate();

    this.updateProperties();
  }

  updateProperties() {
    this._svgNode.style.strokeWidth = this._properties.strokeWidth.toString();
    this._svgNode.style.strokeOpacity = this._properties.strokeOpacity.toString();
    this._svgNode.style.stroke = this._properties.strokeColor.rgbString;
    this._svgNode.style.fillOpacity = this._properties.fillOpacity.toString();
    this._svgNode.style.fill = this._properties.fillColor.rgbString;
    this._svgNode.style.visibility = this._properties.visibility;
  }
}
