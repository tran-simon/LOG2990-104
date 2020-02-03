import { ShapeProperties } from './ShapeProperties';

describe('ShapeProperties', () => {
  let shapeProperties: ShapeProperties;
  beforeEach(() => {
    shapeProperties = new ShapeProperties();
  });
  it('should create', () => {
    expect(shapeProperties).toBeTruthy();
  });
});
