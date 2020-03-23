import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';

@Injectable({
  providedIn: 'root',
})
export class ImageExportService {
  constructor(private sanitizer: DomSanitizer) {}

  async exportImageElement(surface: DrawingSurfaceComponent, extension: string): Promise<string> {
    return new Promise<string>((resolve) => {
      const image = new Image();
      const canvas = document.createElement('canvas');
      image.src = this.createDataURL(surface);
      const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
      image.onload = (): void => {
        canvas.width = surface.width;
        canvas.height = surface.height;
        ctx.drawImage(image, 0, 0);
        resolve(canvas.toDataURL(`image/${extension}`));
      };
    });
  }

  exportSVGElement(surface: DrawingSurfaceComponent): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.createDataURL(surface));
  }

  /**
   * Based on: https://stackoverflow.com/questions/3768565/drawing-an-svg-file-on-a-html5-canvas
   */
  createDataURL(surface: DrawingSurfaceComponent): string {
    const xmlSerializer = new XMLSerializer();
    const svgString = xmlSerializer.serializeToString(surface.svg);
    return 'data:image/svg+xml,' + encodeURIComponent(svgString);
  }
}
