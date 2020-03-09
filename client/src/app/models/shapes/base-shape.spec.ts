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
    component.shapeProperties.strokeOpacity = 17;
    component.shapeProperties.strokeColor = Color.GREEN;
    component.shapeProperties.fillColor = Color.BLUE;
    component.updateProperties();
    const width = component.svgNode.style.strokeWidth as string;
    expect(parseInt(width, 10)).toEqual(component.shapeProperties.strokeWidth);
    expect(component.svgNode.style.strokeOpacity).toEqual(component.shapeProperties.strokeOpacity.toString());
    expect(component.svgNode.style.stroke).toEqual(component.shapeProperties.strokeColor.rgbString);
    expect(component.svgNode.style.fillOpacity).toEqual(component.shapeProperties.fillColor.a.toString());
    expect(component.svgNode.style.fill).toEqual(component.shapeProperties.fillColor.rgbString);
    expect(component.svgNode.style.visibility).toEqual(component.shapeProperties.visibility);
  });

  it('can get end', ()=>{
    const end = new Coordinate(10, 10);
    expect(component.end).toEqual(end);
  })
});
