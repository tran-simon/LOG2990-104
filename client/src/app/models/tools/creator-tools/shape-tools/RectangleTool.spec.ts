/*tslint:disable:no-string-literal*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { Coordinate } from 'src/app/models/Coordinate';
import { RectangleTool } from './RectangleTool';

describe('ShapeTool', () => {
  let rectangleTool: RectangleTool;
  let fixture: ComponentFixture<DrawingSurfaceComponent>;
  let surface: DrawingSurfaceComponent;

  /*const mouseDown = (c: Coordinate = new Coordinate()): MouseEvent => {
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
  };*/

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DrawingSurfaceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingSurfaceComponent);
    fixture.detectChanges();
    surface = fixture.componentInstance;
    rectangleTool = new RectangleTool(surface);
  });

  it('can initialize new Rectangle', () => {
    rectangleTool.initShape(new Coordinate(100, 100));
    expect(rectangleTool.shape.origin).toEqual(new Coordinate(100, 100));
    expect(surface.svg.nativeElement.querySelector('rect')).toBeTruthy();
  });

  it('can resize Rectangle', () => {
    rectangleTool.initShape(new Coordinate(100, 100));
    rectangleTool.resizeShape(new Coordinate(75, 50));
    expect(rectangleTool.shape.width).toEqual(75);
    expect(rectangleTool.shape.height).toEqual(50);
  });

  it('can resize and reposition Rectangle', () => {
    rectangleTool.initShape(new Coordinate(100, 100));
    rectangleTool.resizeShape(new Coordinate(75, 50), new Coordinate(125, 125));
    expect(rectangleTool.shape.origin).toEqual(new Coordinate(125, 125));
    expect(rectangleTool.shape.width).toEqual(75);
    expect(rectangleTool.shape.height).toEqual(50);
  });
});
