/*tslint:disable:no-string-literal*/
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
import { AddShapesCommand } from 'src/app/models/commands/shape-commands/add-shapes-command';
import { EditorService } from 'src/app/services/editor.service';
import { SprayToolbarComponent } from '../../../components/pages/editor/toolbar/spray-toolbar/spray-toolbar.component';
import { Rectangle } from '../../shapes/rectangle';

describe('AddShapesCommand', () => {
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
        EllipseToolbarComponent,
        SprayToolbarComponent,
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

  it('should add shape to buffer then apply buffer', () => {
    const shape = new Rectangle();
    const command = new AddShapesCommand([shape], editor.editorService);
    const addSpy = spyOn(editor.editorService, 'addShapeToBuffer');
    const applySpy = spyOn(editor.editorService, 'applyShapesBuffer');
    command.execute();
    expect(addSpy).toHaveBeenCalled();
    expect(applySpy).toHaveBeenCalled();
  });

  it('should only apply buffer if shape is already present', () => {
    const shape = new Rectangle();
    const command = new AddShapesCommand([shape], editor.editorService);
    editor.editorService.addShapeToBuffer(shape);
    const addSpy = spyOn(editor.editorService, 'addShapeToBuffer');
    const applySpy = spyOn(editor.editorService, 'applyShapesBuffer');
    command.execute();
    expect(addSpy).not.toHaveBeenCalled();
    expect(applySpy).toHaveBeenCalled();
  });

  it('should remove shape on undo', () => {
    const shape = new Rectangle();
    const command = new AddShapesCommand([shape], editor.editorService);
    const removeSpy = spyOn(editor.editorService, 'removeShape');
    command.execute();
    command.undo();
    expect(removeSpy).toHaveBeenCalledWith(shape);
  });
});
