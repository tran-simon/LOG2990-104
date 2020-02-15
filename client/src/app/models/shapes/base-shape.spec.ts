import { BaseShape } from 'src/app/models/shapes/base-shape';
import { Color } from 'src/app/utils/color/color';
import { Coordinate } from 'src/app/utils/math/coordinate';

describe('BaseShape', () => {
  class BaseShapeImpl extends BaseShape {
    get origin(): Coordinate {
      return this._origin;
    }
    set origin(c: Coordinate) {
      this._origin = c;
    }
  }
  let component: BaseShape;
  beforeEach(() => {
    component = new BaseShapeImpl('rect');
  });
  it('should update properties', () => {
    component.properties.strokeWidth = 8;
    component.properties.strokeOpacity = 17;
    component.properties.strokeColor = Color.GREEN;
    component.properties.fillColor = Color.BLUE;
    component.updateProperties();
    const width = component.svgNode.style.strokeWidth as string;
    expect(parseInt(width, 10)).toEqual(component.properties.strokeWidth);
    expect(component.svgNode.style.strokeOpacity).toEqual(component.properties.strokeOpacity.toString());
    expect(component.svgNode.style.stroke).toEqual(component.properties.strokeColor.rgbString);
    expect(component.svgNode.style.fillOpacity).toEqual(component.properties.fillColor.a.toString());
    expect(component.svgNode.style.fill).toEqual(component.properties.fillColor.rgbString);
    expect(component.svgNode.style.visibility).toEqual(component.properties.visibility);
  });
});
