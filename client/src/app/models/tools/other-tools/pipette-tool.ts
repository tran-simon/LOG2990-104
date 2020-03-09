import { Tool } from 'src/app/models/tools/tool';
import { EditorService } from 'src/app/services/editor.service';
import { SelectedColorType } from 'src/app/services/selected-color-type';
import { Color } from 'src/app/utils/color/color';

/**
 * Based on: https://stackoverflow.com/questions/3768565/drawing-an-svg-file-on-a-html5-canvas
 */
export class PipetteTool extends Tool {
  private image: HTMLImageElement;

  constructor(editorService: EditorService) {
    super(editorService);
    this.image = new Image();
  }

  private pickColor(x: number, y: number, selectedColorType: SelectedColorType): void {
    const { width, height, svg } = this.editorService.view;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.canvas.width = width;
    ctx.canvas.height = height;

    const xml = new XMLSerializer().serializeToString(svg);
    this.image.onload = () => {
      ctx.drawImage(this.image, 0, 0);

      const data = ctx.getImageData(x, y, 1, 1).data;
      const color = Color.rgb255(data[0], data[1], data[2]);

      this.editorService.colorsService.setColorByTypeAndUpdateHistory(color, selectedColorType);
    };

    this.image.src = 'data:image/svg+xml;base64,' + btoa(xml);
    this.image.style.display = 'none';
  }

  handleMouseEvent(e: MouseEvent): void {
    super.handleMouseEvent(e);
    if (e.type === 'click' || e.type === 'contextmenu') {
      if (this.editorService.view) {
        this.pickColor(e.offsetX, e.offsetY, e.type === 'contextmenu' ? SelectedColorType.secondary : SelectedColorType.primary);
      }
    }
  }

  protected updateProperties(): void {
    // todo remove
    return;
  }
}
