import { BrushPath } from './BrushPath';
import { Coordinate } from './Coordinate';
describe('Path', () => {
  let brush: BrushPath;
  /// let coordZero = new Coordinate(0, 0);
  // let coord1 = new Coordinate(2, 2);
  //// let coord2 = new Coordinate(17, 8);
  // let coord3 = new Coordinate(3, 4);
  beforeEach(() => {
    brush = new BrushPath(new Coordinate());
  });
  it('Should change filter', () => {
    brush.changeFilter(3);
    expect(brush.svgNode.getAttribute('filter')).toEqual('url(#filter3)');
  });
});
