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
import { Color } from '../color';

@Component({
    selector: 'app-color-square',
    templateUrl: './color-square.component.html',
    styleUrls: ['./color-square.component.scss'],
})
export class ColorSquareComponent implements OnInit, AfterViewInit, OnChanges {
    @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
    @Input() size: number;

    @Input() color: Color;
    @Output() colorChange = new EventEmitter<Color>();

    private mouseIsDown = false;
    private luminance = 0.5;
    private renderingContext: CanvasRenderingContext2D;

    ngOnInit(): void {
        this.renderingContext = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;
    }

    ngAfterViewInit(): void {
        this.draw(this.size);
    }

    ngOnChanges(changes: SimpleChanges): void {
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
            this.colorChange.emit(this.color);
        }
    }

    updateColor(event: MouseEvent) {
        const h = (event.offsetX / this.size) * 360;
        const s = event.offsetY / this.size;
        this.color = Color.hsl(h, s, 0.5);
        this.colorChange.emit(this.color);
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
}
