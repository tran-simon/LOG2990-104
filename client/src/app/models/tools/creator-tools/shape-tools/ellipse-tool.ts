import { EllipseContourType } from 'src/app/models/tool-properties/ellipse-contour-type';
import { ShapeTool } from 'src/app/models/tools/creator-tools/shape-tools/shape-tool';
import { EditorService } from 'src/app/services/editor.service';
import { Color } from 'src/app/utils/color/color';
import { Coordinate } from 'src/app/utils/math/coordinate';
import { Ellipse } from '../../../shapes/ellipse';
import { EllipseToolProperties } from '../../../tool-properties/ellipse-tool-properties';

export class EllipseTool extends ShapeTool<EllipseToolProperties> {
  shape: Ellipse;

  constructor(editorService: EditorService) {
    super(editorService);
    this.toolProperties = new EllipseToolProperties();
  }

  protected updateProperties(): void {
    const { contourType, strokeWidth } = this.toolProperties;
    const { primaryColor, secondaryColor } = this.editorService.colorsService;

    this.shape.shapeProperties.strokeWidth = contourType === EllipseContourType.FILLED ? 0 : strokeWidth;
    this.shape.shapeProperties.fillColor = contourType === EllipseContourType.CONTOUR ? Color.TRANSPARENT : primaryColor;
    this.shape.shapeProperties.strokeColor = contourType === EllipseContourType.FILLED ? Color.TRANSPARENT : secondaryColor;
    this.shape.updateProperties();
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
