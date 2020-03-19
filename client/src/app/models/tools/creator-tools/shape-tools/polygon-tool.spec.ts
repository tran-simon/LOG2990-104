/* tslint:disable:no-string-literal no-magic-numbers */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { EditorComponent } from 'src/app/components/pages/editor/editor/editor.component';
import { BrushToolbarComponent } from 'src/app/components/pages/editor/toolbar/brush-toolbar/brush-toolbar.component';
import { EllipseToolbarComponent } from 'src/app/components/pages/editor/toolbar/ellipse-toolbar/ellipse-toolbar.component';
import { LineToolbarComponent } from 'src/app/components/pages/editor/toolbar/line-toolbar/line-toolbar.component';
import { PenToolbarComponent } from 'src/app/components/pages/editor/toolbar/pen-toolbar/pen-toolbar.component';
import { PolygonToolbarComponent } from 'src/app/components/pages/editor/toolbar/polygon-toolbar/polygon-toolbar.component';
import { RectangleToolbarComponent } from 'src/app/components/pages/editor/toolbar/rectangle-toolbar/rectangle-toolbar.component';
import { ToolbarComponent } from 'src/app/components/pages/editor/toolbar/toolbar/toolbar.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { ContourType } from 'src/app/models/tool-properties/contour-type.enum';
import { PolygonToolProperties } from 'src/app/models/tool-properties/polygon-tool-properties';
import { PolygonTool } from 'src/app/models/tools/creator-tools/shape-tools/polygon-tool';
import { mouseDown } from 'src/app/models/tools/creator-tools/stroke-tools/stroke-tool.spec';
import { ColorsService } from 'src/app/services/colors.service';
import { EditorService } from 'src/app/services/editor.service';
import { Coordinate } from 'src/app/utils/math/coordinate';
import { SprayToolbarComponent } from '../../../../components/pages/editor/toolbar/spray-toolbar/spray-toolbar.component';

describe('PolygonTool', () => {
  let polygonTool: PolygonTool;
  let fixture: ComponentFixture<EditorComponent>;
  let properties: PolygonToolProperties;
  let selectedColorsService: ColorsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToolbarComponent,
        PenToolbarComponent,
        BrushToolbarComponent,
        RectangleToolbarComponent,
        PolygonToolbarComponent,
        LineToolbarComponent,
        EllipseToolbarComponent,
        SprayToolbarComponent,
        EditorComponent,
        DrawingSurfaceComponent,
      ],
      imports: [SharedModule, RouterTestingModule],
      providers: [EditorService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    fixture.detectChanges();
    properties = new PolygonToolProperties();
    polygonTool = new PolygonTool(fixture.componentInstance.editorService);
    polygonTool.toolProperties = properties;
    selectedColorsService = new ColorsService();
  });

  it('can initialize new Polygon', () => {
    polygonTool.handleMouseEvent(mouseDown(new Coordinate(100, 100)));
    expect(polygonTool.shape.origin).toEqual(new Coordinate(100, 100));
    expect(fixture.componentInstance.drawingSurface.svg.querySelector('polygon')).toBeTruthy();
  });

  it('can resize Polygon', () => {
    polygonTool['_mousePosition'] = new Coordinate(100, 100);
    polygonTool['shape'] = polygonTool.createShape();
    polygonTool.resizeShape(new Coordinate(75, 50));
    expect(polygonTool.shape.width).toEqual(75);
    expect(polygonTool.shape.height).toEqual(50);
  });

  it('can resize and reposition Polygon', () => {
    polygonTool['_mousePosition'] = new Coordinate(100, 100);
    polygonTool['shape'] = polygonTool.createShape();
    polygonTool.resizeShape(new Coordinate(75, 50), new Coordinate(125, 125));
    expect(polygonTool.shape.origin).toEqual(new Coordinate(125, 125));
    expect(polygonTool.shape.width).toEqual(75);
    expect(polygonTool.shape.height).toEqual(50);
  });

  it('can draw Polygon contour and fill', () => {
    polygonTool['_mousePosition'] = new Coordinate(50, 100);
    properties.contourType = ContourType.FILLED_CONTOUR;
    polygonTool['shape'] = polygonTool.createShape();
    const style = polygonTool.shape.svgNode.style;
    expect(style.fill).toEqual(selectedColorsService.primaryColor.rgbString);
    expect(style.stroke).toEqual(selectedColorsService.secondaryColor.rgbString);
  });

  it('can draw Polygon fill only', () => {
    polygonTool['_mousePosition'] = new Coordinate(100, 100);
    properties.contourType = ContourType.FILLED;
    polygonTool['shape'] = polygonTool.createShape();
    polygonTool['updateProperties']();
    const style = polygonTool.shape.svgNode.style;
    expect(style.fill).toEqual(selectedColorsService.primaryColor.rgbString);
    expect(style.stroke).toEqual('none');
  });

  it('can draw Polygon contour only', () => {
    polygonTool['_mousePosition'] = new Coordinate(100, 100);
    properties.contourType = ContourType.CONTOUR;
    polygonTool['shape'] = polygonTool.createShape();
    polygonTool['updateProperties']();
    const style = polygonTool.shape.svgNode.style;
    expect(style.fill).toEqual('none');
    expect(style.stroke).toEqual(selectedColorsService.secondaryColor.rgbString);
  });
});
