import { ShapeTool } from 'src/app/models/tools/creator-tools/shape-tools/shape-tool';
import { EditorService } from 'src/app/services/editor.service';
import { Color } from 'src/app/utils/color/color';
import { Coordinate } from 'src/app/utils/math/coordinate';
import { Ellipse } from '../../../shapes/ellipse';
import { EllipseContourType, EllipseToolProperties } from '../../../tool-properties/ellipse-tool-properties';

export class EllipseTool extends ShapeTool<EllipseToolProperties> {
  shape: Ellipse;

  constructor(editorService: EditorService) {
    super(editorService);
    this.toolProperties = new EllipseToolProperties();
  }

  protected updateProperties(): void {
    switch (this.toolProperties.contourType) {
      case EllipseContourType.FILLEDCONTOUR:
        this.shape.shapeProperties.strokeWidth = this.toolProperties.strokeWidth;
        this.shape.shapeProperties.fillColor = this.editorService.colorsService.primaryColor;
        this.shape.shapeProperties.strokeColor = this.editorService.colorsService.secondaryColor;
        break;
      case EllipseContourType.FILLED:
        this.shape.shapeProperties.strokeWidth = 0;
        this.shape.shapeProperties.fillColor = this.editorService.colorsService.primaryColor;
        this.shape.shapeProperties.strokeColor = Color.TRANSPARENT;
        break;
      case EllipseContourType.CONTOUR:
        this.shape.shapeProperties.strokeWidth = this.toolProperties.strokeWidth;
        this.shape.shapeProperties.fillColor = Color.TRANSPARENT;
        this.shape.shapeProperties.strokeColor = this.editorService.colorsService.secondaryColor;
        break;
    }
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
