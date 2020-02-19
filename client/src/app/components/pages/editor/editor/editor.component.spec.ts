/*tslint:disable:no-string-literal*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { BrushToolbarComponent } from 'src/app/components/pages/editor/toolbar/toolbar-entries/brush-toolbar/brush-toolbar.component';
import { LineToolbarComponent } from 'src/app/components/pages/editor/toolbar/toolbar-entries/line-toolbar/line-toolbar.component';
import { PenToolbarComponent } from 'src/app/components/pages/editor/toolbar/toolbar-entries/pen-toolbar/pen-toolbar.component';
import { BrushToolProperties } from 'src/app/models/tool-properties/brush-tool-properties';
import { LineToolProperties } from 'src/app/models/tool-properties/line-tool-properties';
import { PenToolProperties } from 'src/app/models/tool-properties/pen-tool-properties';
import { RectangleToolProperties } from 'src/app/models/tool-properties/rectangle-tool-properties';
import { ToolType } from 'src/app/models/tools/tool';
import { ColorsService } from 'src/app/services/colors.service';
import { Color } from 'src/app/utils/color/color';
import { KeyboardListener } from 'src/app/utils/events/keyboard-listener';
import { SharedModule } from '../../../shared/shared.module';
import { DrawingSurfaceComponent } from '../drawing-surface/drawing-surface.component';
import { RectangleToolbarComponent } from '../toolbar/toolbar-entries/rectangle-toolbar/rectangle-toolbar.component';
import { ToolbarComponent } from '../toolbar/toolbar.component';
import { EditorComponent } from './editor.component';

const keyDown = (key: string, shiftKey: boolean = false): KeyboardEvent => {
  return {
    key,
    type: 'keydown',
    shiftKey,
  } as KeyboardEvent;
};

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule],
      declarations: [
        EditorComponent,
        DrawingSurfaceComponent,
        ToolbarComponent,
        PenToolbarComponent,
        RectangleToolbarComponent,
        BrushToolbarComponent,
        LineToolbarComponent,
      ],
      providers: [ColorsService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('changes background color on event emitted from toolbar', () => {
    const changeBackgroundSpy = spyOn(component, 'changeBackground').and.callThrough();
    const toolbar: ToolbarComponent = fixture.debugElement.query(By.css('#toolbar')).componentInstance;
    toolbar.editorBackgroundChanged.emit(Color.RED);
    expect(component.drawingSurface.color).toEqual(Color.RED);
    expect(changeBackgroundSpy).toHaveBeenCalled();
  });

  it('should catch a keyboard event on keydown', () => {
    const spy = spyOn(KeyboardListener, 'keyEvent');
    const keydownEvent = new Event('keydown');
    window.dispatchEvent(keydownEvent);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should select the pen tool when typing c', () => {
    const spy = spyOn(component, 'selectPenTool');

    KeyboardListener.keyEvent(keyDown('c'), component['keyboardEventHandler']);
    KeyboardListener.keyEvent(keyDown('c'), component['keyboardEventHandler']);

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should pass down events when unknown keys are pressed', () => {
    const spy = spyOn(component.currentTool, 'handleKeyboardEvent');

    KeyboardListener.keyEvent(keyDown('x'), component['keyboardEventHandler']);

    expect(spy).toHaveBeenCalled();
  });

  it('should select the brush tool when typing w', () => {
    const spy = spyOn(component, 'selectBrushTool');

    KeyboardListener.keyEvent(keyDown('w'), component['keyboardEventHandler']);
    KeyboardListener.keyEvent(keyDown('w'), component['keyboardEventHandler']);

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should select the rectangle tool when typing 1', () => {
    const spy = spyOn(component, 'selectRectangleTool');

    KeyboardListener.keyEvent(keyDown('1'), component['keyboardEventHandler']);
    KeyboardListener.keyEvent(keyDown('1'), component['keyboardEventHandler']);

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should select the line tool when typing l', () => {
    const spy = spyOn(component, 'selectLineTool');

    KeyboardListener.keyEvent(keyDown('l'), component['keyboardEventHandler']);
    KeyboardListener.keyEvent(keyDown('l'), component['keyboardEventHandler']);

    expect(spy).toHaveBeenCalledTimes(2);
  });

  it('should select the line tool', () => {
    component.handleToolChanged(new LineToolProperties());
    component.handleToolChanged(new LineToolProperties());

    expect(component.toolbar.currentToolType).toBe(ToolType.Line);
  });

  it('should select the rectangle tool', () => {
    component.handleToolChanged(new RectangleToolProperties());
    component.handleToolChanged(new RectangleToolProperties());

    expect(component.toolbar.currentToolType).toBe(ToolType.Rectangle);
  });

  it('should select the brush tool', () => {
    component.handleToolChanged(new BrushToolProperties());
    component.handleToolChanged(new BrushToolProperties());

    expect(component.toolbar.currentToolType).toBe(ToolType.Brush);
  });

  it('should select the pen tool after selecting the brush tool', () => {
    component.handleToolChanged(new BrushToolProperties());
    component.handleToolChanged(new PenToolProperties());

    expect(component.toolbar.currentToolType).toBe(ToolType.Pen);
  });
});
