import { Color } from '../utils/color/color';
import { BaseShape } from './BaseShape';
import { Coordinate } from './Coordinate';
import { Ellipse } from './Ellipse';
import { Line } from './Line';

export class CompositeLine extends BaseShape {
  readonly MAX_FINAL_SNAP_DISTANCE = 3;

  lineArray: Line[] = [];
  junctionArray: Ellipse[] = [];

  get currentLine(): Line {
    return this.lineArray[this.lineArray.length - 1];
  }

  get origin(): Coordinate {
    return this.lineArray[0].startCoord;
  }

  set origin(c: Coordinate) {
    this._origin = c;
    this.lineArray[0].startCoord = c;
  }

  constructor(initCoord: Coordinate = new Coordinate()) {
    super('g');
    this.addPoint(initCoord);
  }

  addPoint(c: Coordinate) {
    this.addLine(c);
    this.addJunction(c);
  }

  confirmPoint() {
    this.addPoint(this.currentLine.endCoord);
  }

  removeLastPoint(): boolean {
    if (this.lineArray.length > 1) {
      const lastLine = this.lineArray.pop();
      const lastJunction = this.junctionArray.pop();

      if (lastLine && lastJunction) {
        this.lineArray[this.lineArray.length - 1].endCoord = lastLine.endCoord;
        this.svgNode.removeChild(lastLine.svgNode);
        this.svgNode.removeChild(lastJunction.svgNode);
        return true;
      }
    }
    return false;
  }

  endLine(c: Coordinate) {
    this.removeLastPoint(); // todo - add double click timeout to avoid deleting shapes
    this.removeLastPoint();

    if (c.maxXYDistance(this.lineArray[0].startCoord) < this.MAX_FINAL_SNAP_DISTANCE) {
      this.updateCurrentCoord(this.lineArray[0].startCoord);
    } else {
      this.addJunction(this.currentLine.endCoord);
    }
  }

  updateCurrentCoord(c: Coordinate) {
    this.currentLine.endCoord = c;
  }

  addLine(c: Coordinate) {
    const line = new Line(c);
    this.lineArray.push(line);
    this.svgNode.appendChild(line.svgNode);
  }

  addJunction(c: Coordinate) {
    const junction = new Ellipse(c, 2); // todo - use editor properties
    junction.properties.fillColor = Color.BLACK;
    junction.updateProperties();

    this.junctionArray.push(junction);
    this.svgNode.appendChild(junction.svgNode);
  }

  redrawSvg() {
    // unused, could be useful later on
    this.svgNode.innerHTML = '';
    this.lineArray.forEach((line) => {
      this.svgNode.appendChild(line.svgNode);
    });
    this.junctionArray.forEach((junction) => {
      this.svgNode.appendChild(junction.svgNode);
    });
  }
}
