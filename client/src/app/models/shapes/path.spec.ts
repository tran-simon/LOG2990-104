/* tslint:disable:no-magic-numbers */
import { Path } from 'src/app/models/shapes/path';
import { Coordinate } from 'src/app/utils/math/coordinate';

describe('Path', () => {
  let path: Path;
  /// let coordZero = new Coordinate(0, 0);
  const coord1 = new Coordinate(2, 2);
  // let coord2 = new Coordinate(17, 8);
  const coord3 = new Coordinate(3, 4);
  beforeEach(() => {
    path = new Path(new Coordinate());
  });
  it('Should set trace to given node', () => {
    path.trace = 'M ' + 12 + ' ' + 13 + ' L' + ' ' + 2 + ' ' + 4;
    expect(path.trace).toEqual('M 12 13 L 2 4');
    expect(path.svgNode.getAttribute('d')).toEqual('M 12 13 L 2 4');
  });
  it('Should set origin to given coordinate', () => {
    path.origin = coord1;
    expect(path.origin.x).toEqual(2);
    expect(path.origin.y).toEqual(2);
  });
  it('Should add the point to trace', () => {
    path.trace = 'M ' + 1 + ' ' + 2;
    path.addPoint(coord3);
    expect(path.trace).toEqual('M 1 2 L 3 4');
  });
  it('Should update priorities', () => {
    path.updateProperties();
    expect(path.svgNode.style.fill).toEqual('none');
    expect(path.svgNode.style.strokeLinecap).toEqual('round');
    expect(path.svgNode.style.strokeLinejoin).toEqual('round');
  });
});
