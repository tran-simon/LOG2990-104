/* tslint:disable:no-magic-numbers */
import createSpyObj = jasmine.createSpyObj;
import { DrawingSurfaceComponent } from '@components/pages/editor/drawing-surface/drawing-surface.component';
import { Color } from '@utils/color/color';
import { EditorUtils } from '@utils/color/editor-utils';
import { Coordinate } from '@utils/math/coordinate';

describe('EditorUtils', () => {
  it('can get color at a position in a canvas', () => {
    const context: CanvasRenderingContext2D = createSpyObj('canvasContext', { getImageData: { data: [100, 200, 255] } });
    const color = EditorUtils.colorAtPointInCanvas(context, new Coordinate());

    expect(color.r255).toEqual(100);
    expect(color.g255).toEqual(200);
    expect(color.b255).toEqual(255);
  });

  it('generates a canvas and calls colorAtPointInCanvas on colorAtPoint', (done) => {
    const context = {} as CanvasRenderingContext2D;
    const promise: Promise<CanvasRenderingContext2D> = new Promise<CanvasRenderingContext2D>((resolve) => {
      resolve(context);
    });
    spyOn(EditorUtils, 'viewToCanvas').and.returnValue(promise);
    spyOn(EditorUtils, 'colorAtPointInCanvas').and.returnValue(Color.BLUE);

    const view = {} as DrawingSurfaceComponent;
    EditorUtils.colorAtPoint(view, new Coordinate()).then((color) => {
      expect(color).toEqual(Color.BLUE);
      expect(EditorUtils.viewToCanvas).toHaveBeenCalledWith(view);
      expect(EditorUtils.colorAtPointInCanvas).toHaveBeenCalledWith(context, new Coordinate());
      done();
    });
  });
});
