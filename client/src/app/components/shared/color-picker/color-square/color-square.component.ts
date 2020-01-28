import { AfterViewInit, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Color } from '../color';

@Component({
    selector: 'app-color-square',
    templateUrl: './color-square.component.html',
    styleUrls: ['./color-square.component.scss'],
})
export class ColorSquareComponent implements AfterViewInit {
    @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
    private renderingContext: CanvasRenderingContext2D;

    @Input() width: number;
    @Input() height: number;

    @Input() color: Color;
    @Output() colorChange = new EventEmitter<Color>();

    ngAfterViewInit(): void {
        this.renderingContext = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;

        this.renderColors(this.width);
    }

    renderColors(size: number, l = 0.5) {
        for (let i = 0; i < size; i++) {
            const h = (i / size) * 360;
            const gradient = this.renderingContext.createLinearGradient(0, 0, 0, size);
            gradient.addColorStop(0, Color.getHslString(h, 0, l));

            gradient.addColorStop(1, Color.getHslString(h, 1, l));

            this.renderingContext.fillStyle = gradient;
            this.renderingContext.fillRect(i, 0, 1, size);
        }
    }
}
