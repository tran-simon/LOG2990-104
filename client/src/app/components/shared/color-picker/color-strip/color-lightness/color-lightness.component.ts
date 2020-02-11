import { Component, ElementRef, ViewChild } from '@angular/core';
import { AbstractColorStripComponent } from 'src/app/components/shared/color-picker/color-strip/abstract-color-strip.component';
import { Color, ColorComponents } from 'src/app/utils/color/color';

@Component({
  selector: 'app-color-lightness',
  templateUrl: '../abstract-color-strip.component.html',
  styleUrls: ['../abstract-color-strip.component.scss'],
})
export class ColorLightnessComponent extends AbstractColorStripComponent {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  getFillStyle(width: number, height: number): string | CanvasGradient | CanvasPattern {
    const gradient = this.renderingContext.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'black');
    gradient.addColorStop(0.5, Color.getHslString(this.color.h, this.color.s, 0.5));
    gradient.addColorStop(1, 'white');
    return gradient;
  }

  calculateNewColor(value: number): Color {
    const { h, s, a }: ColorComponents = this.color;
    return Color.hsl(h, s, value, a);
  }

  shouldRedraw(color: Color): boolean {
    return color.hslString !== this.color.hslString;
  }

  get value(): number {
    return this.color.l;
  }
}
