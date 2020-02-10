import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractColorStripComponent } from 'src/app/components/shared/color-picker/color-strip/abstract-color-strip.component';

@Component({
  selector: 'app-alpha',
  templateUrl: '../abstract-color-strip.component.html',
  styleUrls: ['../abstract-color-strip.component.scss'],
})
export class AlphaComponent extends AbstractColorStripComponent {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  getFillStyle(width: number, height: number): string | CanvasGradient | CanvasPattern {
    const gradient = this.renderingContext.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(1, 'black');
    return gradient;
  }

  get value(): number {
    return this.color.a;
  }

  getIndicatorFillStyle(): string | CanvasGradient | CanvasPattern {
    return 'white';
  }

  getIndicatorStrokeStyle(): string | CanvasGradient | CanvasPattern {
    return 'black';
  }
}
