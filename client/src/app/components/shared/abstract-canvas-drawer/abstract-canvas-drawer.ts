import {
  AfterViewInit,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Color } from 'src/app/utils/color/color';

export abstract class AbstractCanvasDrawer implements OnInit, OnChanges, AfterViewInit {
  @Input() color: Color = Color.WHITE;
  @Output() colorChanged = new EventEmitter<Color>();

  @Input() indicatorSize = 20;
  @Input() indicatorLineWidth = 3;
  canvas: ElementRef<HTMLCanvasElement>;
  renderingContext: CanvasRenderingContext2D;
  mouseIsDown = false;

  abstract draw(): void;
  abstract drawIndicator(x: number, y: number): void;
  abstract shouldRedraw(color: Color): boolean;
  abstract calculateColorFromMouseEvent(event: MouseEvent): Color;

  ngOnInit(): void {
    this.renderingContext = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
  }

  ngAfterViewInit(): void {
    this.draw();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const colorPropName = 'color';
    const change: SimpleChange = changes[colorPropName];

    if (change) {
      const color: Color = change.currentValue;
      if (change && change.currentValue instanceof Color && this.shouldRedraw(color)) {
        this.draw();
      }
    }
  }

  updateColor(color: Color): void {
    const shouldRedraw = this.shouldRedraw(color);
    this.color = color;
    if (shouldRedraw) {
      this.draw();
    }
    this.colorChanged.emit(this.color);
  }

  onMouseMove(event: MouseEvent): void {
    if (this.mouseIsDown) {
      this.updateColor(this.calculateColorFromMouseEvent(event));
    }
  }

  onMouseDown(event: MouseEvent): void {
    this.mouseIsDown = true;
    this.updateColor(this.calculateColorFromMouseEvent(event));
  }

  @HostListener('window:mouseup')
  onMouseUp() {
    this.mouseIsDown = false;
  }
}
