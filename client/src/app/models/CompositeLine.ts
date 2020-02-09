import { BaseShape } from './BaseShape';
import { Coordinate } from './Coordinate';
import { Ellipse } from './Ellipse';
import { Line } from './Line';

export class CompositeLine extends BaseShape {
  lineArray: Line[] = [];
  junctionArray: Ellipse[] = [];

  constructor(initCoord: Coordinate = new Coordinate()) {
    super('g');

    this.lineArray.push(new Line(initCoord));
    this.junctionArray.push(new Ellipse(initCoord));
  }

  addPoint(c: Coordinate) {
    this.addLine(c);
    this.addJunction(c);
  }

  endLine(c: Coordinate) {
    this.addJunction(c);
  }

  updateCurrentCoord(c: Coordinate) {
    this.lineArray[this.lineArray.length - 1].endCoord = c;
  }

  addLine(c: Coordinate) {
    const line = new Line(c);
    this.lineArray.push(line);
    this.svgNode.appendChild(line.svgNode);
  }

  addJunction(c: Coordinate) {
    const junction = new Ellipse(c, 2);
    this.junctionArray.push(junction);
    this.svgNode.appendChild(junction.svgNode);
  }
}
