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

  initMouseHandler(): void {
    this.handleMouseDown = () => {
      if (!this.isActive) {
        this.startShape();
      }
    };
    this.handleMouseUp = () => {
      if (this.isActive) {
        window.clearInterval(this.interval);
        this.applyShape();
      }
    };
    this.handleMouseMove = () => {
      if (this.isActive) {
        this.lastMovePosition = this.mousePosition;
      }
    };
    this.handleMouseLeave = this.handleMouseUp;
  }

  protected updateProperties(): void {
    if (this.shape) {
      this.shape.shapeProperties.primaryColor = this.editorService.colorsService.primaryColor;
      this.shape.shapeProperties.secondaryColor = this.editorService.colorsService.primaryColor;
      this.shape.shapeProperties.strokeWidth = this.toolProperties.radius;
      this.shape.updateProperties();
    }
  }

  createShape(): CompositeParticle {
    return new CompositeParticle(this.mousePosition, this.toolProperties.radius);
  }
}
