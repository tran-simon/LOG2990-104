import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AbstractCanvasDrawer } from 'src/app/components/shared/abstract-canvas-drawer/abstract-canvas-drawer';
import { defaultErrorMessages, ErrorMessages } from 'src/app/components/shared/inputs/error-messages';
import { Color, ColorComponents } from 'src/app/utils/color/color';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent extends AbstractCanvasDrawer {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  @Output() colorChanged = new EventEmitter<Color>();
  @Input() isVertical = false;
  @Input() size = 300;

  hexInputErrorMessages: ErrorMessages<string> = defaultErrorMessages({ pattern: 'Doit être une couleur valide' });
  formGroup: FormGroup = new FormGroup({});

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
      this.drawIndicator((this.color.h / 360) * this.size, this.color.s * this.size);
    }
    this.colorChanged.emit(this.color);
  }

  drawIndicator(x: number, y: number): void {
    const color = Color.hsl(this.color.h, this.color.s, 0.5);
    this.renderingContext.fillStyle = color.hexString;
    this.renderingContext.strokeStyle = color.negative.hexString;
    this.renderingContext.lineWidth = this.indicatorLineWidth;
    this.renderingContext.fillRect(x - this.indicatorSize / 2, y - this.indicatorSize / 2, this.indicatorSize, this.indicatorSize);
    this.renderingContext.strokeRect(x - this.indicatorSize / 2, y - this.indicatorSize / 2, this.indicatorSize, this.indicatorSize);
  }

  lightnessChanged(lightness: number): void {
    const { h, s, a }: ColorComponents = this.color;
    this.color = Color.hsl(h ? h : 0, s, lightness, a);
    this.colorChanged.emit(this.color);
  }

  alphaChanged(alpha: number): void {
    const { h, s, l }: ColorComponents = this.color;
    this.color = Color.hsl(h, s, l, alpha);
    this.colorChanged.emit(this.color);
  }

  colorChange(value: string, component: string): void {
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
      this.color = Color.rgb255(r, g, b, this.color.a);
      this.draw();
    }
  }

  hexChange(value: string): void {
    if (this.color.hex !== value.toLowerCase()) {
      this.color = Color.hex(value, this.color.a);
      this.draw();
    }
  }

  onMouseDown(event: MouseEvent): void {
    super.onMouseDown(event);
    const h = (event.offsetX / this.size) * 360;
    const s = event.offsetY / this.size;
    this.color = Color.hsl(h, s, this.color.l, this.color.a);
    this.draw();
  }

  onMouseMove(event: MouseEvent): void {
    if (this.mouseIsDown) {
      const h = (event.offsetX / this.size) * 360;
      const s = event.offsetY / this.size;
      this.color = Color.hsl(h, s, this.color.l, this.color.a);
      this.draw();
    }
  }
}
