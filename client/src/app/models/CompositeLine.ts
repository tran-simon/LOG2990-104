import { Color } from '../utils/color/color';
import { BaseShape } from './BaseShape';
import { Coordinate } from './Coordinate';
import { Ellipse } from './Ellipse';
import { Line } from './Line';

export class CompositeLine extends BaseShape {
  readonly MAX_FINAL_SNAP_DISTANCE = 3;

  lineArray: Line[];
  junctionArray: Ellipse[];

  get currentLine(): Line {
    return this.lineArray[this.lineArray.length - 1];
  }
  get currentJunction(): Ellipse {
    return this.junctionArray[this.junctionArray.length - 1];
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

    this.lineArray = [];
    this.junctionArray = [];

    this.addPoint(initCoord);
  }

  updateProperties() {
    if (this.lineArray) {
      this.lineArray.forEach((line) => {
        line.properties.strokeColor = this.properties.strokeColor;
        line.properties.strokeOpacity = this.properties.strokeColor.a;
        line.properties.strokeWidth = this.properties.strokeWidth;
        line.updateProperties();
      });
    }
    if (this.junctionArray) {
      this.junctionArray.forEach((junction) => {
        junction.properties.fillColor = this.properties.fillColor;
        junction.properties.strokeOpacity = this.properties.fillColor.a;
        junction.properties.strokeWidth = 0;
        junction.radiusX = this.properties.thickness;
        junction.radiusY = this.properties.thickness;
        junction.updateProperties();
      });
    }
  }

  addPoint(c: Coordinate) {
    this.addLine(c);
    this.addJunction(c);
    this.updateProperties();
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

    if (Coordinate.maxXYDistance(c, this.lineArray[0].startCoord) < this.MAX_FINAL_SNAP_DISTANCE) {
      this.updateCurrentCoord(this.lineArray[0].startCoord);
    } else {
      this.addJunction(this.currentLine.endCoord);
      this.updateProperties();
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
}
