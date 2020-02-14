/*tslint:disable:no-string-literal*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { Coordinate } from 'src/app/models/Coordinate';
import { RectangleContourType, RectangleToolProperties } from 'src/app/models/ToolProperties/RectangleToolProperties';
import { Color } from 'src/app/utils/color/color';
import { RectangleTool } from './RectangleTool';

describe('ShapeTool', () => {
  let rectangleTool: RectangleTool;
  let fixture: ComponentFixture<DrawingSurfaceComponent>;
  let surface: DrawingSurfaceComponent;

  const properties = new RectangleToolProperties(Color.RED, Color.GREEN); // todo - include default in constructor

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DrawingSurfaceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingSurfaceComponent);
    fixture.detectChanges();
    surface = fixture.componentInstance;
    rectangleTool = new RectangleTool(surface);
  });

  it('can initialize new Rectangle', () => {
    rectangleTool.toolProperties = properties;
    rectangleTool.initShape(new Coordinate(100, 100));
    expect(rectangleTool.shape.origin).toEqual(new Coordinate(100, 100));
    expect(surface.svg.nativeElement.querySelector('rect')).toBeTruthy();
  });

  it('can resize Rectangle', () => {
    rectangleTool.toolProperties = properties;
    rectangleTool.initShape(new Coordinate(100, 100));
    rectangleTool.resizeShape(new Coordinate(75, 50));
    expect(rectangleTool.shape.width).toEqual(75);
    expect(rectangleTool.shape.height).toEqual(50);
  });

  it('can resize and reposition Rectangle', () => {
    rectangleTool.toolProperties = properties;
    rectangleTool.initShape(new Coordinate(100, 100));
    rectangleTool.resizeShape(new Coordinate(75, 50), new Coordinate(125, 125));
    expect(rectangleTool.shape.origin).toEqual(new Coordinate(125, 125));
    expect(rectangleTool.shape.width).toEqual(75);
    expect(rectangleTool.shape.height).toEqual(50);
  });

  it('can draw Rectangle contour and fill', () => {
    properties.contourType = RectangleContourType.FILLEDCONTOUR;
    rectangleTool.toolProperties = properties;
    rectangleTool.initShape(new Coordinate(100, 100));
    const style = rectangleTool.shape.svgNode.style;
    expect(style.fill ? style.fill.replace(/ /g, '') : '').toEqual(properties.primaryColor.rgbString);
    expect(style.stroke ? style.stroke.replace(/ /g, '') : '').toEqual(properties.secondaryColor.rgbString);
  });

  it('can draw Rectangle fill only', () => {
    properties.contourType = RectangleContourType.FILLED;
    rectangleTool.toolProperties = properties;
    rectangleTool.initShape(new Coordinate(100, 100));
    const style = rectangleTool.shape.svgNode.style;
    expect(style.fill ? style.fill.replace(/ /g, '') : '').toEqual(properties.primaryColor.rgbString);
    expect(style.strokeWidth).toEqual('0');
  });

  it('can draw Rectangle contour only', () => {
    properties.contourType = RectangleContourType.CONTOUR;
    rectangleTool.toolProperties = properties;
    rectangleTool.initShape(new Coordinate(100, 100));
    const style = rectangleTool.shape.svgNode.style;
    expect(style.fillOpacity).toEqual('0');
    expect(style.stroke ? style.stroke.replace(/ /g, '') : '').toEqual(properties.secondaryColor.rgbString);
  });
});
