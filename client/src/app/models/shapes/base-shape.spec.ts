/* tslint:disable:no-magic-numbers */
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
    component.shapeProperties.strokeWidth = 8;
    component.shapeProperties.secondaryColor = Color.GREEN;
    component.shapeProperties.primaryColor = Color.BLUE;
    component.updateProperties();
    const width = component.svgNode.style.strokeWidth as string;
    expect(parseInt(width, 10)).toEqual(component.shapeProperties.strokeWidth);
    expect(component.svgNode.style.strokeOpacity).toEqual(component.shapeProperties.secondaryColor.a.toString());
    expect(component.svgNode.style.stroke).toEqual(component.shapeProperties.secondaryColor.rgbString);
    expect(component.svgNode.style.fillOpacity).toEqual(component.shapeProperties.primaryColor.a.toString());
    expect(component.svgNode.style.fill).toEqual(component.shapeProperties.primaryColor.rgbString);
  });

  it('can get end', () => {
    const end = new Coordinate(10, 10);
    expect(component.end).toEqual(end);
  });

  it('sets stroke to none if transparent', () => {
    component.shapeProperties.secondaryColor = Color.rgb255(255, 0, 0, 0);

    component.updateProperties();
    expect(component.svgNode.style.stroke).toEqual('none');
  });

  it('sets fill to none if transparent', () => {
    component.shapeProperties.primaryColor = Color.rgb255(100, 100, 100, 0);

    component.updateProperties();
    expect(component.svgNode.style.fill).toEqual('none');
  });
});
