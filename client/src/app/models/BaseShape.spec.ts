import { Color } from '../utils/color/color';
import { BaseShape } from './BaseShape';
import { Coordinate } from './Coordinate';

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
  it('should update propreties', () => {
    component.properties.strokeWidth = 8;
    component.properties.strokeOpacity = 17;
    component.properties.strokeColor = Color.GREEN;
    component.properties.fillColor = Color.BLUE;
    component.updateProperties();
    const sK: boolean = component.svgNode.style.strokeWidth === component.properties.strokeWidth.toString();
    const sO: boolean = component.svgNode.style.strokeOpacity === component.properties.strokeOpacity.toString();
    const s: boolean = component.svgNode.style.stroke === component.properties.strokeColor.rgbString;
    const fO: boolean = component.svgNode.style.fillOpacity === component.properties.fillColor.a.toString();
    const f: boolean = component.svgNode.style.fill === component.properties.fillColor.rgbString;
    const v: boolean = component.svgNode.style.visibility === component.properties.visibility;
    expect(sK).toEqual(true);
    expect(sO).toEqual(true);
    expect(s).toEqual(true);
    expect(fO).toEqual(true);
    expect(f).toEqual(true);
    expect(v).toEqual(true);
  });
});
