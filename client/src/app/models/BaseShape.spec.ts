import { BaseShape } from './BaseShape';
import { Coordinate } from './Coordinate';
//import { ShapeProperties } from './ShapeProperties';
import { Color } from '../utils/color/color';

//import Spy = jasmine.Spy;
//import createSpyObj = jasmine.createSpyObj;

describe('BaseShape', () => {
  class BaseShapeImpl extends BaseShape {
    get origin(): Coordinate {
      return this._origin;
    }
    set origin(c: Coordinate) {
      this._origin = c;
    }
  }
  const component: BaseShape = new BaseShapeImpl('rect');
  //let updatePropertiesSpy: Spy;
  beforeEach(() => {
    //updatePropertiesSpy = spyOn(component, 'updateProperties').and.callThrough();
  });
  it('should update propreties', () => {
    component.properties.strokeWidth = 8;
    component.properties.strokeOpacity = 17;
    component.properties.strokeColor = Color.GREEN;
    component.properties.fillColor = Color.BLUE;
    component.updateProperties();
    let sK: boolean = component.svgNode.style.strokeWidth === component.properties.strokeWidth.toString();
    let sO: boolean = component.svgNode.style.strokeOpacity === component.properties.strokeOpacity.toString();
    let s: boolean = component.svgNode.style.stroke === component.properties.strokeColor.rgbString;
    let fO: boolean = component.svgNode.style.fillOpacity === component.properties.fillColor.a.toString();
    let f: boolean = component.svgNode.style.fill === component.properties.fillColor.rgbString;
    let v: boolean = component.svgNode.style.visibility === component.properties.visibility;
    expect(sK).toEqual(true);
    expect(sO).toEqual(true);
    expect(s).toEqual(true);
    expect(fO).toEqual(true);
    expect(f).toEqual(true);
    expect(v).toEqual(true);
  });
});
