/* tslint:disable:no-string-literal */
import { TestBed } from '@angular/core/testing';
import { SharedModule } from '@components/shared/shared.module';
import { Ellipse } from '@models/shapes/ellipse';
import { Rectangle } from '@models/shapes/rectangle';
import { EditorService } from '@services/editor.service';
import { mouseDown, mouseMove, mouseUp } from '@tools/creator-tools/stroke-tools/stroke-tool.spec';
import { EraserTool } from '@tools/editing-tools/eraser-tool';
import { Color } from '@utils/color/color';
import { Coordinate } from '@utils/math/coordinate';

describe('EraserTool', () => {
  let eraser: EraserTool;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [EditorService],
    }).compileComponents();

    eraser = new EraserTool(TestBed.get(EditorService));
  });

  it('should create an instance', () => {
    expect(eraser).toBeDefined();
  });

  it('updates selection on mouse move', () => {
    const updateSelectionSpy = spyOn(eraser, 'updateSelection');
    eraser.handleMouseMove(mouseMove(new Coordinate()));
    expect(updateSelectionSpy).toHaveBeenCalled();
  });

  it('erases shapes on mouse move if active', () => {
    const eraseSpy = spyOn(eraser.editorService, 'removeShapeFromView');

    const ellipse = new Ellipse();
    eraser['isActive'] = true;
    eraser['selectedShape'] = ellipse;

    eraser.handleMouseMove(mouseMove(new Coordinate()));

    expect(eraseSpy).toHaveBeenCalledWith(ellipse);
  });

  it('erases selected shape and updates selection on mouse down', () => {
    const updateSelectionSpy = spyOn(eraser, 'updateSelection');
    const eraseSpy = spyOn(eraser.editorService, 'removeShapeFromView');

    const ellipse = new Ellipse();
    eraser['isActive'] = true;
    eraser['selectedShape'] = ellipse;

    eraser.handleMouseDown(mouseDown(new Coordinate()));

    expect(updateSelectionSpy).toHaveBeenCalled();
    expect(eraseSpy).toHaveBeenCalledWith(ellipse);
    expect(eraser['removedShapes'][0]).toEqual(ellipse);
  });

  it('sends the command on mouseup if there are shapes to remove', () => {
    const addCommandSpy = spyOn(eraser.editorService.commandReceiver, 'add');

    const ellipse = new Ellipse();
    eraser['removedShapes'] = [ellipse];
    eraser['isActive'] = true;

    eraser.handleMouseUp(mouseUp(new Coordinate()));

    expect(addCommandSpy).toHaveBeenCalled();
  });
  it('does not send command on mouseup if there are no shapes to remove', () => {
    const addCommandSpy = spyOn(eraser.editorService.commandReceiver, 'add');
    eraser.handleMouseUp(mouseUp(new Coordinate()));
    expect(addCommandSpy).not.toHaveBeenCalled();
  });

  it('resets selection on updateSelection', () => {
    eraser.updateSelection();
    expect(eraser.editorService['shapesBuffer'].length).toEqual(0);
    expect(eraser['selectedShape']).not.toBeDefined();
  });

  it('highlights selected shapes on updateSelection', () => {
    spyOn(eraser, 'getShapeIsIntersecting').and.returnValue(true);
    const shape = new Rectangle();
    eraser.editorService.addShapesToBuffer([shape]);
    eraser.editorService.applyShapesBuffer();

    eraser.updateSelection();

    expect(shape.svgNode.style.stroke).toEqual(Color.RED.rgbString);
  });

  it('reverts shapes that are not selected on updateSelection', () => {
    spyOn(eraser, 'getShapeIsIntersecting').and.returnValue(false);
    const shape = new Rectangle();
    eraser.editorService.addShapesToBuffer([shape]);
    eraser.editorService.applyShapesBuffer();
    EraserTool.highlightShape(shape);
    expect(shape.svgNode.style.stroke).toEqual(Color.RED.rgbString);

    eraser.updateSelection();

    expect(shape.svgNode.style.stroke).not.toEqual(Color.RED.rgbString);
  });
});
