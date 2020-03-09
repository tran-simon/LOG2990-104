/* tslint:disable:no-string-literal no-magic-numbers */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DrawingSurfaceComponent } from '../../../../components/pages/editor/drawing-surface/drawing-surface.component';
import { EditorComponent } from '../../../../components/pages/editor/editor/editor.component';
import { BrushToolbarComponent } from '../../../../components/pages/editor/toolbar/brush-toolbar/brush-toolbar.component';
import { EllipseToolbarComponent } from '../../../../components/pages/editor/toolbar/ellipse-toolbar/ellipse-toolbar.component';
import { LineToolbarComponent } from '../../../../components/pages/editor/toolbar/line-toolbar/line-toolbar.component';
import { PenToolbarComponent } from '../../../../components/pages/editor/toolbar/pen-toolbar/pen-toolbar.component';
import { PolygonToolbarComponent } from '../../../../components/pages/editor/toolbar/polygon-toolbar/polygon-toolbar.component';
import { RectangleToolbarComponent } from '../../../../components/pages/editor/toolbar/rectangle-toolbar/rectangle-toolbar.component';
import { SprayToolbarComponent } from '../../../../components/pages/editor/toolbar/spray-toolbar/spray-toolbar.component';
import { ToolbarComponent } from '../../../../components/pages/editor/toolbar/toolbar/toolbar.component';
import { SharedModule } from '../../../../components/shared/shared.module';
import { ColorsService } from '../../../../services/colors.service';
import { EditorService } from '../../../../services/editor.service';
import { Coordinate } from '../../../../utils/math/coordinate';
import { SprayToolProperties } from '../../../tool-properties/spray-tool-properties';
import { mouseDown, mouseLeave, mouseMove, mouseUp } from '../stroke-tools/stroke-tool.spec';
import { SprayTool } from './spray-tool';

fdescribe('SprayTool', () => {
  let sprayTool: SprayTool;
  let fixture: ComponentFixture<EditorComponent>;
  let properties: SprayToolProperties;
  // @ts-ignore
  let selectedColorsService: ColorsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToolbarComponent,
        PenToolbarComponent,
        BrushToolbarComponent,
        RectangleToolbarComponent,
        LineToolbarComponent,
        PolygonToolbarComponent,
        SprayToolbarComponent,
        EditorComponent,
        DrawingSurfaceComponent,
        EllipseToolbarComponent,
      ],
      imports: [SharedModule, RouterTestingModule],
      providers: [EditorService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    fixture.detectChanges();
    properties = new SprayToolProperties();
    sprayTool = new SprayTool(fixture.componentInstance.editorService);
    sprayTool.toolProperties = properties;
    selectedColorsService = new ColorsService();
  });

  it('should call startShape onmousedown if not active', () => {
    const startShapeSpy = spyOn(sprayTool, 'startShape');
    sprayTool['isActive'] = false;
    sprayTool.handleMouseDown(mouseDown());
    expect(startShapeSpy).toHaveBeenCalled();
  });

  it('should change lastMovePosition onmousemove if active', () => {
    sprayTool['isActive'] = true;
    sprayTool['lastMovePosition'] = new Coordinate(50, 50);
    const newCoord = new Coordinate(100, 100);
    sprayTool.handleMouseMove(mouseMove(newCoord));
    expect(sprayTool['lastMovePosition']).toEqual(newCoord);
  });

  it('should call addParticle after interval if active', () => {
    jasmine.clock().install();
    sprayTool['isActive'] = true;
    sprayTool.startShape();
    jasmine.clock().tick(SprayTool.INTERVAL_REFRESH_VALUE + 1);
    expect(sprayTool.shape.particles.length).toEqual(1);
    jasmine.clock().uninstall();
  });

  it('should call applyShape onmouseup if active', () => {
    const applyShapeSpy = spyOn(sprayTool, 'applyShape');
    sprayTool['isActive'] = true;
    sprayTool.handleMouseUp(mouseUp());
    expect(applyShapeSpy).toHaveBeenCalled();
  });

  it('should call applyShape onmouseleave if active', () => {
    const applyShapeSpy = spyOn(sprayTool, 'applyShape');
    sprayTool['isActive'] = true;
    sprayTool.handleMouseLeave(mouseLeave());
    expect(applyShapeSpy).toHaveBeenCalled();
  });
});
