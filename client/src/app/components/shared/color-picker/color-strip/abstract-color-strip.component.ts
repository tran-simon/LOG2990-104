import { EventEmitter, Input, Output } from '@angular/core';
import { AbstractCanvasDrawer } from 'src/app/components/shared/abstract-canvas-drawer/abstract-canvas-drawer';
import { MathUtil } from 'src/app/utils/math/math-util';

export abstract class AbstractColorStripComponent extends AbstractCanvasDrawer {
  abstract get value(): number;

  get width(): number {
    return this.isVertical ? this.thickness : this.length;
  }
  get height(): number {
    return !this.isVertical ? this.thickness : this.length;
  }
  @Input() isVertical = false;
  @Input() length = 300;
  @Input() thickness = 50;
  indicatorSize = 10;

  @Output() valueChanged = new EventEmitter<number>();

  abstract getFillStyle(width: number, height: number): string | CanvasGradient | CanvasPattern;
  abstract getIndicatorFillStyle(): string | CanvasGradient | CanvasPattern;
  abstract getIndicatorStrokeStyle(): string | CanvasGradient | CanvasPattern;

  draw(): void {
    if (this.renderingContext) {
      const gradientWidth = this.isVertical ? 0 : this.width;
      const gradientHeight = !this.isVertical ? 0 : this.height;
      this.renderingContext.fillStyle = this.getFillStyle(gradientWidth, gradientHeight);
      this.renderingContext.fillRect(0, 0, this.width, this.height);

      const indicatorX = this.isVertical ? 0 : this.value * this.width;
      const indicatorY = !this.isVertical ? 0 : this.value * this.height;
      this.drawIndicator(indicatorX, indicatorY);
    }
  }

  drawIndicator(x: number, y: number): void {
    const offset = this.isVertical ? y : x;
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

  onMouseMove(event: MouseEvent): void {
    if (this.mouseIsDown) {
      this.valueChanged.emit(this.calculateMouseEventValue(event));
    }
  }

  onMouseDown(event: MouseEvent): void {
    super.onMouseDown(event);
    this.valueChanged.emit(this.calculateMouseEventValue(event));
  }
}
