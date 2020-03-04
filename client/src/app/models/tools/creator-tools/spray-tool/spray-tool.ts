import { EditorService } from '../../../../services/editor.service';
import { CompositeParticle } from '../../../shapes/composite-particle';
import { SprayToolProperties } from '../../../tool-properties/spray-tool-properties';
import { CreatorTool } from '../creator-tool';

export class SprayTool extends CreatorTool<SprayToolProperties> {
  shape: CompositeParticle;
  constructor(editorService: EditorService) {
    super(editorService);
    this.toolProperties = new SprayToolProperties();
  }

  handleMouseEvent(e: MouseEvent): void {
    super.handleMouseEvent(e);
    if (this.isActive) {
      if (e.type === 'mouseup' || e.type === 'mouseleave') {
        this.applyShape();
      } else if (e.type === 'mousemove') {
        this.shape.addParticle(this.toolProperties.frequency);
      }
    } else if (e.type === 'mousedown') {
      this.isActive = true;
      this.updateProperties();
      this.addShape();
      this.shape.addParticle(this.toolProperties.frequency);
    }
  }

  protected updateProperties(): void {
    if (this.shape) {
      this.shape.updateProperties();
    }
  }

  createShape(): CompositeParticle {
    return new CompositeParticle(this.mousePosition);
  }
}
