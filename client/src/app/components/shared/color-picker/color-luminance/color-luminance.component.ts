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
import { Color } from '../../../../utils/color/color';
//todo: better path?

@Component({
    selector: 'app-color-luminance',
    templateUrl: './color-luminance.component.html',
    styleUrls: ['./color-luminance.component.scss'],
})
export class ColorLuminanceComponent implements OnInit, OnChanges, AfterViewInit {
    @ViewChild('canvas', { static: true }) canvas: ElementRef<HTMLCanvasElement>;
    @Input() width = 50;
    @Input() height = 300;
    @Input() color: Color;

    @Output() luminanceChanged = new EventEmitter<number>();

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
        gradient.addColorStop(0.5, this.color.rgbString);
        gradient.addColorStop(1, 'white');
        this.renderingContext.fillStyle = gradient;
        this.renderingContext.fillRect(0, 0, width, height);
    }

    onMouseDown(event: MouseEvent) {
        this.mouseIsDown = true;
        this.mouseHeight = event.offsetY;
        this.luminanceChanged.emit(this.mouseHeight / this.height);
    }

    onMouseMove(event: MouseEvent) {
        if (this.mouseIsDown) {
            this.mouseHeight = event.offsetY;
            this.luminanceChanged.emit(this.mouseHeight / this.height);
        }
    }

    @HostListener('window:mouseup', ['$event'])
    onMouseUp() {
        this.mouseIsDown = false;
    }
}
