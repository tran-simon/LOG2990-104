import { Rectangle } from 'src/app/models/shapes/rectangle';
import { RectangleToolProperties } from 'src/app/models/tool-properties/rectangle-tool-properties';
import { ShapeTool } from 'src/app/models/tools/creator-tools/shape-tools/shape-tool';
import { EditorService } from 'src/app/services/editor.service';
import { Coordinate } from 'src/app/utils/math/coordinate';
import { ToolType } from '../../tool-type.enum';

export class RectangleTool extends ShapeTool<RectangleToolProperties> {
  shape: Rectangle;

  constructor(editorService: EditorService) {
    super(editorService);
    this.toolProperties = new RectangleToolProperties();
    this.type = ToolType.Rectangle;
  }

  createShape(): Rectangle {
    return new Rectangle(this.initialMouseCoord);
  }

  resizeShape(dimensions: Coordinate, origin: Coordinate = this.shape.origin): void {
    this.shape.origin = origin;
    this.shape.width = dimensions.x;
    this.shape.height = dimensions.y;
  }
}
