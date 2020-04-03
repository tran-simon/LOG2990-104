import { PolygonToolProperties } from '@tool-properties/creator-tool-properties/shape-tool-properties/polygon-tool-properties';
import { EditorService } from '../../../../services/editor.service';
import { KeyboardListenerService } from '../../../../services/event-listeners/keyboard-listener/keyboard-listener.service';
import { Coordinate } from '../../../../utils/math/coordinate';
import { Polygon } from '../../../shapes/polygon';
import { ShapeTool } from './shape-tool';

export class PolygonTool extends ShapeTool {
  shape: Polygon;
  toolProperties: PolygonToolProperties;

  constructor(editorService: EditorService) {
    super(editorService);
    this.toolProperties = new PolygonToolProperties();
    this.setEqualDimensions(true);
    this.keyboardListener.addEvents([
      [
        KeyboardListenerService.getIdentifier('Shift', false, false, 'keyup'),
        () => {
          this.setEqualDimensions(true);
        },
      ],
    ]);
    this.toolProperties = new PolygonToolProperties();
  }

  createShape(): Polygon {
    return new Polygon(this.initialMouseCoord, this.toolProperties.nEdges.value);
  }

  resizeShape(dimensions: Coordinate, origin: Coordinate = this.shape.origin): void {
    this.shape.origin = origin;
    this.shape.width = dimensions.x;
    this.shape.height = dimensions.y;
    this.shape.updatePoints();
    this.shape.drawPoints();
  }
}
