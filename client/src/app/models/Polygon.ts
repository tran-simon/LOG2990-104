import { BaseShape } from './BaseShape';
import { Coordinate } from './Coordinate';

export const MIN_POLY_EDGE = 3;
export const MAX_POLY_EDGE = 12;

export class Polygon extends BaseShape {
  private nbEdge: number;

  get NbEdge(): number {
    return this.nbEdge;
  }

  set NbEdge(nbEdge: number) {
    if (nbEdge < MIN_POLY_EDGE || !nbEdge) {
      this.nbEdge = MIN_POLY_EDGE;
    } else if (nbEdge > MAX_POLY_EDGE) {
      this.nbEdge = MAX_POLY_EDGE;
    } else {
      this.nbEdge = nbEdge;
    }
  }

  get origin(): Coordinate {
    return this._origin;
  }

  set origin(c: Coordinate) {
    this._origin = c;
  }

  constructor(nbEdge: number = MIN_POLY_EDGE) {
    super('polygon');
    this.NbEdge = nbEdge;
  }
}
