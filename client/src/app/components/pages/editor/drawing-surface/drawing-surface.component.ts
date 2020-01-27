import { Component } from '@angular/core';

@Component({
    selector: 'app-drawing-surface',
    templateUrl: './drawing-surface.component.html',
    styleUrls: ['./drawing-surface.component.scss'],
})
export class DrawingSurfaceComponent {
    width: number;
    height: number;
    color: number; // Use Color type when implemented
}
