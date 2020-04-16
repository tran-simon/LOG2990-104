import { BaseShape } from 'src/app/models/shapes/base-shape';
import { Ellipse } from 'src/app/models/shapes/ellipse';
import { Line } from 'src/app/models/shapes/line';
import { Coordinate } from 'src/app/utils/math/coordinate';

export class CompositeLine extends BaseShape {
  static readonly MAX_FINAL_SNAP_DISTANCE: number = 3;

  lineArray: Line[];
  junctionArray: Ellipse[];
  // todo: copy for CompositeLine
  get copy(): CompositeLine {
    const copy = new CompositeLine(this.junctionArray[0].center);
    this.cloneProperties(copy);
    copy.updateProperties();
    return copy;
  }

  cloneProperties(shape: CompositeLine): void {
    super.cloneProperties(shape);
    this.lineArray.forEach((line: Line) => {
      const lineCopy = line.copy;
      shape.lineArray.push(lineCopy);
      shape.svgNode.appendChild(lineCopy.svgNode);
    });
    this.junctionArray.forEach((junction: Ellipse) => {
      const junctionCopy = junction.copy;
      shape.junctionArray.push(junctionCopy);
      shape.svgNode.appendChild(junctionCopy.svgNode);
    });
  }

  get currentLine(): Line {
    return this.lineArray[this.lineArray.length - 1];
  }
  get currentJunction(): Ellipse {
    return this.junctionArray[this.junctionArray.length - 1];
  }

  get origin(): Coordinate {
    return Coordinate.minArrayXYCoord(this.junctionArray.map((shape) => shape.origin));
  }

  set origin(c: Coordinate) {
    const delta = Coordinate.substract(c, this.origin);
    const shapes: BaseShape[] = this.lineArray as BaseShape[];
    shapes.concat(this.junctionArray as BaseShape[]).forEach((shape) => {
      shape.origin = Coordinate.add(shape.origin, delta);
    });
    this.applyTransform();
  }

  get width(): number {
    return Coordinate.maxArrayXYCoord(this.junctionArray.map((shape) => shape.end)).x - this.origin.x;
  }

  get height(): number {
    return Coordinate.maxArrayXYCoord(this.junctionArray.map((shape) => shape.end)).y - this.origin.y;
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
        line.secondaryColor = this.primaryColor;
        line.strokeWidth = this.strokeWidth;
        line.updateProperties();
      });
    }
    if (this.junctionArray) {
      this.junctionArray.forEach((junction) => {
        const center: Coordinate = Coordinate.copy(junction.center);
        junction.primaryColor = this.secondaryColor;
        junction.strokeWidth = 0;
        junction.radiusX = this.thickness;
        junction.radiusY = this.thickness;
        junction.center = center;
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
    this.removeLastPoint();
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
    const junction = new Ellipse(c);

    this.junctionArray.push(junction);
    this.svgNode.appendChild(junction.svgNode);
  }
}
