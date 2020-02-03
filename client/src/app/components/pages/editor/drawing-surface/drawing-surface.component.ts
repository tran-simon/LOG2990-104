import { Component, Input } from '@angular/core';
import { Color } from 'src/app/utils/color/color';

@Component({
  selector: 'app-drawing-surface',
  templateUrl: './drawing-surface.component.html',
  styleUrls: ['./drawing-surface.component.scss'],
})
export class DrawingSurfaceComponent {
  @Input() width: number;
  @Input() height: number;
  @Input() color = Color.WHITE;
}
