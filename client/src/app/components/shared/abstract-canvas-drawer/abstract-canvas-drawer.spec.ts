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
  beforeEach(() => {
    drawSpy = spyOn(component, 'draw');
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

  it('should not redraw if shouldRedraw returns false', () => {
    component.updateColor(Color.BLUE);
    expect(drawSpy).not.toHaveBeenCalled();
  });

  it('sets mouseIsDown to true when mouse is down', () => {
    component.onMouseDown({} as MouseEvent);
    expect(component.mouseIsDown).toEqual(true);
  });

  it('sets mouseIsDown to false when mouse is up', () => {
    component.onMouseUp();
    expect(component.mouseIsDown).toEqual(false);
  });
});
