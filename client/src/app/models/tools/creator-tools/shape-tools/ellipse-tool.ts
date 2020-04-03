import { EllipseToolProperties } from '@tool-properties/creator-tool-properties/shape-tool-properties/ellipse-tool-properties';
import { ShapeTool } from 'src/app/models/tools/creator-tools/shape-tools/shape-tool';
import { EditorService } from 'src/app/services/editor.service';
import { Coordinate } from 'src/app/utils/math/coordinate';
import { Ellipse } from '../../../shapes/ellipse';

export class EllipseTool extends ShapeTool {
  shape: Ellipse;

  constructor(editorService: EditorService) {
    super(editorService);
    this.toolProperties = new EllipseToolProperties();
  }

  createShape(): Ellipse {
    return new Ellipse(this.initialMouseCoord);
  }

  resizeShape(dimensions: Coordinate, origin: Coordinate = this.shape.origin): void {
    this.shape.origin = origin;
    this.shape.radiusX = dimensions.x / 2;
    this.shape.radiusY = dimensions.y / 2;
  }
}
