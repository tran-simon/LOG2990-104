import { EditorService } from '../../../../services/editor.service';
import { Coordinate } from '../../../../utils/math/coordinate';
import { CompositeParticle } from '../../../shapes/composite-particle';
import { SprayToolProperties } from '../../../tool-properties/spray-tool-properties';
import { CreatorTool } from '../creator-tool';

export class SprayTool extends CreatorTool<SprayToolProperties> {
  static readonly INTERVAL_REFRESH_VALUE: number = 15;

  shape: CompositeParticle;
  private lastMovePosition: Coordinate;
  private interval: number;

  constructor(editorService: EditorService) {
    super(editorService);
    this.toolProperties = new SprayToolProperties();
    this.lastMovePosition = new Coordinate();
  }

  handleMouseEvent(e: MouseEvent): void {
    super.handleMouseEvent(e);
    if (this.isActive) {
      switch (e.type) {
        case 'mouseup' || 'mouseleave': {
          window.clearInterval(this.interval);
          this.applyShape();
          break;
        }
        case 'mousemove': {
          this.lastMovePosition = new Coordinate(e.offsetX, e.offsetY);
          break;
        }
      }
    } else if (e.type === 'mousedown') {
      this.isActive = true;
      this.shape = this.createShape();
      this.updateProperties();
      this.addShape();
      this.lastMovePosition = this.mousePosition;
      this.interval = window.setInterval(() => {
        this.shape.addParticle(this.lastMovePosition, this.toolProperties.frequency);
      }, SprayTool.INTERVAL_REFRESH_VALUE);
    }
  }

  protected updateProperties(): void {
    if (this.shape) {
      this.shape.shapeProperties.fillColor = this.editorService.colorsService.primaryColor;
      this.shape.shapeProperties.strokeColor = this.editorService.colorsService.primaryColor;
      this.shape.shapeProperties.strokeWidth = this.toolProperties.radius;
      this.shape.updateProperties();
    }
  }

  createShape(): CompositeParticle {
    return new CompositeParticle(this.mousePosition, this.toolProperties.radius);
  }
}
