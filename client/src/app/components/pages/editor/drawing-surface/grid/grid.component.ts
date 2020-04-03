import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent {
  static readonly SIZE_RATIO: number = 5;
  static readonly DEFAULT_GRID_SIZE: number = 16;
  static readonly DEFAULT_GRID_OPACITY: number = 0.75;
  static readonly GRID_SIZE_INCREMENT: number = 5;

  @Input() width: number;
  @Input() height: number;
  @Input() size: number;
  @Input() gridOpacity: number;

  generateGridPath(size: number): string {
    return `M ${size} 0 L 0 0 0 ${size}`;
  }

  get largeSize(): number {
    return this.size * GridComponent.SIZE_RATIO;
  }
}
