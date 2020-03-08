/* tslint:disable:no-string-literal no-magic-numbers */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { EditorComponent } from 'src/app/components/pages/editor/editor/editor.component';
import { BrushToolbarComponent } from 'src/app/components/pages/editor/toolbar/brush-toolbar/brush-toolbar.component';
import { LineToolbarComponent } from 'src/app/components/pages/editor/toolbar/line-toolbar/line-toolbar.component';
import { PenToolbarComponent } from 'src/app/components/pages/editor/toolbar/pen-toolbar/pen-toolbar.component';
import { ToolbarComponent } from 'src/app/components/pages/editor/toolbar/toolbar/toolbar.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { RectangleContourType } from 'src/app/models/tool-properties/rectangle-contour-type';
import { RectangleToolProperties } from 'src/app/models/tool-properties/rectangle-tool-properties';
import { RectangleTool } from 'src/app/models/tools/creator-tools/shape-tools/rectangle-tool';
import { mouseDown } from 'src/app/models/tools/creator-tools/stroke-tools/stroke-tool.spec';
import { ColorsService } from 'src/app/services/colors.service';
import { EditorService } from 'src/app/services/editor.service';
import { Coordinate } from 'src/app/utils/math/coordinate';
import { RectangleToolbarComponent } from '../../../../components/pages/editor/toolbar/rectangle-toolbar/rectangle-toolbar.component';
import { SprayToolbarComponent } from '../../../../components/pages/editor/toolbar/spray-toolbar/spray-toolbar.component';

describe('RectangleTool', () => {
  let rectangleTool: RectangleTool;
  let fixture: ComponentFixture<EditorComponent>;
  let properties: RectangleToolProperties;
  let selectedColorsService: ColorsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToolbarComponent,
        PenToolbarComponent,
        BrushToolbarComponent,
        RectangleToolbarComponent,
        LineToolbarComponent,
        SprayToolbarComponent,
        EditorComponent,
        DrawingSurfaceComponent,
      ],
      imports: [SharedModule, RouterTestingModule],
      providers: [EditorService],
    }).compileComponents();
  }));

  beforeEach(() => {
    selectedColorsService = new ColorsService();
    fixture = TestBed.createComponent(EditorComponent);
    fixture.detectChanges();
    properties = new RectangleToolProperties();
    rectangleTool = new RectangleTool(fixture.componentInstance.editorService);
  });

  it('can initialize new Rectangle', () => {
    rectangleTool.toolProperties = properties;
    rectangleTool.handleMouseEvent(mouseDown(new Coordinate(100, 100)));
    expect(rectangleTool.shape.origin).toEqual(new Coordinate(100, 100));
    expect(fixture.componentInstance.drawingSurface.svg.nativeElement.querySelector('rect')).toBeTruthy();
  });

  it('can resize Rectangle', () => {
    rectangleTool.toolProperties = properties;
    rectangleTool['_mousePosition'] = new Coordinate(100, 100);
    rectangleTool['shape'] = rectangleTool.createShape();
    rectangleTool.resizeShape(new Coordinate(75, 50));
    expect(rectangleTool.shape.width).toEqual(75);
    expect(rectangleTool.shape.height).toEqual(50);
  });

  it('can resize and reposition Rectangle', () => {
    rectangleTool.toolProperties = properties;
    rectangleTool['_mousePosition'] = new Coordinate(100, 100);
    rectangleTool['shape'] = rectangleTool.createShape();
    rectangleTool.resizeShape(new Coordinate(75, 50), new Coordinate(125, 125));
    expect(rectangleTool.shape.origin).toEqual(new Coordinate(125, 125));
    expect(rectangleTool.shape.width).toEqual(75);
    expect(rectangleTool.shape.height).toEqual(50);
  });

  it('can draw Rectangle contour and fill', () => {
    properties.contourType = RectangleContourType.FILLED_CONTOUR;
    rectangleTool.toolProperties = properties;
    rectangleTool['_mousePosition'] = new Coordinate(50, 100);
    rectangleTool['shape'] = rectangleTool.createShape();
    const style = rectangleTool.shape.svgNode.style;
    expect(style.fill).toEqual(selectedColorsService.primaryColor.rgbString);
    expect(style.stroke).toEqual(selectedColorsService.secondaryColor.rgbString);
  });

  it('can draw Rectangle fill only', () => {
    properties.contourType = RectangleContourType.FILLED;
    rectangleTool.toolProperties = properties;
    rectangleTool['_mousePosition'] = new Coordinate(100, 100);
    rectangleTool['shape'] = rectangleTool.createShape();
    rectangleTool['updateProperties']();
    const style = rectangleTool.shape.svgNode.style;
    expect(style.fill).toEqual(selectedColorsService.primaryColor.rgbString);
    const strokeWidth = style.strokeWidth as string;
    expect(parseInt(strokeWidth, 10)).toEqual(0);
  });

  it('can draw Rectangle contour only', () => {
    properties.contourType = RectangleContourType.CONTOUR;
    rectangleTool.toolProperties = properties;
    rectangleTool['_mousePosition'] = new Coordinate(100, 100);
    rectangleTool['shape'] = rectangleTool.createShape();
    rectangleTool['updateProperties']();
    const style = rectangleTool.shape.svgNode.style;
    expect(style.fillOpacity).toEqual('0');
    expect(style.stroke).toEqual(selectedColorsService.secondaryColor.rgbString);
  });
});
