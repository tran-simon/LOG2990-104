import { Component, ElementRef, EventEmitter, HostListener, Input, Output, ViewChild } from '@angular/core';
import { AbstractCanvasDrawer } from 'src/app/components/shared/abstract-canvas-drawer/abstract-canvas-drawer';
import { Color } from 'src/app/utils/color/color';
import { MathUtil } from 'src/app/utils/math/math-util';

@Component({
  selector: 'app-color-lightness',
  templateUrl: './color-lightness.component.html',
  styleUrls: ['./color-lightness.component.scss'],
})
export class ColorLightnessComponent extends AbstractCanvasDrawer {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  @Input() width = 50;
  @Input() height = 300;
  @Input() color: Color = Color.WHITE;
  @Input() indicatorLineWidth = 3;
  @Input() indicatorHeight = 10;

  @Output() lightnessChanged = new EventEmitter<number>();

  draw() {
    if (this.renderingContext) {
      const gradient = this.renderingContext.createLinearGradient(0, 0, 0, this.height);
      gradient.addColorStop(0, 'black');
      gradient.addColorStop(0.5, Color.getHslString(this.color.h, this.color.s, 0.5));
      gradient.addColorStop(1, 'white');
      this.renderingContext.fillStyle = gradient;
      this.renderingContext.fillRect(0, 0, this.width, this.height);

      this.drawIndicator(0, this.color.l * this.height);
    }
  }

  drawIndicator(x: number, y: number) {
    this.renderingContext.fillStyle = this.color.hexString;
    this.renderingContext.strokeStyle = this.color.negative.hexString;
    this.renderingContext.lineWidth = this.indicatorLineWidth;
    this.renderingContext.fillRect(0, y - this.indicatorHeight / 2, this.width, this.indicatorHeight);
    this.renderingContext.strokeRect(0, y - this.indicatorHeight / 2, this.width, this.indicatorHeight);
  }

  onMouseDown(event: MouseEvent) {
    super.onMouseDown(event);
    const lightness = MathUtil.fit(event.offsetY / this.height, 0, 1);
    this.lightnessChanged.emit(lightness);
  }

  onMouseMove(event: MouseEvent) {
    if (this.mouseIsDown) {
      const lightness = MathUtil.fit(event.offsetY / this.height, 0, 1);
      this.lightnessChanged.emit(lightness);
    }
  }

  @HostListener('window:mouseup')
  onMouseUp() {
    super.onMouseUp();
  }
}
