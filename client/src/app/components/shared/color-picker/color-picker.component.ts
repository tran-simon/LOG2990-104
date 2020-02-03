import {AfterViewInit, Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {defaultErrorMessages, ErrorMessages} from 'src/app/components/shared/inputs/custom-input/error-messages';
import {Color, Color255} from 'src/app/utils/color/color';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild('canvas', {static: true}) canvas: ElementRef<HTMLCanvasElement>;
  @Input() _color = Color.GREEN;

  private mouseIsDown = false;
  private renderingContext: CanvasRenderingContext2D;
  hexInputErrorMessages: ErrorMessages<string> = defaultErrorMessages({pattern: 'Doit être une couleur valide'});

  size = 300;

  formGroup: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.renderingContext = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
  }

  ngAfterViewInit(): void {
    this.draw();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.draw();
  }

  draw(size = this.size, lightness = this.color.lightness) {
    if (this.renderingContext) {
      for (let i = 0; i < size; i++) {
        const h = (i / size) * 360;
        const gradient = this.renderingContext.createLinearGradient(0, 0, 0, size);
        gradient.addColorStop(0, Color.getHslString(h, 0, lightness));
        gradient.addColorStop(1, Color.getHslString(h, 1, lightness));

        this.renderingContext.fillStyle = gradient;
        this.renderingContext.fillRect(i, 0, 1, size);
      }
    }
  }

  lightnessChanged(lightness: number): void {
    const h = this.color.hue;
    const s = this.color.saturation;
    this.color = Color.hsl(h ? h : 0, s, lightness);
    this.draw();
  }

  colorChange(value: string, component: string): void {
    let {red, green, blue}: Color255 = this.color.color255;
    switch (component) {
      case 'r':
        red = parseInt(value, 16);
        break;
      case 'g':
        green = parseInt(value, 16);
        break;
      case 'b':
        blue = parseInt(value, 16);
        break;
    }
    this.color = Color.color255(red, green, blue);
    this.draw();
  }

  hexChange(value: string): void {
    this.color = Color.hex(value);
    this.draw();
  }

  onMouseDown(event: MouseEvent): void {
    this.mouseIsDown = true;
    const h = (event.offsetX / this.size) * 360;
    const s = event.offsetY / this.size;
    this.color = Color.hsl(h, s, this.color.lightness);
  }

  onMouseMove(event: MouseEvent): void {
    if (this.mouseIsDown) {
      const h = (event.offsetX / this.size) * 360;
      const s = event.offsetY / this.size;
      this.color = Color.hsl(h, s, this.color.lightness);
    }
  }

  @HostListener('window:mouseup')
  onMouseUp(): void {
    this.mouseIsDown = false;
  }

  get color(): Color {
    return this._color;
  }

  set color(value: Color) {
    this._color = value;
  }
}
