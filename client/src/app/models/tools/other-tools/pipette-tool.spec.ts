/* tslint:disable:no-any no-string-literal no-magic-numbers no-empty */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { EditorComponent } from 'src/app/components/pages/editor/editor/editor.component';
import { BrushToolbarComponent } from 'src/app/components/pages/editor/toolbar/brush-toolbar/brush-toolbar.component';
import { LineToolbarComponent } from 'src/app/components/pages/editor/toolbar/line-toolbar/line-toolbar.component';
import { PenToolbarComponent } from 'src/app/components/pages/editor/toolbar/pen-toolbar/pen-toolbar.component';
import { RectangleToolbarComponent } from 'src/app/components/pages/editor/toolbar/rectangle-toolbar/rectangle-toolbar.component';
import { ToolbarComponent } from 'src/app/components/pages/editor/toolbar/toolbar/toolbar.component';
import { SharedModule } from 'src/app/components/shared/shared.module';
import { PipetteTool } from 'src/app/models/tools/other-tools/pipette-tool';
import { EditorService } from 'src/app/services/editor.service';
import { SelectedColorType } from 'src/app/services/selected-color-type.enum';
import { Color } from 'src/app/utils/color/color';
import { Coordinate } from 'src/app/utils/math/coordinate';
import { PolygonToolbarComponent } from '../../../components/pages/editor/toolbar/polygon-toolbar/polygon-toolbar.component';

describe('PipetteTool', () => {
  let pipetteTool: PipetteTool;
  let fixture: ComponentFixture<EditorComponent>;

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
    pipetteTool = new PipetteTool(fixture.componentInstance.editorService);
  });

  it('picks primary color on left click', () => {
    const pickColorSpy = spyOn<any>(pipetteTool, 'pickColor');
    pipetteTool.handleMouseEvent({type: 'click', offsetX: 10, offsetY: 20} as MouseEvent);
    expect(pickColorSpy).toHaveBeenCalledWith(new Coordinate(10, 20), SelectedColorType.primary);
  });

  it('picks secondary color on right click', () => {
    const pickColorSpy = spyOn<any>(pipetteTool, 'pickColor');
    pipetteTool.handleMouseEvent({type: 'contextmenu', offsetX: 10, offsetY: 20, preventDefault: ()=> {}} as MouseEvent);
    expect(pickColorSpy).toHaveBeenCalledWith(new Coordinate(10, 20), SelectedColorType.secondary);
  });

  it('can pick primary color', () => {
    const setColorSpy = spyOn(pipetteTool['editorService'].colorsService, 'setColorByTypeAndUpdateHistory').and.callThrough();
    pipetteTool['pickColor'](new Coordinate(), SelectedColorType.primary);
    // @ts-ignore
    pipetteTool['image'].onload();
    expect(setColorSpy).toHaveBeenCalledWith(Color.BLACK, SelectedColorType.primary);
  });

  it('can pick secondary color', () => {
    const setColorSpy = spyOn(pipetteTool['editorService'].colorsService, 'setColorByTypeAndUpdateHistory').and.callThrough();
    pipetteTool['pickColor'](new Coordinate(), SelectedColorType.secondary);
    // @ts-ignore
    pipetteTool['image'].onload();
    expect(setColorSpy).toHaveBeenCalledWith(Color.BLACK, SelectedColorType.secondary);
  });
});
