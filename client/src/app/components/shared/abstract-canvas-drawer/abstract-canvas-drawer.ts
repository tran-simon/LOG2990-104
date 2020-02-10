import { AfterViewInit, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Color } from 'src/app/utils/color/color';

export abstract class AbstractCanvasDrawer implements OnInit, OnChanges, AfterViewInit {
  @Input() color: Color = Color.WHITE;
  @Input() indicatorSize = 20;
  @Input() indicatorLineWidth = 3;
  canvas: ElementRef<HTMLCanvasElement>;
  renderingContext: CanvasRenderingContext2D;
  mouseIsDown = false;

  ngOnInit(): void {
    this.renderingContext = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
  }

  ngAfterViewInit(): void {
    this.draw();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.draw();
  }

  abstract draw(): void;
  abstract drawIndicator(x: number, y: number): void;
  abstract onMouseMove(event: MouseEvent): void;

  onMouseDown(event: MouseEvent): void {
    this.mouseIsDown = true;
  }

  @HostListener('window:mouseup')
  onMouseUp() {
    this.mouseIsDown = false;
  }
}
