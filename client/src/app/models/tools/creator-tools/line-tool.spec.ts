/*tslint:disable:no-string-literal*/
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { SelectedColorsService } from 'src/app/services/selected-colors.service';
import { Coordinate } from 'src/app/utils/math/coordinate';
import { LineJunctionType } from '../../tool-properties/line-tool-properties';
import { LineTool } from './line-tool';

describe('LineTool', () => {
  let lineTool: LineTool;
  let fixture: ComponentFixture<DrawingSurfaceComponent>;
  let surface: DrawingSurfaceComponent;
  let selectedColorsService: SelectedColorsService;

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

  /*const mouseUp = (c: Coordinate = new Coordinate()): MouseEvent => {
    return {
      type: 'mouseup',
      offsetX: c.x,
      offsetY: c.y,
    } as MouseEvent;
  };*/

  const dblClick = (c: Coordinate = new Coordinate()): MouseEvent => {
    return {
      type: 'dblclick',
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

  /*const initBasicLine = () => {
    lineTool.handleMouseEvent(mouseDown(new Coordinate(50, 50)));
    lineTool.handleMouseEvent(mouseMove(new Coordinate(150, 150)));
    lineTool.handleMouseEvent(mouseDown(new Coordinate(150, 150)));
    lineTool.handleMouseEvent(mouseMove(new Coordinate(15, 15)));
  }*/

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DrawingSurfaceComponent],
      providers: [SelectedColorsService],
    }).compileComponents();
  }));

  beforeEach(() => {
    selectedColorsService = new SelectedColorsService();
    fixture = TestBed.createComponent(DrawingSurfaceComponent);
    fixture.detectChanges();
    surface = fixture.componentInstance;
    lineTool = new LineTool(surface, selectedColorsService);
  });

  it('should call removeLastPoint on backspace if isActive', () => {
    lineTool.initLine();
    lineTool['isActive'] = true;
    const removeSpy = spyOn(lineTool.shape, 'removeLastPoint');
    lineTool.handleKeyboardEvent(keyDown('backspace'));
    expect(removeSpy).toHaveBeenCalled();
  });

  it('should not call removeLastPoint on backspace if not isActive', () => {
    lineTool.initLine();
    lineTool['isActive'] = false;
    const removeSpy = spyOn(lineTool.shape, 'removeLastPoint');
    lineTool.handleKeyboardEvent(keyDown('backspace'));
    expect(removeSpy).not.toHaveBeenCalled();
  });

  it('should call cancelShape on escape if isActive', () => {
    lineTool.initLine();
    lineTool['isActive'] = false;
    const cancelSpy = spyOn(lineTool, 'cancelShape');
    lineTool.handleKeyboardEvent(keyDown('escape'));
    expect(cancelSpy).not.toHaveBeenCalled();
  });

  it('should not call cancelShape on escape if not isActive', () => {
    lineTool.initLine();
    lineTool['isActive'] = false;
    const cancelSpy = spyOn(lineTool, 'cancelShape');
    lineTool.handleKeyboardEvent(keyDown('escape'));
    expect(cancelSpy).not.toHaveBeenCalled();
  });

  it('should determine lock method and update on shift down', () => {
    lineTool.initLine();
    const lockSpy = spyOn(lineTool, 'determineLockMethod').and.callThrough();
    const updateSpy = spyOn(lineTool.shape, 'updateCurrentCoord');
    lineTool.handleKeyboardEvent(keyDown('shift', true));
    expect(lockSpy).toHaveBeenCalled();
    expect(updateSpy).toHaveBeenCalled();
  });

  it('should reset lock method and update on shift up', () => {
    lineTool.initLine();
    const updateSpy = spyOn(lineTool.shape, 'updateCurrentCoord');
    lineTool.handleKeyboardEvent(keyUp('shift'));
    expect(lineTool['lockMethod']).toEqual(lineTool['calculateNoLock']);
    expect(updateSpy).toHaveBeenCalled();
  });

  it('can init line', () => {
    const drawSpy = spyOn(lineTool, 'drawShape');
    lineTool.initLine();
    expect(lineTool.shape).toBeTruthy();
    expect(lineTool.shape.properties.strokeColor).toEqual(lineTool['selectedColors'].primaryColor);
    expect(lineTool.shape.properties.fillColor).toEqual(lineTool['selectedColors'].secondaryColor);
    expect(lineTool.shape.properties.strokeWidth).toEqual(lineTool['_toolProperties'].thickness);
    expect(drawSpy).toHaveBeenCalled();
  });

  it('can init line with junctions', () => {
    lineTool['_toolProperties'].junctionType = LineJunctionType.POINTS;
    lineTool.initLine();
    expect((lineTool.shape.properties.thickness = lineTool['_toolProperties'].junctionDiameter));
  });

  it('can init line without junctions', () => {
    lineTool['_toolProperties'].junctionType = LineJunctionType.EMPTY;
    lineTool.initLine();
    expect((lineTool.shape.properties.thickness = 0));
  });

  it('should call endLine on double click if isActive', () => {
    lineTool.initLine();
    const endSpy = spyOn(lineTool.shape, 'endLine');
    lineTool['isActive'] = true;
    lineTool.handleMouseEvent(dblClick());
    expect(endSpy).toHaveBeenCalled();
  });

  it('should not endLine on double click if not isActive', () => {
    lineTool.initLine();
    const endSpy = spyOn(lineTool.shape, 'endLine');
    lineTool['isActive'] = false;
    lineTool.handleMouseEvent(dblClick());
    expect(endSpy).not.toHaveBeenCalled();
  });

  it('should update current coordinate on mouseMove if isActive', () => {
    lineTool.initLine();
    const updateSpy = spyOn(lineTool.shape, 'updateCurrentCoord');
    lineTool['isActive'] = true;
    lineTool.handleMouseEvent(mouseMove());
    expect(updateSpy).toHaveBeenCalled();
  });

  it('should confirm point on mouseDown if isActive', () => {
    lineTool.initLine();
    const confirmSpy = spyOn(lineTool.shape, 'confirmPoint');
    lineTool['isActive'] = true;
    lineTool.handleMouseEvent(mouseDown());
    expect(confirmSpy).toHaveBeenCalled();
  });

  it('should init lint on mouseDown if not isActive', () => {
    const initSpy = spyOn(lineTool, 'initLine');
    lineTool['isActive'] = false;
    lineTool.handleMouseEvent(mouseDown());
    expect(initSpy).toHaveBeenCalled();
  });

  it('can determine horizontal lock method', () => {
    lineTool.handleMouseEvent(mouseDown(new Coordinate(100, 100)));
    lineTool.handleMouseEvent(mouseMove(new Coordinate(200, 110)));
    expect(lineTool.determineLockMethod()).toEqual(lineTool['calculateHorizontalLock']);
  });

  it('can determine vertical lock method', () => {
    lineTool.handleMouseEvent(mouseDown(new Coordinate(100, 100)));
    lineTool.handleMouseEvent(mouseMove(new Coordinate(110, 2000)));
    expect(lineTool.determineLockMethod()).toEqual(lineTool['calculateVerticalLock']);
  });

  it('can determine positive diagonal lock method', () => {
    lineTool.handleMouseEvent(mouseDown(new Coordinate(100, 100)));
    lineTool.handleMouseEvent(mouseMove(new Coordinate(140, 160)));
    expect(lineTool.determineLockMethod()).toEqual(lineTool['calculatePositiveDiagonalLock']);
  });

  it('can determine negative diagonal lock method', () => {
    lineTool.handleMouseEvent(mouseDown(new Coordinate(100, 100)));
    lineTool.handleMouseEvent(mouseMove(new Coordinate(160, 50)));
    expect(lineTool.determineLockMethod()).toEqual(lineTool['calculateNegativeDiagonalLock']);
  });

  it('can determine no lock method', () => {
    lineTool['isActive'] = false;
    expect(lineTool.determineLockMethod()).toEqual(lineTool['calculateNoLock']);
  });
});
