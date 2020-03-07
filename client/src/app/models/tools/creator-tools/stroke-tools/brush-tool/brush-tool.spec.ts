/* tslint:disable:no-string-literal no-magic-numbers */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EditorComponent } from 'src/app/components/pages/editor/editor/editor.component';
import { BrushToolbarComponent } from 'src/app/components/pages/editor/toolbar/brush-toolbar/brush-toolbar.component';
import { LineToolbarComponent } from 'src/app/components/pages/editor/toolbar/line-toolbar/line-toolbar.component';
import { PenToolbarComponent } from 'src/app/components/pages/editor/toolbar/pen-toolbar/pen-toolbar.component';
import { ToolbarComponent } from 'src/app/components/pages/editor/toolbar/toolbar/toolbar.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { BrushTool } from 'src/app/models/tools/creator-tools/stroke-tools/brush-tool/brush-tool';
import { EditorService } from 'src/app/services/editor.service';
import { Coordinate } from 'src/app/utils/math/coordinate';
import { DrawingSurfaceComponent } from '../../../../../components/pages/editor/drawing-surface/drawing-surface.component';
import { PolygonToolbarComponent } from '../../../../../components/pages/editor/toolbar/polygon-toolbar/polygon-toolbar.component';
import { RectangleToolbarComponent } from '../../../../../components/pages/editor/toolbar/rectangle-toolbar/rectangle-toolbar.component';
import { mouseDown } from '../stroke-tool.spec';

describe('BrushTool', () => {
  let fixture: ComponentFixture<EditorComponent>;
  let brushTool: BrushTool;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ToolbarComponent,
        PenToolbarComponent,
        BrushToolbarComponent,
        RectangleToolbarComponent,
        PolygonToolbarComponent,
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
    brushTool = new BrushTool(fixture.componentInstance.editorService);
  });

  it('Should not add shape on mousedown event if already active', () => {
    const addShapeSpy = spyOn(brushTool, 'addShape');
    brushTool['isActive'] = true;
    brushTool.handleMouseEvent(mouseDown(new Coordinate(100, 100)));
    expect(addShapeSpy).not.toHaveBeenCalled();
  });

  it('should add shape on mousedown when not already active', () => {
    const addShapeSpy = spyOn(brushTool, 'addShape');
    brushTool.handleMouseEvent(mouseDown(new Coordinate(100, 100)));
    expect(addShapeSpy).toHaveBeenCalled();
  });
});
