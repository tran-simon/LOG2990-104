import { AfterViewInit, ElementRef, OnChanges, OnInit, SimpleChanges } from '@angular/core';

export abstract class AbstractCanvasDrawer implements OnInit, OnChanges, AfterViewInit {
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

  onMouseUp() {
    this.mouseIsDown = false;
  }
}
