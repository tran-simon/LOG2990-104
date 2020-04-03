import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';

@Injectable({
  providedIn: 'root',
})
export class ImageExportService {

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  static exportImageElement(surface: DrawingSurfaceComponent, extension: string, svg:any ): () => string {
    const image = new Image();
    const canvas = document.createElement('canvas');
    image.src = this.createDataURL(surface,svg);
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
    return image.onload = (): string => {
      canvas.width = surface.width;
      canvas.height = surface.height;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(image, 0, 0);
      return canvas.toDataURL(`image/${extension}`);
    };
  }

  /**
   * Based on: https://stackoverflow.com/questions/3768565/drawing-an-svg-file-on-a-html5-canvas
   */
  static createDataURL(surface: DrawingSurfaceComponent, svg:any): string {
    const xmlSerializer = new XMLSerializer();
    const svgString = xmlSerializer.serializeToString(svg);
    return 'data:image/svg+xml,' + encodeURIComponent(svgString);
  }

  exportSVGElement(surface: DrawingSurfaceComponent, svg:any): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(ImageExportService.createDataURL(surface, svg));
    // return;
  }
}
