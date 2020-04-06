/* tslint:disable:no-magic-numbers */
import createSpyObj = jasmine.createSpyObj;
import { DrawingSurfaceComponent } from '@components/pages/editor/drawing-surface/drawing-surface.component';
import { Color } from '@utils/color/color';
import { EditorUtil } from '@utils/color/editor-util';
import { Coordinate } from '@utils/math/coordinate';

describe('EditorUtil', () => {
  it('can get color at a position in a canvas', () => {
    const context: CanvasRenderingContext2D = createSpyObj('canvasContext', { getImageData: { data: [100, 200, 255] } });
    const color = EditorUtil.colorAtPointInCanvas(context, new Coordinate());

    expect(color.r255).toEqual(100);
    expect(color.g255).toEqual(200);
    expect(color.b255).toEqual(255);
  });

  it('generates a canvas and calls colorAtPointInCanvas on colorAtPoint', (done) => {
    const context = {} as CanvasRenderingContext2D;
    const promise: Promise<CanvasRenderingContext2D> = new Promise<CanvasRenderingContext2D>((resolve) => {
      resolve(context);
    });
    spyOn(EditorUtil, 'viewToCanvas').and.returnValue(promise);
    spyOn(EditorUtil, 'colorAtPointInCanvas').and.returnValue(Color.BLUE);

    const view = {} as DrawingSurfaceComponent;
    EditorUtil.colorAtPoint(view, new Coordinate()).then((color) => {
      expect(color).toEqual(Color.BLUE);
      expect(EditorUtil.viewToCanvas).toHaveBeenCalledWith(view);
      expect(EditorUtil.colorAtPointInCanvas).toHaveBeenCalledWith(context, new Coordinate());
      done();
    });
  });
});
