import { EditorService } from '../../../../services/editor.service';
import { CompositeParticle } from '../../../shapes/composite-particle';
import { SprayToolProperties } from '../../../tool-properties/spray-tool-properties';
import { CreatorTool } from '../creator-tool';

export class SprayTool extends CreatorTool<SprayToolProperties> {
  static readonly INTERVAL_REFRESH_VALUE: number = 15;
  shape: CompositeParticle;
  private interval: number;

  constructor(editorService: EditorService) {
    super(editorService);
    this.toolProperties = new SprayToolProperties();
  }

  startShape(): void {
    super.startShape();
    this.interval = window.setInterval(() => {
      this.shape.addParticle(this.mousePosition, this.toolProperties.frequency);
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
    this.handleMouseLeave = this.handleMouseUp;
  }

  protected updateProperties(): void {
    if (this.shape) {
      this.shape.primaryColor = this.editorService.colorsService.primaryColor;
      this.shape.secondaryColor = this.editorService.colorsService.primaryColor;
      this.shape.strokeWidth = this.toolProperties.radius;
      this.shape.updateProperties();
    }
  }

  createShape(): CompositeParticle {
    return new CompositeParticle(this.mousePosition, this.toolProperties.radius);
  }
}
