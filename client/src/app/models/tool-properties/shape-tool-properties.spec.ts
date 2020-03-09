import { ContourType } from 'src/app/models/tool-properties/contour-type.enum';
import { ShapeToolProperties } from 'src/app/models/tool-properties/shape-tool-properties';
import { ToolType } from 'src/app/models/tools/tool-type.enum';

export class ShapeToolPropertiesImpl extends ShapeToolProperties {
  constructor() {
    super('TYPE' as ToolType);
  }
}
describe('ShapeToolProperties', () => {
  let shapeToolProperties: ShapeToolProperties;

  beforeEach(() => {
    shapeToolProperties = new ShapeToolPropertiesImpl();
  });

  it('can initialize correctly', () => {
    expect(shapeToolProperties.type).toEqual('TYPE' as ToolType);
    expect(shapeToolProperties.contourType).toEqual(ContourType.FILLED_CONTOUR);
    expect(shapeToolProperties.minThickness).toEqual(ShapeToolProperties.MIN_THICKNESS);
    expect(shapeToolProperties.maxThickness).toEqual(ShapeToolProperties.MAX_THICKNESS);
  });
});
