/* tslint:disable:no-string-literal no-magic-numbers */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DrawingSurfaceComponent } from '../../../../components/pages/editor/drawing-surface/drawing-surface.component';
import { EditorComponent } from '../../../../components/pages/editor/editor/editor.component';
import { BrushToolbarComponent } from '../../../../components/pages/editor/toolbar/brush-toolbar/brush-toolbar.component';
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
import { CompositeParticle } from '../../../shapes/composite-particle';
import { NB_FRAME_BUFFER, SprayTool } from './spray-tool';

describe('SprayTool', () => {
  let sprayTool: SprayTool;
  let fixture: ComponentFixture<EditorComponent>;
  // @ts-ignore
  let colorService: ColorsService;

  const mouseDown = (c: Coordinate = new Coordinate()): MouseEvent => {
    return {
      type: 'mousedown',
      offsetX: c.x,
      offsetY: c.y,
    } as MouseEvent;
  };

  const mouseMove = (c: Coordinate = new Coordinate()): MouseEvent => {
    return {
      type: 'mousemove',
      offsetX: c.x,
      offsetY: c.y,
    } as MouseEvent;
  };

  const mouseUp = (): MouseEvent => {
    return {
      type: 'mouseup',
    } as MouseEvent;
  };

  const mouseLeave = (): MouseEvent => {
    return {
      type: 'mouseup',
    } as MouseEvent;
  };

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
      ],
      imports: [SharedModule, RouterTestingModule],
      providers: [EditorService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    fixture.detectChanges();
    colorService = fixture.componentInstance.editorService.colorsService;
    sprayTool = new SprayTool(fixture.componentInstance.editorService);
    sprayTool.shape = new CompositeParticle();
  });

  it('should create a new shape onmousedown if not active', () => {
    const createShapeSpy = spyOn(sprayTool, 'createShape');
    sprayTool['isActive'] = false;
    sprayTool.handleMouseEvent(mouseDown());
    expect(createShapeSpy).toHaveBeenCalled();
  });

  it('should addShape onmousedown if not active', () => {
    const addShapeSpy = spyOn(sprayTool, 'addShape');
    sprayTool['isActive'] = false;
    sprayTool.handleMouseEvent(mouseDown());
    expect(addShapeSpy).toHaveBeenCalled();
  });

  it('should wait NB_FRAME_BUFFER ticks before addParticle is called onmousedown', () => {
    const shapeSpy = spyOn(sprayTool.shape, 'addParticle');
    sprayTool['isActive'] = true;
    for (let i = 0; i < NB_FRAME_BUFFER; i++) {
      sprayTool.handleMouseEvent(mouseDown());
    }
    expect(shapeSpy).toHaveBeenCalledTimes(0);
    sprayTool.handleMouseEvent(mouseDown());
    expect(shapeSpy).toHaveBeenCalled();
  });

  it('should call addParticle onmousemove if active', () => {
    const shapeSpy = spyOn(sprayTool.shape, 'addParticle');
    sprayTool['isActive'] = true;
    sprayTool.handleMouseEvent(mouseMove());
    expect(shapeSpy).toHaveBeenCalled();
  });

  it('should call applyShape onmouseup if active', () => {
    const applyShapeSpy = spyOn(sprayTool, 'applyShape');
    sprayTool['isActive'] = true;
    sprayTool.handleMouseEvent(mouseUp());
    expect(applyShapeSpy).toHaveBeenCalled();
  });

  it('should call applyShape onmouseleave if active', () => {
    const applyShapeSpy = spyOn(sprayTool, 'applyShape');
    sprayTool['isActive'] = true;
    sprayTool.handleMouseEvent(mouseLeave());
    expect(applyShapeSpy).toHaveBeenCalled();
  });
});
