import { BaseShape } from 'src/app/models/shapes/base-shape';
import { Ellipse } from 'src/app/models/shapes/ellipse';
import { Line } from 'src/app/models/shapes/line';
import { Color } from 'src/app/utils/color/color';
import { Coordinate } from 'src/app/utils/math/coordinate';

export class CompositeLine extends BaseShape {
  static readonly MAX_FINAL_SNAP_DISTANCE: number = 3;

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

  get width(): number {
    return 0; // todo
  }

  get height(): number {
    return 0; // todo
  }

  constructor(initCoord: Coordinate = new Coordinate()) {
    super('g');

    this.lineArray = [];
    this.junctionArray = [];

    this.addPoint(initCoord);
  }

  updateProperties(): void {
    if (this.lineArray) {
      this.lineArray.forEach((line) => {
        line.shapeProperties.secondaryColor = this.shapeProperties.primaryColor;
        line.shapeProperties.strokeWidth = this.shapeProperties.strokeWidth;
        line.updateProperties();
      });
    }
    if (this.junctionArray) {
      this.junctionArray.forEach((junction) => {
        junction.shapeProperties.primaryColor = this.shapeProperties.secondaryColor;
        junction.shapeProperties.strokeWidth = 0;
        junction.radiusX = this.shapeProperties.thickness;
        junction.radiusY = this.shapeProperties.thickness;
        junction.updateProperties();
      });
    }
  }

  addPoint(c: Coordinate): void {
    this.addLine(c);
    this.addJunction(c);
    this.updateProperties();
  }

  confirmPoint(): void {
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

  endLine(c: Coordinate): void {
    this.removeLastPoint(); // todo - add double click timeout to avoid deleting shapes
    this.removeLastPoint();

    const shouldClose = Coordinate.maxXYDistance(c, this.lineArray[0].startCoord) < CompositeLine.MAX_FINAL_SNAP_DISTANCE;
    if (shouldClose) {
      this.updateCurrentCoord(this.lineArray[0].startCoord);
    } else {
      this.addJunction(this.currentLine.endCoord);
      this.updateProperties();
    }
  }

  updateCurrentCoord(c: Coordinate): void {
    this.currentLine.endCoord = c;
  }

  addLine(c: Coordinate): void {
    const line = new Line(c);
    this.lineArray.push(line);
    this.svgNode.appendChild(line.svgNode);
  }

  addJunction(c: Coordinate): void {
    const junction = new Ellipse(c, 2); // todo - use editor properties
    junction.shapeProperties.primaryColor = Color.BLACK;
    junction.updateProperties();

    this.junctionArray.push(junction);
    this.svgNode.appendChild(junction.svgNode);
  }
}
