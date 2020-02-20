/*tslint:disable:no-string-literal*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditorComponent } from 'src/app/components/pages/editor/editor/editor.component';
import { RectangleContourType, RectangleToolProperties } from 'src/app/models/tool-properties/rectangle-tool-properties';
import { RectangleTool } from 'src/app/models/tools/creator-tools/shape-tools/rectangle-tool';
import { ColorsService } from 'src/app/services/colors.service';
import { EditorService } from 'src/app/services/editor.service';
import { Coordinate } from 'src/app/utils/math/coordinate';
import { DrawingSurfaceComponent } from '../../../../components/pages/editor/drawing-surface/drawing-surface.component';

describe('RectangleTool', () => {
  let rectangleTool: RectangleTool;
  let fixture: ComponentFixture<EditorComponent>;
  let surface: DrawingSurfaceComponent;
  let properties: RectangleToolProperties;
  let selectedColorsService: ColorsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DrawingSurfaceComponent],
      providers: [EditorService],
    }).compileComponents();
  }));

  beforeEach(() => {
    selectedColorsService = new ColorsService();
    fixture = TestBed.createComponent(EditorComponent);
    fixture.detectChanges();
    surface = fixture.componentInstance.drawingSurface;
    properties = new RectangleToolProperties();
    rectangleTool = new RectangleTool(fixture.componentInstance.editorService);
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
    const strokeWidth = style.strokeWidth as string;
    expect(parseInt(strokeWidth, 10)).toEqual(0);
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
