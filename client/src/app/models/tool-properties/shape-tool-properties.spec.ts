import { ContourType } from 'src/app/models/tool-properties/contour-type.enum';
import { ShapeToolProperties } from 'src/app/models/tool-properties/shape-tool-properties';

export class ShapeToolPropertiesImpl extends ShapeToolProperties {
  constructor() {
    super();
  }
}
describe('ShapeToolProperties', () => {
  let shapeToolProperties: ShapeToolProperties;

  beforeEach(() => {
    shapeToolProperties = new ShapeToolPropertiesImpl();
  });

  it('can initialize correctly', () => {
    expect(shapeToolProperties.contourType).toEqual(ContourType.FILLED_CONTOUR);
    expect(shapeToolProperties.minThickness).toEqual(ShapeToolProperties.MIN_THICKNESS);
    expect(shapeToolProperties.maxThickness).toEqual(ShapeToolProperties.MAX_THICKNESS);
  });
});
