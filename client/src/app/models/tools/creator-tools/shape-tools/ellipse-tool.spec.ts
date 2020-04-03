/*tslint:disable:no-string-literal no-magic-numbers*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EraserToolbarComponent } from '@components/pages/editor/toolbar/eraser-toolbar/eraser-toolbar.component';
import { EllipseToolProperties } from '@tool-properties/creator-tool-properties/shape-tool-properties/ellipse-tool-properties';
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
import { ContourType } from 'src/app/models/tool-properties/creator-tool-properties/contour-type.enum';
import { EllipseTool } from 'src/app/models/tools/creator-tools/shape-tools/ellipse-tool';
import { mouseDown } from 'src/app/models/tools/creator-tools/stroke-tools/stroke-tool.spec';
import { ColorsService } from 'src/app/services/colors.service';
import { EditorService } from 'src/app/services/editor.service';
import { Coordinate } from 'src/app/utils/math/coordinate';
import { SprayToolbarComponent } from '../../../../components/pages/editor/toolbar/spray-toolbar/spray-toolbar.component';

describe('EllipseTool', () => {
  let ellipseTool: EllipseTool;
  let fixture: ComponentFixture<EditorComponent>;
  let properties: EllipseToolProperties;
  let selectedColorsService: ColorsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToolbarComponent,
        PenToolbarComponent,
        BrushToolbarComponent,
        RectangleToolbarComponent,
        LineToolbarComponent,
        EllipseToolbarComponent,
        PolygonToolbarComponent,
        EditorComponent,
        DrawingSurfaceComponent,
        SprayToolbarComponent,
        EraserToolbarComponent,
      ],
      imports: [SharedModule, RouterTestingModule],
      providers: [EditorService],
    }).compileComponents();
  }));

  beforeEach(() => {
    selectedColorsService = new ColorsService();
    fixture = TestBed.createComponent(EditorComponent);
    fixture.detectChanges();
    properties = new EllipseToolProperties();
    ellipseTool = new EllipseTool(fixture.componentInstance.editorService);
  });

  it('can initialize new Ellipse', () => {
    ellipseTool.toolProperties = properties;
    ellipseTool.handleMouseEvent(mouseDown(new Coordinate(100, 100)));
    expect(ellipseTool.shape.origin).toEqual(new Coordinate(100, 100));
    expect(fixture.componentInstance.drawingSurface.svg.querySelector('rect')).toBeTruthy();
  });

  it('can resize Ellipse', () => {
    ellipseTool.toolProperties = properties;
    ellipseTool['_mousePosition'] = new Coordinate(100, 100);
    ellipseTool['shape'] = ellipseTool.createShape();
    ellipseTool.resizeShape(new Coordinate(75, 50));
    expect(ellipseTool.shape.radiusX).toEqual(37.5);
    expect(ellipseTool.shape.radiusY).toEqual(25);
  });

  it('can resize and reposition Ellipse', () => {
    ellipseTool.toolProperties = properties;
    ellipseTool['_mousePosition'] = new Coordinate(100, 100);
    ellipseTool['shape'] = ellipseTool.createShape();
    ellipseTool.resizeShape(new Coordinate(75, 50), new Coordinate(125, 125));
    expect(ellipseTool.shape.origin).toEqual(new Coordinate(125, 125));
    expect(ellipseTool.shape.radiusX).toEqual(37.5);
    expect(ellipseTool.shape.radiusY).toEqual(25);
  });

  it('can draw Ellipse contour and fill', () => {
    properties.contourType.value = ContourType.FILLED_CONTOUR;
    ellipseTool.toolProperties = properties;
    ellipseTool['_mousePosition'] = new Coordinate(100, 100);
    ellipseTool['shape'] = ellipseTool.createShape();
    const style = ellipseTool.shape.svgNode.style;
    expect(style.fill).toEqual(selectedColorsService.primaryColor.rgbString);
    expect(style.stroke).toEqual(selectedColorsService.secondaryColor.rgbString);
  });

  it('can draw Ellipse fill only', () => {
    properties.contourType.value = ContourType.FILLED;
    ellipseTool.toolProperties = properties;
    ellipseTool['_mousePosition'] = new Coordinate(100, 100);
    ellipseTool['shape'] = ellipseTool.createShape();
    ellipseTool['updateProperties']();
    const style = ellipseTool.shape.svgNode.style;
    expect(style.fill).toEqual(selectedColorsService.primaryColor.rgbString);
    expect(style.stroke).toEqual('none');
  });

  it('can draw Ellipse contour only', () => {
    properties.contourType.value = ContourType.CONTOUR;
    ellipseTool.toolProperties = properties;
    ellipseTool['_mousePosition'] = new Coordinate(100, 100);
    ellipseTool['shape'] = ellipseTool.createShape();
    ellipseTool['updateProperties']();
    const style = ellipseTool.shape.svgNode.style;
    expect(style.fill).toEqual('none');
    expect(style.stroke).toEqual(selectedColorsService.secondaryColor.rgbString);
  });
});
