import { Input } from '@angular/core';
import { AbstractCanvasDrawer } from 'src/app/components/shared/color-picker/abstract-canvas-drawer/abstract-canvas-drawer';
import { Coordinate } from 'src/app/models/Coordinate';
import { Color } from 'src/app/utils/color/color';
import { MathUtil } from 'src/app/utils/math/math-util';

export abstract class AbstractColorStripComponent extends AbstractCanvasDrawer {
  @Input() isVertical = false;
  @Input() length = 300;
  @Input() thickness = 50;

  indicatorSize = 10;

  abstract get value(): number;

  abstract getFillStyle(width: number, height: number): string | CanvasGradient | CanvasPattern;

  abstract calculateNewColor(value: number): Color;

  getIndicatorFillStyle(): string | CanvasGradient | CanvasPattern {
    return this.color.hexString;
  }

  getIndicatorStrokeStyle(): string | CanvasGradient | CanvasPattern {
    return this.color.negative.hexString;
  }

  calculateIndicatorPosition(): Coordinate {
    const indicatorX = this.isVertical ? 0 : this.value * this.width;
    const indicatorY = !this.isVertical ? 0 : this.value * this.height;
    return new Coordinate(indicatorX, indicatorY);
  }

  draw(): void {
    const gradientWidth = this.isVertical ? 0 : this.width;
    const gradientHeight = !this.isVertical ? 0 : this.height;
    this.renderingContext.fillStyle = this.getFillStyle(gradientWidth, gradientHeight);
    this.renderingContext.fillRect(0, 0, this.width, this.height);
  }

  drawIndicator(position: Coordinate): void {
    const offset = this.isVertical ? position.y : position.x;
    this.renderingContext.fillStyle = this.getIndicatorFillStyle();
    this.renderingContext.strokeStyle = this.getIndicatorStrokeStyle();
    this.renderingContext.lineWidth = this.indicatorLineWidth;

    const startX = this.isVertical ? 0 : offset - this.indicatorSize / 2;
    const startY = !this.isVertical ? 0 : offset - this.indicatorSize / 2;

    const width = this.isVertical ? this.width : this.indicatorSize;
    const height = !this.isVertical ? this.height : this.indicatorSize;

    this.renderingContext.fillRect(startX, startY, width, height);
    this.renderingContext.strokeRect(startX, startY, width, height);
  }

  calculateMouseEventValue(event: MouseEvent): number {
    return MathUtil.fit(this.isVertical ? event.offsetY / this.height : event.offsetX / this.width);
  }

  calculateColorFromMouseEvent(event: MouseEvent): Color {
    return this.calculateNewColor(this.calculateMouseEventValue(event));
  }

  get width(): number {
    return this.isVertical ? this.thickness : this.length;
  }

  get height(): number {
    return !this.isVertical ? this.thickness : this.length;
  }
}
