/*tslint:disable:no-string-literal*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { EditorComponent } from 'src/app/components/pages/editor/editor/editor.component';
import { ToolType } from 'src/app/models/tools/tool';
import { EditorService } from 'src/app/services/editor.service';
import { DrawingSurfaceComponent } from '../../../../components/pages/editor/drawing-surface/drawing-surface.component';
import { Coordinate } from '../../../../utils/math/coordinate';
import { Rectangle } from '../../../shapes/rectangle';
import { ToolProperties } from '../../../tool-properties/tool-properties';
import { ShapeTool } from './shape-tool';

export class MockShapeTool extends ShapeTool {
  _shape: Rectangle;
  toolProperties: ToolProperties;

  get shape() {
    return this._shape;
  }

  constructor(editorService: EditorService, type = 'TYPE_MOCK' as ToolType) {
    super(editorService, type);
  }

  initShape(c: Coordinate) {
    this._shape = new Rectangle(c);
  }
  resizeShape() {
    return;
  }

  handleMouseEvent(e: MouseEvent): void {
    super.handleMouseEvent(e);
  }
}

describe('ShapeTool', () => {
  let mockShapeTool: MockShapeTool;
  let fixture: ComponentFixture<EditorComponent>;
  let surface: DrawingSurfaceComponent;

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

  const keyUp = (key: string, shiftKey: boolean = false): KeyboardEvent => {
    return {
      key,
      type: 'keyup',
      shiftKey,
    } as KeyboardEvent;
  };

  const keyDown = (key: string, shiftKey: boolean = false): KeyboardEvent => {
    return {
      key,
      type: 'keydown',
      shiftKey,
    } as KeyboardEvent;
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DrawingSurfaceComponent],
      providers: [EditorService],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    fixture.detectChanges();
    surface = fixture.componentInstance.drawingSurface;
    mockShapeTool = new MockShapeTool(fixture.componentInstance.editorService);
  });

  it('can draw preview area', () => {
    mockShapeTool.handleMouseEvent(mouseDown());
    expect(surface.svg.nativeElement.querySelector('rect')).toBeTruthy();
  });

  it('can remove preview area', () => {
    mockShapeTool.handleMouseEvent(mouseDown());
    mockShapeTool.handleMouseEvent(mouseUp());
    expect(surface.svg.nativeElement.querySelector('rect')).toBeFalsy();
  });

  it('can update preview rectangle', () => {
    mockShapeTool.handleMouseEvent(mouseDown(new Coordinate(100, 100)));
    mockShapeTool.handleMouseEvent(mouseMove(new Coordinate(250, 200)));
    expect(mockShapeTool['previewArea'].svgNode.getAttribute('width')).toEqual('150');
    expect(mockShapeTool['previewArea'].svgNode.getAttribute('height')).toEqual('100');
  });

  it('can update current shape size', () => {
    const resizeShapeSpy = spyOn(mockShapeTool, 'resizeShape');
    mockShapeTool.handleMouseEvent(mouseDown(new Coordinate(100, 100)));
    mockShapeTool.handleMouseEvent(mouseMove(new Coordinate(250, 200)));
    expect(resizeShapeSpy).toHaveBeenCalledWith(new Coordinate(150, 100), new Coordinate(100, 100));
  });

  it('can set equal dimensions on shift down', () => {
    const resizeShapeSpy = spyOn(mockShapeTool, 'resizeShape');
    mockShapeTool.handleMouseEvent(mouseDown(new Coordinate(100, 100)));
    mockShapeTool.handleMouseEvent(mouseMove(new Coordinate(250, 200)));
    resizeShapeSpy.calls.reset();
    mockShapeTool.handleKeyboardEvent(keyDown('shift', true));
    expect(resizeShapeSpy).toHaveBeenCalledWith(new Coordinate(100, 100), new Coordinate(100, 100));
  });

  it('can keep correct origin on shift down', () => {
    const resizeShapeSpy = spyOn(mockShapeTool, 'resizeShape');
    mockShapeTool.handleMouseEvent(mouseDown(new Coordinate(200, 200)));
    mockShapeTool.handleKeyboardEvent(keyDown('shift', true));
    mockShapeTool.handleMouseEvent(mouseMove(new Coordinate(50, 100)));
    expect(resizeShapeSpy).toHaveBeenCalledWith(new Coordinate(100, 100), new Coordinate(100, 100));
  });

  it('can reset full dimensions on shift up', () => {
    const resizeShapeSpy = spyOn(mockShapeTool, 'resizeShape');
    mockShapeTool.handleMouseEvent(mouseDown(new Coordinate(100, 100)));
    mockShapeTool.handleMouseEvent(mouseMove(new Coordinate(250, 200)));
    resizeShapeSpy.calls.reset();
    mockShapeTool.handleKeyboardEvent(keyDown('shift', true));
    expect(resizeShapeSpy).toHaveBeenCalledWith(new Coordinate(100, 100), new Coordinate(100, 100));
    resizeShapeSpy.calls.reset();
    mockShapeTool.handleKeyboardEvent(keyUp('shift', false));
    expect(resizeShapeSpy).toHaveBeenCalledWith(new Coordinate(150, 100), new Coordinate(100, 100));
  });

  it('does not update current coordinate on shift if not active', () => {
    const updateCurrentCoordSpy = spyOn(mockShapeTool, 'updateCurrentCoord');
    mockShapeTool.handleKeyboardEvent(keyDown('shift', true));
    mockShapeTool.handleKeyboardEvent(keyDown('shift', false));
    expect(updateCurrentCoordSpy).not.toHaveBeenCalled();
  });

  it('does not update current coordinate on mousedown if active', () => {
    const updateCurrentCoordSpy = spyOn(mockShapeTool, 'updateCurrentCoord');
    mockShapeTool.handleMouseEvent(mouseDown(new Coordinate(100, 100)));
    mockShapeTool.handleMouseEvent(mouseMove(new Coordinate(250, 200)));
    updateCurrentCoordSpy.calls.reset();
    mockShapeTool.handleMouseEvent(mouseDown(new Coordinate(400, 400)));
    expect(updateCurrentCoordSpy).not.toHaveBeenCalled();
  });

  it('does not update current coordinate on mousedown if not active', () => {
    const updateCurrentCoordSpy = spyOn(mockShapeTool, 'updateCurrentCoord');
    mockShapeTool.handleMouseEvent(mouseDown(new Coordinate(100, 100)));
    mockShapeTool.handleMouseEvent(mouseMove(new Coordinate(250, 200)));
    updateCurrentCoordSpy.calls.reset();
    mockShapeTool['isActive'] = false;
    mockShapeTool.handleMouseEvent(mouseMove(new Coordinate(400, 400)));
    expect(updateCurrentCoordSpy).not.toHaveBeenCalled();
  });
});
