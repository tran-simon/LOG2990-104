import { ShapeProperties } from 'src/app/models/shape-properties';

describe('ShapeProperties', () => {
  let shapeProperties: ShapeProperties;
  beforeEach(() => {
    shapeProperties = new ShapeProperties();
  });
  it('should create', () => {
    expect(shapeProperties).toBeTruthy();
  });
});
