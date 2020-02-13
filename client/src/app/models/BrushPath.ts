import { Coordinate } from './Coordinate';
import { Path } from './Path';

export class BrushPath extends Path {
  svgFilters: SVGFilterElement[];

  constructor(c: Coordinate /*, filters: SVGFilterElement[]*/) {
    super(c);
    // this.svgFilters = filters;
  }

  changeFilter(id: number) {
    this._svgNode.setAttribute('filter', `url(#filter${id})`);
  }
}
