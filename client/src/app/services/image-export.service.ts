import { Injectable } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { FilterType } from '../components/pages/export-modal/filter-type.enum';

@Injectable({
  providedIn: 'root',
})
export class ImageExportService {
  constructor(private sanitizer: DomSanitizer) {}

  static async viewToCanvas(view: DrawingSurfaceComponent, svg: SVGElement = view.svg): Promise<CanvasRenderingContext2D> {
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

  safeURL(surface: DrawingSurfaceComponent): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.createDataURL(surface));
  }

  addFilter(surface: DrawingSurfaceComponent, filter: FilterType): void {
    switch (filter) {
      case FilterType.EMPTY:
        surface.svg.setAttribute('filter', 'none');
        break;
      case FilterType.BLACKWHITE:
        surface.svg.setAttribute('filter', 'grayscale(100%)');
        break;
      case FilterType.BLUR:
        surface.svg.setAttribute('filter', 'blur(5px)');
        break;
      case FilterType.INVERT:
        surface.svg.setAttribute('filter', 'invert(100%)');
        break;
      case FilterType.SATURATE:
        surface.svg.setAttribute('filter', 'saturate(200%)');
        break;
      case FilterType.SEPIA:
        surface.svg.setAttribute('filter', 'sepia(100%)');
        break;
    }
  }

  removeFilter(surface: DrawingSurfaceComponent): void {
    surface.svg.removeAttribute('filter');
  }

  async exportImageElement(surface: DrawingSurfaceComponent, extension: string, filter: FilterType): Promise<string> {
    return new Promise<string>((resolve) => {
      const image = new Image();
      const canvas = document.createElement('canvas');
      this.addFilter(surface, filter);
      image.src = this.createDataURL(surface);
      const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
      image.onload = (): void => {
        canvas.width = surface.width;
        canvas.height = surface.height;
        ctx.drawImage(image, 0, 0);
        resolve(canvas.toDataURL(`image/${extension}`));
      };
      this.removeFilter(surface);
    });
  }

  exportSVGElement(surface: DrawingSurfaceComponent, filter: FilterType): SafeResourceUrl {
    let dataUrl: SafeResourceUrl;
    this.addFilter(surface, filter);
    dataUrl = this.safeURL(surface);
    this.removeFilter(surface);
    return dataUrl;
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
