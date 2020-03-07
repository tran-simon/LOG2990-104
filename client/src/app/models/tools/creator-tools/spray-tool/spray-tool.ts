import { EditorService } from '../../../../services/editor.service';
import { Coordinate } from '../../../../utils/math/coordinate';
import { CompositeParticle } from '../../../shapes/composite-particle';
import { SprayToolProperties } from '../../../tool-properties/spray-tool-properties';
import { CreatorTool } from '../creator-tool';

export const NB_FRAME_BUFFER = 5;

export class SprayTool extends CreatorTool<SprayToolProperties> {
  shape: CompositeParticle;
  private noMovementFrames: number;
  private lastMovePosition: Coordinate;

  constructor(editorService: EditorService) {
    super(editorService);
    this.toolProperties = new SprayToolProperties();
    this.noMovementFrames = 0;
    this.lastMovePosition = new Coordinate();
  }

  handleMouseEvent(e: MouseEvent): void {
    super.handleMouseEvent(e);
    if (this.isActive) {
      switch (e.type) {
        case 'mouseup' || 'mouseleave': {
          this.noMovementFrames = 0;
          this.applyShape();
          break;
        }
        case 'mousemove': {
          this.noMovementFrames = 0;
          this.lastMovePosition = new Coordinate(e.offsetX, e.offsetY);
          this.shape.addParticle(this.mousePosition);
          break;
        }
        case 'mousedown': {
          if (this.noMovementFrames >= NB_FRAME_BUFFER) {
            this.shape.addParticle(this.lastMovePosition);
          }
          this.noMovementFrames++;
          break;
        }
      }
    } else if (e.type === 'mousedown') {
      this.shape = this.createShape();
      this.isActive = true;
      this.lastMovePosition = this.mousePosition;
      this.updateProperties();
      this.addShape();
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
