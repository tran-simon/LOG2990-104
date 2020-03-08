/*tslint:disable:no-string-literal*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BrushToolbarComponent } from 'src/app/components/pages/editor/toolbar/brush-toolbar/brush-toolbar.component';
import { LineToolbarComponent } from 'src/app/components/pages/editor/toolbar/line-toolbar/line-toolbar.component';
import { PenToolbarComponent } from 'src/app/components/pages/editor/toolbar/pen-toolbar/pen-toolbar.component';
import { ToolbarComponent } from 'src/app/components/pages/editor/toolbar/toolbar/toolbar.component';
import { CreateDrawingModalComponent } from 'src/app/components/pages/home/create-drawing-modal/create-drawing-modal.component';
import { UserGuideModalComponent } from 'src/app/components/pages/user-guide/user-guide/user-guide-modal.component';
import { mouseDown } from 'src/app/models/tools/creator-tools/stroke-tools/stroke-tool.spec';
import { Tool } from 'src/app/models/tools/tool';
import { ToolType } from 'src/app/models/tools/tool-type';
import { EditorService } from 'src/app/services/editor.service';
import { ModalDialogService, ModalTypes } from 'src/app/services/modal-dialog.service';
import { Color } from 'src/app/utils/color/color';
import { KeyboardListener } from 'src/app/utils/events/keyboard-listener';
import { ToolProperties } from '../../../../models/tool-properties/tool-properties';
import { SharedModule } from '../../../shared/shared.module';
import { DrawingSurfaceComponent } from '../drawing-surface/drawing-surface.component';
import { RectangleToolbarComponent } from '../toolbar/rectangle-toolbar/rectangle-toolbar.component';
import createSpyObj = jasmine.createSpyObj;
import { SprayToolbarComponent } from '../toolbar/spray-toolbar/spray-toolbar.component';
import { EditorComponent } from './editor.component';

export const keyDown = (key: string, shiftKey: boolean = false): KeyboardEvent => {
  return {
    key,
    type: 'keydown',
    shiftKey,
  } as KeyboardEvent;
};

export const keyUp = (key: string, shiftKey: boolean = false): KeyboardEvent => {
  return {
    key,
    type: 'keyup',
    shiftKey,
  } as KeyboardEvent;
};

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;
  let keyboardListener: KeyboardListener;
  const modalDialogServiceSpy = createSpyObj('ModalDialogService', ['openByName']);

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
        CreateDrawingModalComponent,
        UserGuideModalComponent,
        SprayToolbarComponent,
      ],
      providers: [
        EditorService,
        {
          provide: ModalDialogService,
          useValue: modalDialogServiceSpy,
        },
      ],
    })
      .overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [CreateDrawingModalComponent, UserGuideModalComponent] } })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    keyboardListener = component['keyboardListener'];
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
    const spy = spyOn(keyboardListener, 'handle');
    const keydownEvent = new Event('keydown');
    window.dispatchEvent(keydownEvent);
    fixture.detectChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('should select the pen tool when typing c', () => {
    keyboardListener.handle(keyDown('c'));
    expect(component.currentToolType).toEqual(ToolType.Pen);
  });

  it('should cancel current drawing on tool change', () => {
    component.currentToolType = ToolType.Pen;
    const cancelSpy = spyOn(component.editorService.tools.get(ToolType.Pen) as Tool, 'cancel');
    component.currentToolType = ToolType.Brush;
    expect(cancelSpy).toHaveBeenCalled();
  });

  it('should pass down events when unknown keys are pressed', () => {
    const spy = spyOn(component.currentTool as Tool, 'handleKeyboardEvent');

    keyboardListener.handle(keyDown('x'));

    expect(spy).toHaveBeenCalled();
  });

  it('should select the brush tool when typing w', () => {
    keyboardListener.handle(keyDown('w'));
    expect(component.currentToolType).toEqual(ToolType.Brush);
  });

  it('should select the rectangle tool when typing 1', () => {
    keyboardListener.handle(keyDown('1'));
    expect(component.currentToolType).toEqual(ToolType.Rectangle);
  });

  it('should select the line tool when typing l', () => {
    keyboardListener.handle(keyDown('l'));
    expect(component.currentToolType).toEqual(ToolType.Line);
  });

  it('should select the line tool', () => {
    component.currentToolType = ToolType.Line;
    const currentTool = component.currentTool as Tool;
    expect(currentTool.toolProperties.type).toEqual(ToolType.Line);
  });

  it('should select the rectangle tool', () => {
    component.currentToolType = ToolType.Rectangle;

    const currentTool = component.currentTool as Tool;
    expect(currentTool.toolProperties.type).toEqual(ToolType.Rectangle);
  });

  it('should select the brush tool', () => {
    component.currentToolType = ToolType.Brush;

    const currentTool = component.currentTool as Tool;
    expect(currentTool.toolProperties.type).toEqual(ToolType.Brush);
  });

  it('should select the pen tool after selecting the brush tool', () => {
    component.currentToolType = ToolType.Brush;
    component.currentToolType = ToolType.Pen;

    const currentTool = component.currentTool as Tool;
    expect(currentTool.toolProperties.type).toEqual(ToolType.Pen);
  });

  it('can get current tool', () => {
    const tool: Tool = { toolProperties: { type: 'toolMock' as ToolType } as ToolProperties } as Tool;
    component.editorService.tools.set('toolMock' as ToolType, tool);

    component.currentToolType = 'toolMock' as ToolType;

    const currentTool = component.currentTool as Tool;
    expect(currentTool).toEqual(tool);
    expect(currentTool.toolProperties.type).toEqual('toolMock');
  });

  it('handles mouse event', () => {
    const tool: Tool = component.editorService.tools.get(component.currentToolType) as Tool;
    const handleMouseEventSpy = spyOn(tool, 'handleMouseEvent');
    const event = mouseDown();

    component.handleMouseEvent(event);

    expect(handleMouseEventSpy).toHaveBeenCalledWith(event);
  });

  it('prevents default on right click', () => {
    const rightClickSpy = spyOn(component, 'onRightClick').and.callThrough();
    const event = createSpyObj('event', ['preventDefault']);
    fixture.debugElement.triggerEventHandler('contextmenu', event);

    expect(rightClickSpy).toHaveBeenCalledWith(event);
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('can open create modal with keyboard shortcut', () => {
    const openModalSpy = spyOn(component, 'openCreateModal');
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'o', ctrlKey: true }));
    expect(openModalSpy).toHaveBeenCalled();
  });

  it('opens dialog on openGuide', () => {
    component.openGuide();
    expect(modalDialogServiceSpy.openByName).toHaveBeenCalledWith(ModalTypes.GUIDE);
  });
});
