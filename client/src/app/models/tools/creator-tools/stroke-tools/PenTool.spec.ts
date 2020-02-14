// import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DrawingSurfaceComponent } from '../../../../components/pages/editor/drawing-surface/drawing-surface.component';
import { PenTool } from './PenTool';
import Spy = jasmine.Spy;

describe('PenTool', () => {
  let fixture: ComponentFixture<DrawingSurfaceComponent>;
  let component: DrawingSurfaceComponent;
  let penTool: PenTool;
  let mouseSpy: Spy;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DrawingSurfaceComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DrawingSurfaceComponent);
    component = fixture.componentInstance;
    penTool = new PenTool(component);
    fixture.detectChanges();
    mouseSpy.calls.reset();
  });
  it('Should create a new path on mousedown event', () => {
    mouseSpy = spyOn(penTool, 'handleToolMouseEvent').and.callThrough();
    expect(mouseSpy).toHaveBeenCalled();
  });
});
