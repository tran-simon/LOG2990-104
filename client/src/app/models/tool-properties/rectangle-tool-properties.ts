import { ShapeToolProperties } from 'src/app/models/tool-properties/shape-tool-properties';
import { ToolType } from 'src/app/models/tools/tool-type.enum';

export class RectangleToolProperties extends ShapeToolProperties {
  constructor(
  ) {
    super(ToolType.Rectangle);
  }
}
