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

  static viewToCanvas(view: DrawingSurfaceComponent, svg: SVGElement = view.svg): Promise<CanvasRenderingContext2D> {
    const image = new Image();
    const { width, height } = view;
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    ctx.imageSmoothingEnabled = false;
    ctx.canvas.width = width;
    ctx.canvas.height = height;

    const xml = new XMLSerializer().serializeToString(svg);
    image.src = 'data:image/svg+xml;base64,' + btoa(xml);
    image.style.display = 'none';

    return new Promise((resolve) => {
      image.onload = () => {
        ctx.drawImage(image, 0, 0);
        resolve(ctx);
      };
    });
  }

  exportImageElement(surface: DrawingSurfaceComponent, extension: string): () => string {
    const image = new Image();
    const canvas = document.createElement('canvas');
    image.src = this.createDataURL(surface);
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
    return image.onload = (): string => {
      canvas.width = surface.width;
      canvas.height = surface.height;
      ctx.drawImage(image, 0, 0);
      return canvas.toDataURL(`image/${extension}`);
    };
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
