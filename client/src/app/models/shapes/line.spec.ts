import { Line } from 'src/app/models/shapes/line';

describe('Line', () => {
  let line: Line;
  beforeEach(() => {
    line = new Line();
  });
  it('Should have center.x at 0 on init ', () => {
    expect(line.center.x).toBe(0);
  });
  it('Should have center.y at 0 on init ', () => {
    expect(line.center.y).toBe(0);
  });
  it('should create', () => {
    expect(line).toBeTruthy();
  });
});
