import { BaseShape } from 'src/app/models/shapes/base-shape';
import { Coordinate } from 'src/app/utils/math/coordinate';

export class Line extends BaseShape {
  private _startCoord: Coordinate;
  private _endCoord: Coordinate;

  get startCoord(): Coordinate {
    return this._startCoord;
  }

  set startCoord(c: Coordinate) {
    this._startCoord = c;
    this.svgNode.setAttribute('x1', this._startCoord.x.toString());
    this.svgNode.setAttribute('y1', this._startCoord.y.toString());
  }

  get endCoord(): Coordinate {
    return this._endCoord;
  }

  set endCoord(c: Coordinate) {
    this._endCoord = c;
    this.svgNode.setAttribute('x2', this._endCoord.x.toString());
    this.svgNode.setAttribute('y2', this._endCoord.y.toString());
  }

  get origin(): Coordinate {
    return this._origin;
  }

  set origin(c: Coordinate) {
    this._origin = c;
  }

  get width() {
    return 0; // todo
  }

  get height() {
    return 0; // todo
  }

  get center(): Coordinate {
    return new Coordinate((this._startCoord.x + this._endCoord.x) / 2, (this._startCoord.y + this._endCoord.y) / 2);
  }

  constructor(startCoord: Coordinate = new Coordinate(), endCoord: Coordinate = startCoord) {
    super('line');
    this.startCoord = startCoord;
    this.endCoord = endCoord;
  }
}
