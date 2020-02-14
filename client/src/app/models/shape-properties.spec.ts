import { ShapeProperties } from 'src/app/models/shape-properties';

describe('ShapeProperties', () => {
  let shapeProperties: ShapeProperties;
  beforeEach(() => {
    shapeProperties = new ShapeProperties();
  });
  it('should create', () => {
    expect(shapeProperties).toBeTruthy();
  });
  it('should be visible', () => {
    shapeProperties.visible = true;
    expect(shapeProperties.visibility).toEqual('visible');
  });
  it('should be visible', () => {
    shapeProperties.visible = false;
    expect(shapeProperties.visibility).toEqual('hidden');
  });
});
