/* tslint:disable:no-magic-numbers */
import { MathUtil } from './math-util';

describe('MathUtil', () => {
  it('can fit', () => {
    expect(MathUtil.fit(10, 3, 7)).toEqual(7);
    expect(MathUtil.fit(7, 3, 7)).toEqual(7);
    expect(MathUtil.fit(5, 3, 7)).toEqual(5);
    expect(MathUtil.fit(3, 3, 7)).toEqual(3);
    expect(MathUtil.fit(-3, 3, 7)).toEqual(3);
  });

  it('can fit correct angle', () => {
    expect(MathUtil.fitAngle(200)).toBeCloseTo(200, 5);
  });
  it('can fit angle greater than 360', () => {
    expect(MathUtil.fitAngle(400)).toBeCloseTo(40, 5);
    expect(MathUtil.fitAngle(800)).toBeCloseTo(80, 5);
  });
  it('can fit angle smaller than 0', () => {
    expect(MathUtil.fitAngle(-100)).toBeCloseTo(260, 5);
    expect(MathUtil.fitAngle(-800)).toBeCloseTo(280, 5);
  });

  it('can get hex', ()=>{
    expect(MathUtil.toHex(255)).toEqual('ff');
    expect(MathUtil.toHex(255, 6)).toEqual('0000ff');
  })
});
