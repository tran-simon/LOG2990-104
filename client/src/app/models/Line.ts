import { BaseShape } from './BaseShape';
import { Coordinate } from './Coordinate';

export class Line extends BaseShape {
    constructor() {
        super();
    }

    svgNode: SVGElement = document.createElementNS('http://www.w3.org/2000/svg', 'line');

    get center(): Coordinate {
        if (!this.startCoord || !this.endCoord) {
            return this.origin;
        } else {
            return new Coordinate((this.startCoord.x + this.endCoord.x) / 2, (this.startCoord.y + this.endCoord.y) / 2);
        }
    }

    svg(): SVGElement {
        this.svgNode.setAttribute('x1', this.startCoord.x.toString());
        this.svgNode.setAttribute('y1', this.startCoord.y.toString());
        this.svgNode.setAttribute('x2', this.endCoord.x.toString());
        this.svgNode.setAttribute('y2', this.endCoord.y.toString());

        this.svgNode.setAttribute('style', 'stroke:black;stroke-width:2');

        return this.svgNode;
    }
}
