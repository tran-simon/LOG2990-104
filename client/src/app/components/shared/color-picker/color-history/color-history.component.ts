import { Component, EventEmitter, Output } from '@angular/core';
import { SelectedColorsService } from 'src/app/services/selected-colors.service';
import { Color } from 'src/app/utils/color/color';

@Component({
  selector: 'app-color-history',
  templateUrl: './color-history.component.html',
  styleUrls: ['./color-history.component.scss'],
})
export class ColorHistoryComponent {
  static readonly MAX_HISTORY_LENGTH = 10;
  private static COLOR_HISTORY: Color[] = new Array<Color>(ColorHistoryComponent.MAX_HISTORY_LENGTH).fill(Color.WHITE);

  @Output() colorSelectedEvent = new EventEmitter<Color>();

  constructor(private selectedColors: SelectedColorsService) {}

  static push(color: Color): Color | undefined {
    return this.COLOR_HISTORY.push(color) > this.MAX_HISTORY_LENGTH ? this.COLOR_HISTORY.shift() : undefined;
  }
  static getColorHistory(): Color[] {
    return this.COLOR_HISTORY;
  }

  get colorHistory(): Color[] {
    return ColorHistoryComponent.getColorHistory();
  }

  onClick(color: Color): void {
    this.selectedColors.primaryColor = color;
    this.colorSelectedEvent.emit(color);
  }
  onRightClick(color: Color): void {
    this.selectedColors.secondaryColor = color;
    this.colorSelectedEvent.emit(color);
  }
}
