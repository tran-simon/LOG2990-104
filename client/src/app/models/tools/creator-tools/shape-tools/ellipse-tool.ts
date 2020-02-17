import { DrawingSurfaceComponent } from '../../../../components/pages/editor/drawing-surface/drawing-surface.component';
import { Ellipse } from '../../../../models/shapes/ellipse';
import { EllipseContourType, EllipseToolProperties } from '../../../tool-properties/ellipse-tool-properties';
import { ShapeTool } from './shape-tool';
import { SelectedColorsService } from '../../../../services/selected-colors.service';
import { Coordinate } from '../../../../utils/math/coordinate';
import { Color } from '../../../../utils/color/color';

export class EllipseTool extends ShapeTool {
  protected _toolProperties: EllipseToolProperties;
  private _ellipse: Ellipse;

  get shape(): Ellipse {
    return this._ellipse;
  }

  constructor(drawingSurface: DrawingSurfaceComponent, private selectedColors: SelectedColorsService) {
    super(drawingSurface);
  }

  initShape(c: Coordinate): void {
    this._ellipse = new Ellipse(c);
    switch (this._toolProperties.contourType) {
      case EllipseContourType.FILLEDCONTOUR:
        this._ellipse.properties.strokeWidth = this._toolProperties.thickness;
        this._ellipse.properties.fillColor = this.selectedColors.primaryColor;
        this._ellipse.properties.strokeColor = this.selectedColors.secondaryColor;
        break;
      case EllipseContourType.FILLED:
        this._ellipse.properties.strokeWidth = 0;
        this._ellipse.properties.fillColor = this.selectedColors.primaryColor;
        this._ellipse.properties.strokeColor = Color.TRANSPARENT;
        break;
      case EllipseContourType.CONTOUR:
        this._ellipse.properties.strokeWidth = this._toolProperties.thickness;
        this._ellipse.properties.fillColor = Color.TRANSPARENT;
        this._ellipse.properties.strokeColor = this.selectedColors.secondaryColor;
        break;
    }
    this._ellipse.updateProperties();
    this.drawShape();
  }

  resizeShape(dimensions: Coordinate, origin: Coordinate = this._ellipse.origin): void {
    this._ellipse.origin = origin;
    this._ellipse.radiusX = dimensions.x / 2;
    this._ellipse.radiusY = dimensions.y / 2;
  }
}
