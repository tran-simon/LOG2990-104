import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractCanvasDrawer } from 'src/app/components/shared/color-picker/abstract-canvas-drawer/abstract-canvas-drawer';
import { defaultErrorMessages, ErrorMessages } from 'src/app/components/shared/inputs/error-messages';
import { Coordinate } from 'src/app/models/Coordinate';
import { Color, ColorComponents } from 'src/app/utils/color/color';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent extends AbstractCanvasDrawer {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  @Input() isVertical = false;
  @Input() size = 300;

  hexInputErrorMessages: ErrorMessages<string> = defaultErrorMessages({ pattern: 'Doit être une couleur valide' });
  formGroup: FormGroup = new FormGroup({});

  calculateIndicatorPosition(): Coordinate {
    return new Coordinate((this.color.h / 360) * this.size, this.color.s * this.size);
  }

  draw(): void {
    if (this.renderingContext) {
      for (let i = 0; i < this.size; i++) {
        const h = (i / this.size) * 360;
        const gradient = this.renderingContext.createLinearGradient(0, 0, 0, this.size);
        gradient.addColorStop(0, Color.getHslString(h, 0, 0.5));
        gradient.addColorStop(1, Color.getHslString(h, 1, 0.5));

        this.renderingContext.fillStyle = gradient;
        this.renderingContext.fillRect(i, 0, 1, this.size);
      }
    }
  }

  drawIndicator(position: Coordinate): void {
    const { x, y } = position;
    const color = Color.hsl(this.color.h, this.color.s, 0.5);
    this.renderingContext.fillStyle = color.hexString;
    this.renderingContext.strokeStyle = color.negative.hexString;
    this.renderingContext.lineWidth = this.indicatorLineWidth;
    this.renderingContext.fillRect(x - this.indicatorSize / 2, y - this.indicatorSize / 2, this.indicatorSize, this.indicatorSize);
    this.renderingContext.strokeRect(x - this.indicatorSize / 2, y - this.indicatorSize / 2, this.indicatorSize, this.indicatorSize);
  }

  calculateColorFromMouseEvent(event: MouseEvent): Color {
    const h = (event.offsetX / this.size) * 360;
    const s = event.offsetY / this.size;
    return Color.hsl(h, s, this.color.l, this.color.a);
  }

  shouldRedraw(color: Color): boolean {
    return this.color.h !== color.h || this.color.s !== color.s;
  }

  colorChange(color: Color): void {
    this.updateColor(color);
  }

  rgbChange(value: string, component: string): void {
    let { r, g, b }: ColorComponents = this.color.color255;
    switch (component) {
      case 'r':
        r = parseInt(value, 16);
        break;
      case 'g':
        g = parseInt(value, 16);
        break;
      case 'b':
        b = parseInt(value, 16);
        break;
    }
    if (!(this.color.r255 === r && this.color.g255 === g && this.color.b255 === b)) {
      this.updateColor(Color.rgb255(r, g, b, this.color.a));
    }
  }

  hexChange(value: string): void {
    if (this.color.hex !== value.toLowerCase()) {
      this.updateColor(Color.hex(value, this.color.a));
    }
  }
}
