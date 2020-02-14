import { Color } from '../utils/color/color';
import { CompositeLine } from './CompositeLine';
import { Coordinate } from './Coordinate';
import { Line } from './Line';

describe('CompositeLine', () => {
  let cLine: CompositeLine;
  const coordZero = new Coordinate(0, 0);
  const coord1 = new Coordinate(2, 2);
  const coord2 = new Coordinate(17, 8);
  const coord3 = new Coordinate(2, 3);
  beforeEach(() => {
    cLine = new CompositeLine();
  });
  it('Should init with line with only (0, 0) coordinates', () => {
    expect(cLine.origin).toEqual(coordZero);
  });
  it('Should call addPoint when confirming point', () => {
    const addPointSpy = spyOn(cLine, 'addPoint');
    cLine.confirmPoint();
    expect(addPointSpy).toHaveBeenCalledWith(cLine.currentLine.endCoord);
  });
  it('Should call addLine and addJunction when adding point', () => {
    const addLineSpy = spyOn(cLine, 'addLine');
    const addJunctionSpy = spyOn(cLine, 'addJunction');
    cLine.addPoint(coord1);
    expect(addLineSpy).toHaveBeenCalledWith(coord1);
    expect(addJunctionSpy).toHaveBeenCalledWith(coord1);
  });
  it('Should add line at the end of lineArray', () => {
    cLine.addLine(coord1);
    expect(cLine.lineArray.pop()).toEqual(new Line(coord1));
    expect(cLine.svgNode.querySelector('line')).toBeTruthy();
  });
  it('Should add junction at the end of junctionArray and add propreties to the new junction', () => {
    cLine.addJunction(coord1);
    expect(cLine.currentJunction.svgNode.style.fill).toEqual(Color.BLACK.rgbString);
    expect(cLine.svgNode.querySelector('ellipse')).toBeTruthy();
  });
  it('Should update the current line', () => {
    cLine.updateCurrentCoord(coord2);
    expect(cLine.lineArray[cLine.lineArray.length - 1].endCoord).toEqual(coord2);
  });
  it('Should call removePoints twice to remove two points ', () => {
    const removeLastPointSpy = spyOn(cLine, 'removeLastPoint');
    cLine.endLine(coord3);
    expect(removeLastPointSpy).toHaveBeenCalledTimes(2);
  });
  it('Should add a junction because max distance is to long', () => {
    const addJunctionSpy = spyOn(cLine, 'addJunction');
    cLine.addPoint(coord1);
    cLine.endLine(coord2);
    expect(addJunctionSpy).toHaveBeenCalledWith(cLine.currentLine.endCoord);
  });
  it('Should snap so should update current coordinates', () => {
    const updateCurrentCoordSpy = spyOn(cLine, 'updateCurrentCoord');
    cLine.endLine(coord1);
    expect(updateCurrentCoordSpy).toHaveBeenCalledWith(cLine.lineArray[0].startCoord);
  });
  it('Should return false because there are no elements to remove', () => {
    cLine.lineArray.pop();
    cLine.junctionArray.pop();
    expect(cLine.removeLastPoint()).toEqual(false);
  });
  it('Should return false because there are no elements left after remove', () => {
    expect(cLine.removeLastPoint()).toEqual(false);
  });
  it('Should return true and should give the end coordinates of the removed line to the last line', () => {
    const removeChildSpy = spyOn(cLine.svgNode, 'removeChild');
    cLine.addPoint(coord3);
    cLine.addPoint(coord2);
    const lastLine = cLine.lineArray[cLine.lineArray.length - 1];
    const lastJunction = cLine.junctionArray[cLine.junctionArray.length - 1];
    const arrayJunctionLength: number = cLine.junctionArray.length;
    const arrayLineLength: number = cLine.lineArray.length;
    cLine.removeLastPoint();
    expect(cLine.lineArray.length).toEqual(arrayLineLength - 1);
    expect(cLine.junctionArray.length).toEqual(arrayJunctionLength - 1);
    expect(cLine.currentLine.endCoord).toEqual(lastLine.endCoord);
    expect(removeChildSpy).toHaveBeenCalledWith(lastLine.svgNode);
    expect(removeChildSpy).toHaveBeenCalledWith(lastJunction.svgNode);
    expect(cLine.removeLastPoint).toBeTruthy();
  });
  it('Should set origin to given cooridinate', () => {
    cLine.origin = coord2;
    expect(cLine.lineArray[0].startCoord).toEqual(coord2);
  });
});
