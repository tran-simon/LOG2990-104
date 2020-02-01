import {Component, ElementRef, HostListener, SimpleChanges, ViewChild} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Color } from '../../../utils/color/color';

@Component({
    selector: 'app-color-picker',
    templateUrl: './color-picker.component.html',
    styleUrls: ['./color-picker.component.scss'],
})
export class ColorPickerComponent {
  @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;

  private mouseIsDown = false;
  private luminance = 0.5;
  private renderingContext: CanvasRenderingContext2D;


  color: Color = Color.BLUE;
    size = 300;

    formGroup: FormGroup = new FormGroup({});

  ngOnInit(): void {
    this.renderingContext = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;

  }

  ngAfterViewInit(): void {
    this.draw(this.size);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log("chaning")
    this.draw(this.size);
  }

  draw(size: number) {
    if (this.renderingContext) {
      for (let i = 0; i < size; i++) {
        const h = (i / size) * 360;
        const gradient = this.renderingContext.createLinearGradient(0, 0, 0, size);
        gradient.addColorStop(0, Color.getHslString(h, 0, this.luminance));
        gradient.addColorStop(1, Color.getHslString(h, 1, this.luminance));

        this.renderingContext.fillStyle = gradient;
        this.renderingContext.fillRect(i, 0, 1, size);
      }
    }
  }

  luminanceChanged(luminance: number) {
    this.luminance = luminance;
    this.draw(this.size);
    const h = this.color.hue;
    const s = this.color.saturation;
    if (h) {
      this.color = Color.hsl(h, s, luminance);
      // this.colorChange.emit(this.color);
    }
  }

  updateColor(event: MouseEvent) {
    const h = (event.offsetX / this.size) * 360;
    const s = event.offsetY / this.size;
    this.color = Color.hsl(h, s, 0.5);
    // this.colorChange.emit(this.color);
  }

  onMouseDown(event: MouseEvent) {
    this.mouseIsDown = true;
    this.updateColor(event);
  }

  onMouseMove(event: MouseEvent) {
    if (this.mouseIsDown) {
      this.updateColor(event);
    }
  }

  @HostListener('window:mouseup', ['$event'])
  onMouseUp() {
    this.mouseIsDown = false;
  }

    colorChange(color: Color) {
        this.color = color;
    }

    colorFormEvent(value: string, component: string) {
      let {red, green, blue} = this.color;
        switch (component) {
            case 'r':
              red = +value / 255;
                break;
            case 'g':
              green = +value / 255 ;
                break;
            case 'b':
              blue = +value / 255;
                break;
        }
      this.color = new Color(red, green, blue);
    }

    onClick() {
        console.log('CLICK');
    }

    get hexForm() {
        return this.formGroup.get('hex');
    }

    get red(){
      return this.color.r255.toString()
    }
}
