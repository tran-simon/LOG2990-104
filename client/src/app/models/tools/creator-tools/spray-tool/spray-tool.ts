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

  startShape(): void {
    super.startShape();
    this.lastMovePosition = this.mousePosition;
    this.interval = window.setInterval(() => {
      this.shape.addParticle(this.lastMovePosition, this.toolProperties.frequency);
    }, SprayTool.INTERVAL_REFRESH_VALUE);
  }

  handleMouseDown(e: MouseEvent): boolean | void {
    if (!this.isActive) {
      this.startShape();
    }
    return super.handleMouseDown(e);
  }

  handleMouseUp(e: MouseEvent): boolean | void {
    if (this.isActive) {
      window.clearInterval(this.interval);
      this.applyShape();
    }
    return super.handleMouseUp(e);
  }

  handleMouseLeave(e: MouseEvent): boolean | void {
    if (this.isActive) {
      window.clearInterval(this.interval);
      this.applyShape();
    }
    return super.handleMouseUp(e);
  }

  handleMouseMove(e: MouseEvent): boolean | void {
    if (this.isActive) {
      this.lastMovePosition = new Coordinate(e.offsetX, e.offsetY);
    }
    return super.handleMouseMove(e);
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
