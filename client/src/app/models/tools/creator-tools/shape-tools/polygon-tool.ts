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

  updateCurrentCoord(c: Coordinate): void {
    // todo - refactor
    this.previewArea.origin = this.initialMouseCoord;
    this.previewArea.end = c;

    let dimensions: Coordinate;
    const delta = Coordinate.substract(c, this.initialMouseCoord);

    dimensions = new Coordinate(this.previewArea.width, this.previewArea.height);

    this.shape.updatePoints(dimensions, delta, this.previewArea);
    this.shape.drawPoints();
  }

  resizeShape(dimensions: Coordinate, origin: Coordinate = this.shape.origin): void {
    // this.shape.origin = origin;
    /*this.shape.width = dimensions.x;
    this.shape.height = dimensions.y;*/
    // this.shape.updatePoints(dimensions, origin, this.previewArea);
    this.shape.drawPoints();
  }
}
