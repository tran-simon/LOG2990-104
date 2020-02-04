import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Color } from 'src/app/utils/color/color';

@Component({
  selector: 'app-color-lightness',
  templateUrl: './color-lightness.component.html',
  styleUrls: ['./color-lightness.component.scss'],
})
export class ColorLightnessComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
  @Input() width = 50;
  @Input() height = 300;
  @Input() color: Color;
  @Input() indicatorLineWidth = 3;
  @Input() indicatorHeight = 10;

  @Output() lightnessChanged = new EventEmitter<number>();

  private renderingContext: CanvasRenderingContext2D;
  private mouseIsDown = false;
  private mouseHeight: number;

  ngOnInit(): void {
    this.renderingContext = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
  }

  ngAfterViewInit(): void {
    this.draw(this.width, this.height);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.renderingContext) {
      this.draw(this.width, this.height);
    }
  }

  draw(width: number, height: number) {
    const gradient = this.renderingContext.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'black');
    gradient.addColorStop(0.5, Color.getHslString(this.color.h, this.color.s, 0.5));
    gradient.addColorStop(1, 'white');
    this.renderingContext.fillStyle = gradient;
    this.renderingContext.fillRect(0, 0, width, height);

    this.drawIndicator(this.color.l * this.height, this.width, this.indicatorHeight);
  }

  drawIndicator(y: number, width: number, height: number) {
    this.renderingContext.fillStyle = this.color.hexString;
    this.renderingContext.strokeStyle = this.color.negative.hexString;
    this.renderingContext.lineWidth = this.indicatorLineWidth;
    this.renderingContext.fillRect(0, y - height / 2, width, height);
    this.renderingContext.strokeRect(0, y - height / 2, width, height);
  }

  onMouseDown(event: MouseEvent) {
    this.mouseIsDown = true;
    this.mouseHeight = event.offsetY;
    const lightness = this.mouseHeight / this.height;
    this.lightnessChanged.emit(lightness);
  }

  onMouseMove(event: MouseEvent) {
    if (this.mouseIsDown) {
      this.mouseHeight = event.offsetY;
      const lightness = this.mouseHeight / this.height;
      this.lightnessChanged.emit(lightness);
    }
  }

  @HostListener('window:mouseup')
  onMouseUp() {
    this.mouseIsDown = false;
  }
}
