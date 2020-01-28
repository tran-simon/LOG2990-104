import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Color } from '../../color';

@Component({
    selector: 'app-color-luminance',
    templateUrl: './color-luminance.component.html',
    styleUrls: ['./color-luminance.component.scss'],
})
export class ColorLuminanceComponent implements AfterViewInit {
    @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
    private renderingContext: CanvasRenderingContext2D;

    @Input() width = 50;
    @Input() height = 300;

    @Input() color: Color;

    ngAfterViewInit() {
        this.renderingContext = this.canvas.nativeElement.getContext('2d') as CanvasRenderingContext2D;

        const gradient = this.renderingContext.createLinearGradient(0, 0, 0, 300);

        gradient.addColorStop(0, 'black');
        gradient.addColorStop(0.5, this.color.rgbString);
        gradient.addColorStop(1, 'white');
        this.renderingContext.fillStyle = gradient;
        this.renderingContext.fillRect(0, 0, 50, 300);
    }
}
