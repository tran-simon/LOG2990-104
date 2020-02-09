import { SimpleChanges } from '@angular/core';
import { AbstractCanvasDrawer } from 'src/app/components/shared/abstract-canvas-drawer/abstract-canvas-drawer';
import Spy = jasmine.Spy;

describe('AbstractCanvasDrawer', () => {
  class AbstractCanvasDrawerImpl extends AbstractCanvasDrawer {
    draw(): void {
      return;
    }
    drawIndicator(x: number, y: number): void {
      return;
    }
    onMouseMove(event: MouseEvent): void {
      return;
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

  it('should draw on change', () => {
    component.ngOnChanges({} as SimpleChanges);
    expect(drawSpy).toHaveBeenCalled();
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
