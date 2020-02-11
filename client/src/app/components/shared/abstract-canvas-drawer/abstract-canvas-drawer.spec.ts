import { SimpleChange, SimpleChanges } from '@angular/core';
import { AbstractCanvasDrawer } from 'src/app/components/shared/abstract-canvas-drawer/abstract-canvas-drawer';
import { Color } from 'src/app/utils/color/color';
import Spy = jasmine.Spy;

describe('AbstractCanvasDrawer', () => {
  class AbstractCanvasDrawerImpl extends AbstractCanvasDrawer {
    calculateColorFromMouseEvent(event: MouseEvent): Color {
      return Color.RED;
    }

    draw(): void {
      return;
    }

    drawIndicator(x: number, y: number): void {
      return;
    }

    shouldRedraw(color: Color): boolean {
      return color === Color.RED;
    }
  }

  const component: AbstractCanvasDrawer = new AbstractCanvasDrawerImpl();
  let drawSpy: Spy;
  let updateColorSpy: Spy;
  let colorChangedSpy: Spy;

  beforeEach(() => {
    drawSpy = spyOn(component, 'draw');
    updateColorSpy = spyOn(component, 'updateColor').and.callThrough();
    colorChangedSpy = spyOn(component.colorChanged, 'emit');
  });

  it('should draw after view init', () => {
    component.ngAfterViewInit();
    expect(drawSpy).toHaveBeenCalled();
  });

  it('should draw on color change', () => {
    component.ngOnChanges({
      color: {
        currentValue: Color.RED,
      } as SimpleChange,
    } as SimpleChanges);
    expect(drawSpy).toHaveBeenCalled();
  });

  it('should redraw on updateColor if shouldRedraw returns true', () => {
    component.updateColor(Color.RED);
    expect(drawSpy).toHaveBeenCalled();
    expect(colorChangedSpy).toHaveBeenCalledWith(Color.RED);
  });

  it('should not redraw if shouldRedraw returns false', () => {
    component.updateColor(Color.BLUE);
    expect(drawSpy).not.toHaveBeenCalled();
    expect(colorChangedSpy).toHaveBeenCalledWith(Color.BLUE);
  });

  it('sets mouseIsDown to true when mouse is down', () => {
    component.onMouseDown({} as MouseEvent);
    expect(component.mouseIsDown).toEqual(true);
  });

  it('updates color on mouse down', () => {
    component.onMouseDown({} as MouseEvent);

    expect(updateColorSpy).toHaveBeenCalledWith(Color.RED);
  });

  it('updates color on mouse move if mouse is down', () => {
    component.onMouseDown({} as MouseEvent);
    component.onMouseMove({} as MouseEvent);

    expect(updateColorSpy).toHaveBeenCalledWith(Color.RED);
  });

  it('does not update color on mouse move if mouse is not down', () => {
    component.onMouseDown({} as MouseEvent);
    component.onMouseUp();
    component.onMouseMove({} as MouseEvent);

    expect(updateColorSpy).toHaveBeenCalledTimes(1);
  });

  it('sets mouseIsDown to false when mouse is up', () => {
    component.onMouseUp();
    expect(component.mouseIsDown).toEqual(false);
  });
});
