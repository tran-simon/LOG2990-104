/* tslint:disable:no-string-literal no-magic-numbers */
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
import { DrawingSurfaceComponent } from '../../../../../components/pages/editor/drawing-surface/drawing-surface.component';
import { RectangleToolbarComponent } from '../../../../../components/pages/editor/toolbar/rectangle-toolbar/rectangle-toolbar.component';
import { mouseDown, mouseLeave, mouseMove, mouseUp } from '../stroke-tool.spec';
import { PenTool } from './pen-tool';

describe('PenTool', () => {
  let fixture: ComponentFixture<EditorComponent>;
  let penTool: PenTool;

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

  it('Should call add shape on mousedown event', () => {
    const addShapeSpy = spyOn(penTool, 'addShape');
    penTool.handleMouseEvent(mouseDown(new Coordinate(100, 100)));
    expect(addShapeSpy).toHaveBeenCalled();
  });

  it('Should not add shape on mousedown if isActive', () => {
    const addShapeSpy = spyOn(penTool, 'addShape');
    penTool['isActive'] = true;
    penTool.handleMouseEvent(mouseDown(new Coordinate(100, 100)));
    expect(addShapeSpy).not.toHaveBeenCalled();
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
    penTool['shape'] = penTool.createShape();
    penTool['isActive'] = true;
    const addPointSpy = spyOn(penTool.shape, 'addPoint');
    penTool.handleMouseEvent(mouseMove(new Coordinate(100, 100)));
    expect(addPointSpy).toHaveBeenCalled();
  });

  it('Should not add point on mousemove if not isActive', () => {
    penTool['shape'] = penTool.createShape();
    penTool['isActive'] = false;
    const addPointSpy = spyOn(penTool.shape, 'addPoint');
    penTool.handleMouseEvent(mouseMove(new Coordinate(100, 100)));
    expect(addPointSpy).not.toHaveBeenCalled();
  });
});
