/* tslint:disable:no-magic-numbers */
import { Color } from '@utils/color/color';
import { EraserUtils } from './eraser-utils';
import createSpyObj = jasmine.createSpyObj;

describe('EraserUtils', () => {
  it('can get color from index', () => {
    expect(EraserUtils.colorFromIndex(1)).toEqual(Color.rgb255(0, 0, 5));
  });

  it('can get index from color', () => {
    expect(EraserUtils.indexFromColor(Color.rgb255(0, 0, 5))).toEqual(1);
  });

  it('throws an error if there are no available colors', () => {
    expect(() => EraserUtils.assignColorToShapeFromIndex({} as SVGElement, 9999999)).toThrow(new Error('Too many drawings'));
  });

  it('can assign color to shape from index', () => {
    const node = createSpyObj('node', ['style']);
    node.style.and.returnValue({
      fill: '',
      stroke: '',
    });

    EraserUtils.assignColorToShapeFromIndex(node, 1);
    expect(node.style.fill).toEqual(Color.rgb255(0, 0, 5).rgbString);
    expect(node.style.stroke).toEqual(Color.rgb255(0, 0, 5).rgbString);
  });

  it('does not assign color if style is none', () => {
    const node = createSpyObj('node', ['style']);
    node.style = {
      fill: 'none',
      stroke: 'none',
    };

    EraserUtils.assignColorToShapeFromIndex(node, 1);
    expect(node.style.fill).toEqual('none');
    expect(node.style.stroke).toEqual('none');
  });

  it('can sanitize svg node', () => {
    const node = createSpyObj('node', ['setAttribute', 'style']);
    node.style.and.returnValue({
      strokeWidth: '1',
    });

    EraserUtils.sanitizeSvgNode(node);
    expect(node.style.strokeWidth).toEqual('3');
    expect(node.setAttribute).toHaveBeenCalledWith('filter', '');
  });

  it('can sanitize a node and its children', () => {
    const sanitizeSvgNodeSpy = spyOn(EraserUtils, 'sanitizeSvgNode');
    const assignColorSpy = spyOn(EraserUtils, 'assignColorToShapeFromIndex');

    const node = createSpyObj('node', ['childNodes']);
    node.id = 'shape-7';

    node.childNodes = [];

    EraserUtils.sanitizeAndAssignColorToSvgNode(node, 7);

    expect(sanitizeSvgNodeSpy).toHaveBeenCalledWith(node);
    expect(assignColorSpy).toHaveBeenCalledWith(node, 7);
  });
});
