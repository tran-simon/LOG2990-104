/*tslint:disable:no-string-literal*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { EditorComponent } from 'src/app/components/pages/editor/editor/editor.component';
import { BrushToolbarComponent } from 'src/app/components/pages/editor/toolbar/brush-toolbar/brush-toolbar.component';
import { LineToolbarComponent } from 'src/app/components/pages/editor/toolbar/line-toolbar/line-toolbar.component';
import { PenToolbarComponent } from 'src/app/components/pages/editor/toolbar/pen-toolbar/pen-toolbar.component';
import { PolygonToolbarComponent } from 'src/app/components/pages/editor/toolbar/polygon-toolbar/polygon-toolbar.component';
import { RectangleToolbarComponent } from 'src/app/components/pages/editor/toolbar/rectangle-toolbar/rectangle-toolbar.component';
import { ToolbarComponent } from 'src/app/components/pages/editor/toolbar/toolbar/toolbar.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { EditorService } from 'src/app/services/editor.service';
import { Rectangle } from '../../shapes/rectangle';
import { RemoveShapeCommand } from './remove-shape-command';

describe('RemoveShapeCommand', () => {
  let fixture: ComponentFixture<EditorComponent>;
  let editor: EditorComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToolbarComponent,
        PenToolbarComponent,
        BrushToolbarComponent,
        RectangleToolbarComponent,
        LineToolbarComponent,
        PolygonToolbarComponent,
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
    editor = fixture.componentInstance;
  });

  it('should add back shape to buffer then apply buffer', () => {
    const shape = new Rectangle();
    const command = new RemoveShapeCommand(shape, editor.editorService);
    const addSpy = spyOn(editor.editorService, 'addShapeToBuffer');
    const applySpy = spyOn(editor.editorService, 'applyShapesBuffer');
    command.undo();
    expect(addSpy).toHaveBeenCalled();
    expect(applySpy).toHaveBeenCalled();
  });

  it('should only apply buffer if shape is already present', () => {
    const shape = new Rectangle();
    const command = new RemoveShapeCommand(shape, editor.editorService);
    editor.editorService.addShapeToBuffer(shape);
    const addSpy = spyOn(editor.editorService, 'addShapeToBuffer');
    const applySpy = spyOn(editor.editorService, 'applyShapesBuffer');
    command.undo();
    expect(addSpy).not.toHaveBeenCalled();
    expect(applySpy).toHaveBeenCalled();
  });

  it('can remove shape', () => {
    const shape = new Rectangle();
    const command = new RemoveShapeCommand(shape, editor.editorService);
    const removeSpy = spyOn(editor.editorService, 'removeShape');
    editor.editorService.addShapeToBuffer(shape);
    editor.editorService.applyShapesBuffer();
    command.execute();
    expect(removeSpy).toHaveBeenCalledWith(shape);
  });
});
