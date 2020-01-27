import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-drawing-surface',
    templateUrl: './drawing-surface.component.html',
    styleUrls: ['./drawing-surface.component.scss'],
})
export class DrawingSurfaceComponent {
    @Input() width: number;
    @Input() height: number;
    @Input() color: number; // Use Color type when implemented
}
