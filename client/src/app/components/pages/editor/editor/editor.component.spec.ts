/*tslint:disable:no-string-literal no-magic-numbers*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GridComponent } from '@components/pages/editor/drawing-surface/grid/grid.component';
import { ToolbarModule } from '@components/pages/editor/toolbar/toolbar.module';
import { GridVisibility } from '@tool-properties/grid-properties/grid-visibility.enum';
import { of } from 'rxjs';
import { ToolbarComponent } from 'src/app/components/pages/editor/toolbar/toolbar/toolbar.component';
import { CreateDrawingModalComponent } from 'src/app/components/pages/home/create-drawing-modal/create-drawing-modal.component';
import { UserGuideModalComponent } from 'src/app/components/pages/user-guide/user-guide/user-guide-modal.component';
import { AbstractModalComponent } from 'src/app/components/shared/abstract-modal/abstract-modal.component';
import { Rectangle } from 'src/app/models/shapes/rectangle';
import { LineTool } from 'src/app/models/tools/creator-tools/line-tool/line-tool';
import { RectangleTool } from 'src/app/models/tools/creator-tools/shape-tools/rectangle-tool';
import { BrushTool } from 'src/app/models/tools/creator-tools/stroke-tools/brush-tool/brush-tool';
import { PenTool } from 'src/app/models/tools/creator-tools/stroke-tools/pen-tool/pen-tool';
import { mouseDown } from 'src/app/models/tools/creator-tools/stroke-tools/stroke-tool.spec';
import { SelectionTool } from 'src/app/models/tools/editing-tools/selection-tool';
import { Tool } from 'src/app/models/tools/tool';
import { ToolType } from 'src/app/models/tools/tool-type.enum';
import { EditorService } from 'src/app/services/editor.service';
import { KeyboardListenerService } from 'src/app/services/event-listeners/keyboard-listener/keyboard-listener.service';
import { ModalDialogService } from 'src/app/services/modal/modal-dialog.service';
import { ModalType } from 'src/app/services/modal/modal-type.enum';
import { Color } from 'src/app/utils/color/color';
import { SharedModule } from '../../../shared/shared.module';
import { DrawingSurfaceComponent } from '../drawing-surface/drawing-surface.component';
import { EditorComponent } from './editor.component';
import createSpyObj = jasmine.createSpyObj;

export const keyDown = (key: string, shiftKey: boolean = false, ctrlKey: boolean = false): KeyboardEvent => {
  return {
    key,
    type: 'keydown',
    shiftKey,
    ctrlKey,
  } as KeyboardEvent;
};

export const keyUp = (key: string, shiftKey: boolean = false, ctrlKey: boolean = false): KeyboardEvent => {
  return {
    key,
    type: 'keyup',
    shiftKey,
    ctrlKey,
  } as KeyboardEvent;
};

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;
  let keyboardListener: KeyboardListenerService;
  const modalDialogServiceSpy = createSpyObj('ModalDialogService', {
    openByName: { afterClosed: () => of(true) },
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, SharedModule, ToolbarModule],
      declarations: [DrawingSurfaceComponent, UserGuideModalComponent, EditorComponent, GridComponent, CreateDrawingModalComponent],
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
    modalDialogServiceSpy.openByName.calls.reset();
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

  it('should select the pipette tool when typing i', () => {
    keyboardListener.handle(keyDown('i'));
    expect(component.currentToolType).toEqual(ToolType.Pipette);
  });

  it('should select the polygon tool when typing 3', () => {
    keyboardListener.handle(keyDown('3'));
    expect(component.currentToolType).toEqual(ToolType.Polygon);
  });

  it('should select the color applicator tool when typing r', () => {
    keyboardListener.handle(keyDown('r'));
    expect(component.currentToolType).toEqual(ToolType.ColorApplicator);
  });

  it('should select the eraser tool when typing e', () => {
    keyboardListener.handle(keyDown('e'));
    expect(component.currentToolType).toEqual(ToolType.Eraser);
  });

  it('should decrement grid size when typing -', () => {
    component.editorService.gridProperties.size.value = 20;
    keyboardListener.handle(keyDown('-', false, false));
    expect(component.editorService.gridProperties.size.value).toEqual(15);
  });

  it('should decrement grid size and set to highest multiple of 5 when typing -', () => {
    component.editorService.gridProperties.size.value = 21;
    keyboardListener.handle(keyDown('-', false, false));
    expect(component.editorService.gridProperties.size.value).toEqual(20);
    component.editorService.gridProperties.size.value = 24;
    keyboardListener.handle(keyDown('-', false, false));
    expect(component.editorService.gridProperties.size.value).toEqual(20);
    component.editorService.gridProperties.size.value = 25;
    keyboardListener.handle(keyDown('-', false, false));
    expect(component.editorService.gridProperties.size.value).toEqual(20);
  });

  it('should increment grid size when typing +', () => {
    component.editorService.gridProperties.size.value = 20;
    keyboardListener.handle(keyDown('+', false, false));
    expect(component.editorService.gridProperties.size.value).toEqual(25);
  });

  it('should increment grid size and set to highest multiple of 5 when typing +', () => {
    component.editorService.gridProperties.size.value = 21;
    keyboardListener.handle(keyDown('+', false, false));
    expect(component.editorService.gridProperties.size.value).toEqual(25);
    component.editorService.gridProperties.size.value = 24;
    keyboardListener.handle(keyDown('+', false, false));
    expect(component.editorService.gridProperties.size.value).toEqual(25);
    component.editorService.gridProperties.size.value = 25;
    keyboardListener.handle(keyDown('+', false, false));
    expect(component.editorService.gridProperties.size.value).toEqual(30);
  });

  it('should set grid visible when typing g', () => {
    component.editorService.gridProperties.visibility.value = GridVisibility.hidden;
    keyboardListener.handle(keyDown('g', false, false));
    expect(component.editorService.gridProperties.visibility.value).toEqual(GridVisibility.visible);
  });

  it('should select the line tool', () => {
    component.currentToolType = ToolType.Line;
    const currentTool = component.currentTool as Tool;
    expect(currentTool.constructor.name).toEqual(LineTool.name);
  });

  it('should select the rectangle tool', () => {
    component.currentToolType = ToolType.Rectangle;

    const currentTool = component.currentTool as Tool;
    expect(currentTool.constructor.name).toEqual(RectangleTool.name);
  });

  it('should select the brush tool', () => {
    component.currentToolType = ToolType.Brush;

    const currentTool = component.currentTool as Tool;
    expect(currentTool.constructor.name).toEqual(BrushTool.name);
  });

  it('should select the pen tool after selecting the brush tool', () => {
    component.currentToolType = ToolType.Brush;
    component.currentToolType = ToolType.Pen;

    const currentTool = component.currentTool as Tool;
    expect(currentTool.constructor.name).toEqual(PenTool.name);
  });

  it('should select selection tool on typing s', () => {
    keyboardListener.handle(keyDown('s'));
    expect(component.currentToolType).toEqual(ToolType.Select);
    const currentTool = component.currentTool as Tool;
    expect(currentTool.constructor.name).toEqual(SelectionTool.name);
  });

  it('can get current tool', () => {
    class ToolImpl extends Tool {
      type: string;
      constructor(editorService: EditorService, type: string) {
        super(editorService);
        this.type = type;
      }

      initMouseHandler(): void {
        return;
      }
    }

    const tool: ToolImpl = new ToolImpl({} as EditorService, 'toolMock');
    component.editorService.tools.set('toolMock' as ToolType, tool);

    component.currentToolType = 'toolMock' as ToolType;

    const currentTool = component.currentTool as Tool;
    expect(currentTool).toEqual(tool);
    expect(currentTool.constructor.name).toEqual(ToolImpl.name);
    expect((currentTool as ToolImpl).type).toEqual('toolMock');
  });

  it('handles mouse event', () => {
    const tool: Tool = component.editorService.tools.get(component.currentToolType) as Tool;
    const handleMouseEventSpy = spyOn(tool, 'handleMouseEvent');
    const event = mouseDown();

    component.handleMouseEvent(event);

    expect(handleMouseEventSpy).toHaveBeenCalledWith(event);
  });

  it('prevents default on right click', () => {
    const handleMouseEventSpy = spyOn(component, 'handleMouseEvent').and.callThrough();
    const event = createSpyObj<MouseEvent>('event', ['preventDefault']);
    component.handleMouseEvent({ ...event, type: 'contextmenu' });

    expect(handleMouseEventSpy).toHaveBeenCalledWith({ ...event, type: 'contextmenu' });
    expect(event.preventDefault).toHaveBeenCalled();
  });

  it('can call openCreateModal with keyboard shortcut', () => {
    const openModalSpy = spyOn(component, 'openCreateModal').and.callThrough();
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'o', ctrlKey: true }));
    expect(openModalSpy).toHaveBeenCalled();
  });

  it('can open create modal if user confirms', () => {
    modalDialogServiceSpy.openByName.and.returnValue({
      afterClosed: () => of(true),
    } as MatDialogRef<AbstractModalComponent>);

    component.openCreateModal();
    expect(modalDialogServiceSpy.openByName).toHaveBeenCalledWith(ModalType.CONFIRM);
    expect(modalDialogServiceSpy.openByName).toHaveBeenCalledWith(ModalType.CREATE);
  });

  it('does not open create modal if user cancels', () => {
    modalDialogServiceSpy.openByName.and.returnValue({
      afterClosed: () => of(false),
    } as MatDialogRef<AbstractModalComponent>);
    component.openCreateModal();
    expect(modalDialogServiceSpy.openByName).toHaveBeenCalledWith(ModalType.CONFIRM);
    expect(modalDialogServiceSpy.openByName).not.toHaveBeenCalledWith(ModalType.CREATE);
  });

  it('opens dialog on openGuide', () => {
    component.openGuide();
    expect(modalDialogServiceSpy.openByName).toHaveBeenCalledWith(ModalType.GUIDE);
  });

  it('should undo on ctrl z', () => {
    const undoSpy = spyOn(component.editorService.commandReceiver, 'undo');

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'z', ctrlKey: true }));
    expect(undoSpy).toHaveBeenCalled();
  });

  it('should redo on ctrl shift z', () => {
    const undoSpy = spyOn(component.editorService.commandReceiver, 'redo');

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'z', ctrlKey: true, shiftKey: true }));
    expect(undoSpy).toHaveBeenCalled();
  });

  it('disables keyboardListener when toolbar is opened', () => {
    const toolbarOpenSpy = spyOn(component.toolbar, 'open');
    component.setToolbarState(true);
    expect(toolbarOpenSpy).toHaveBeenCalled();
    expect(component['keyboardListener'].listening).toEqual(false);
  });

  it('enables keyboardListener when toolbar is closed', () => {
    const toolbarClosedSpy = spyOn(component.toolbar, 'close');
    component.setToolbarState(false);
    expect(toolbarClosedSpy).toHaveBeenCalled();
    expect(component['keyboardListener'].listening).toEqual(true);
  });

  it('should select shape on shapeClicked', () => {
    component.currentToolType = ToolType.Select;
    const tool = component.currentTool as SelectionTool;
    const selectShapeSpy = spyOn(tool, 'selectShape');
    const shape = new Rectangle();
    component.shapeClicked(shape);

    expect(selectShapeSpy).toHaveBeenCalledWith(shape, false);
  });
});
