import { DrawingSurfaceComponent } from '../../../../components/pages/editor/drawing-surface/drawing-surface.component';
import { SelectedColorsService } from '../../../../services/selected-colors.service';
import { Color } from '../../../../utils/color/color';
import { Coordinate } from '../../../../utils/math/coordinate';
import { Polygon } from '../../../shapes/polygon';
import { PolygonContourType, PolygonToolProperties } from '../../../tool-properties/polygon-tool-properties';
import { ShapeTool } from './shape-tool';

export class PolygonTool extends ShapeTool {
  protected _toolProperties: PolygonToolProperties;
  private polygon: Polygon;

  get shape(): Polygon {
    return this.polygon;
  }

  constructor(drawingSurface: DrawingSurfaceComponent, private selectedColors: SelectedColorsService) {
    super(drawingSurface);
  }

  initShape(c: Coordinate): void {
    this.polygon = new Polygon(c);

    switch (this._toolProperties.contourType) {
      case PolygonContourType.FILLEDCONTOUR:
        this.polygon.properties.strokeWidth = this._toolProperties.thickness;
        this.polygon.properties.fillColor = this.selectedColors.primaryColor;
        this.polygon.properties.strokeColor = this.selectedColors.secondaryColor;
        break;
      case PolygonContourType.FILLED:
        this.polygon.properties.strokeWidth = 0;
        this.polygon.properties.fillColor = this.selectedColors.primaryColor;
        this.polygon.properties.strokeColor = Color.TRANSPARENT;
        break;
      case PolygonContourType.CONTOUR:
        this.polygon.properties.strokeWidth = this._toolProperties.thickness;
        this.polygon.properties.fillColor = Color.TRANSPARENT;
        this.polygon.properties.strokeColor = this.selectedColors.secondaryColor;
        break;
    }
    this.polygon.updateProperties();
    this.drawShape();
  }

  resizeShape(dimensions: Coordinate, origin: Coordinate = this.polygon.origin): void {
    this.polygon.origin = origin;
    this.polygon.size = Math.min(dimensions.x, dimensions.y);
  }
}
