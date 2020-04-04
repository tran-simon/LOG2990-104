/* tslint:disable:no-magic-numbers */
import { BaseShape } from 'src/app/models/shapes/base-shape';
import { Color } from 'src/app/utils/color/color';
import { Coordinate } from 'src/app/utils/math/coordinate';

describe('BaseShape', () => {
  class BaseShapeImpl extends BaseShape {
    get origin(): Coordinate {
      return new Coordinate();
    }
    set origin(c: Coordinate) {
      return;
    }
    get height(): number {
      return 10;
    }
    get width(): number {
      return 10;
    }
  }
  let component: BaseShape;
  beforeEach(() => {
    component = new BaseShapeImpl('rect');
  });
  it('should update properties', () => {
    component.strokeWidth = 8;
    component.secondaryColor = Color.GREEN;
    component.primaryColor = Color.BLUE;
    component.updateProperties();
    const width = component.svgNode.style.strokeWidth as string;
    expect(parseInt(width, 10)).toEqual(component.strokeWidth);
    expect(component.svgNode.style.strokeOpacity).toEqual(component.secondaryColor.a.toString());
    expect(component.svgNode.style.stroke).toEqual(component.secondaryColor.rgbString);
    expect(component.svgNode.style.fillOpacity).toEqual(component.primaryColor.a.toString());
    expect(component.svgNode.style.fill).toEqual(component.primaryColor.rgbString);
  });

  it('can get end', () => {
    const end = new Coordinate(10, 10);
    expect(component.end).toEqual(end);
  });
});
