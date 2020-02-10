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
  @Input() color: Color = Color.WHITE;
  @Input() indicatorLineWidth = 3;
  @Input() indicatorSize = 10;
  @Input() isVertical = false;
  @Input() length = 300;
  @Input() thickness = 50;

  @Output() lightnessChanged = new EventEmitter<number>();

  draw() {
    if (this.renderingContext) {
      const startWidth = this.isVertical ? 0 : this.width;
      const startHeight = !this.isVertical ? 0 : this.height;

      const gradient = this.renderingContext.createLinearGradient(0, 0, startWidth, startHeight);
      gradient.addColorStop(0, 'black');
      gradient.addColorStop(0.5, Color.getHslString(this.color.h, this.color.s, 0.5));
      gradient.addColorStop(1, 'white');
      this.renderingContext.fillStyle = gradient;
      this.renderingContext.fillRect(0, 0, this.width, this.height);

      const indicatorX = this.isVertical ? 0 : this.color.l * this.width;
      const indicatorY = !this.isVertical ? 0 : this.color.l * this.height;
      this.drawIndicator(indicatorX, indicatorY);
    }
  }

  drawIndicator(x: number, y: number) {
    const offset = this.isVertical ? y : x;
    this.renderingContext.fillStyle = this.color.hexString;
    this.renderingContext.strokeStyle = this.color.negative.hexString;
    this.renderingContext.lineWidth = this.indicatorLineWidth;

    const startX = this.isVertical ? 0 : offset - this.indicatorSize / 2;
    const startY = !this.isVertical ? 0 : offset - this.indicatorSize / 2;

    const width = this.isVertical ? this.width : this.indicatorSize;
    const height = !this.isVertical ? this.height : this.indicatorSize;

    this.renderingContext.fillRect(startX, startY, width, height);
    this.renderingContext.strokeRect(startX, startY, width, height);
  }

  private mouseEventToLightness(event: MouseEvent): number {
    return this.isVertical ? event.offsetY / this.height : event.offsetX / this.width;
  }

  onMouseDown(event: MouseEvent) {
    super.onMouseDown(event);
    const lightness = MathUtil.fit(this.mouseEventToLightness(event), 0, 1);
    this.lightnessChanged.emit(lightness);
  }

  onMouseMove(event: MouseEvent) {
    if (this.mouseIsDown) {
      const lightness = MathUtil.fit(this.mouseEventToLightness(event), 0, 1);
      this.lightnessChanged.emit(lightness);
    }
  }

  @HostListener('window:mouseup')
  onMouseUp() {
    super.onMouseUp();
  }

  get width(): number {
    return this.isVertical ? this.thickness : this.length;
  }
  get height(): number {
    return !this.isVertical ? this.thickness : this.length;
  }
}
