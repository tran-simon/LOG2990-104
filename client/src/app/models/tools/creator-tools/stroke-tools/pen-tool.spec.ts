/*tslint:disable:no-string-literal*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EditorComponent } from 'src/app/components/pages/editor/editor/editor.component';
import { BrushToolbarComponent } from 'src/app/components/pages/editor/toolbar/brush-toolbar/brush-toolbar.component';
import { LineToolbarComponent } from 'src/app/components/pages/editor/toolbar/line-toolbar/line-toolbar.component';
import { PenToolbarComponent } from 'src/app/components/pages/editor/toolbar/pen-toolbar/pen-toolbar.component';
import { ToolbarComponent } from 'src/app/components/pages/editor/toolbar/toolbar/toolbar.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { EditorService } from 'src/app/services/editor.service';
import { Coordinate } from 'src/app/utils/math/coordinate';
import { DrawingSurfaceComponent } from '../../../../components/pages/editor/drawing-surface/drawing-surface.component';
import { RectangleToolbarComponent } from '../../../../components/pages/editor/toolbar/rectangle-toolbar/rectangle-toolbar.component';
import { PenTool } from './pen-tool';

describe('PenTool', () => {
  let fixture: ComponentFixture<EditorComponent>;
  let penTool: PenTool;

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

  const mouseUp = (c: Coordinate = new Coordinate()): MouseEvent => {
    return {
      type: 'mouseup',
      offsetX: c.x,
      offsetY: c.y,
    } as MouseEvent;
  };

  const mouseLeave = (): MouseEvent => {
    return {
      type: 'mouseleave',
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
    penTool = new PenTool(fixture.componentInstance.editorService);
  });

  it('Should call initPath on mousedown event', () => {
    const initSpy = spyOn(penTool, 'initPath');
    penTool.handleMouseEvent(mouseDown(new Coordinate(100, 100)));
    expect(initSpy).toHaveBeenCalled();
  });

  it('Should not call initPath on mousedown if isActive', () => {
    const initSpy = spyOn(penTool, 'initPath');
    penTool['isActive'] = true;
    penTool.handleMouseEvent(mouseDown(new Coordinate(100, 100)));
    expect(initSpy).not.toHaveBeenCalled();
  });

  it('Should end line on mouseup', () => {
    penTool['isActive'] = true;
    penTool.handleMouseEvent(mouseUp());
    expect(penTool['isActive']).toBeFalsy();
  });

  it('Should end line on mouseleave', () => {
    penTool['isActive'] = true;
    penTool.handleMouseEvent(mouseLeave());
    expect(penTool['isActive']).toBeFalsy();
  });

  it('Should add point on mousemove if isActive', () => {
    penTool.initPath();
    penTool['isActive'] = true;
    const addPointSpy = spyOn(penTool.shape, 'addPoint');
    penTool.handleMouseEvent(mouseMove(new Coordinate(100, 100)));
    expect(addPointSpy).toHaveBeenCalled();
  });

  it('Should not add point on mousemove if not isActive', () => {
    penTool.initPath();
    penTool['isActive'] = false;
    const addPointSpy = spyOn(penTool.shape, 'addPoint');
    penTool.handleMouseEvent(mouseMove(new Coordinate(100, 100)));
    expect(addPointSpy).not.toHaveBeenCalled();
  });
});
