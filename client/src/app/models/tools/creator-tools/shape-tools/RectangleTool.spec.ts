/*tslint:disable:no-string-literal*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DrawingSurfaceComponent } from '../../../../components/pages/editor/drawing-surface/drawing-surface.component';
import { SelectedColorsService } from '../../../../services/selected-colors.service';
import { Coordinate } from '../../../Coordinate';
import { RectangleContourType, RectangleToolProperties } from '../../../ToolProperties/RectangleToolProperties';
import { RectangleTool } from './RectangleTool';

describe('RectangleTool', () => {
  let rectangleTool: RectangleTool;
  let fixture: ComponentFixture<DrawingSurfaceComponent>;
  let surface: DrawingSurfaceComponent;
  let properties: RectangleToolProperties;
  let selectedColorsService: SelectedColorsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DrawingSurfaceComponent],
      providers: [SelectedColorsService],
    }).compileComponents();
  }));

  beforeEach(() => {
    selectedColorsService = new SelectedColorsService();
    fixture = TestBed.createComponent(DrawingSurfaceComponent);
    fixture.detectChanges();
    surface = fixture.componentInstance;
    properties = new RectangleToolProperties();
    rectangleTool = new RectangleTool(surface, selectedColorsService);
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
    expect(style.fill).toEqual(selectedColorsService.primaryColor.rgbString);
    expect(style.stroke).toEqual(selectedColorsService.secondaryColor.rgbString);
  });

  it('can draw Rectangle fill only', () => {
    properties.contourType = RectangleContourType.FILLED;
    rectangleTool.toolProperties = properties;
    rectangleTool.initShape(new Coordinate(100, 100));
    const style = rectangleTool.shape.svgNode.style;
    expect(style.fill).toEqual(selectedColorsService.primaryColor.rgbString);
    expect(style.strokeWidth).toEqual('0');
  });

  it('can draw Rectangle contour only', () => {
    properties.contourType = RectangleContourType.CONTOUR;
    rectangleTool.toolProperties = properties;
    rectangleTool.initShape(new Coordinate(100, 100));
    const style = rectangleTool.shape.svgNode.style;
    expect(style.fillOpacity).toEqual('0');
    expect(style.stroke).toEqual(selectedColorsService.secondaryColor.rgbString);
  });
});
