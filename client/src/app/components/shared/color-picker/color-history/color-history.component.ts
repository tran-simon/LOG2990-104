import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Color } from 'src/app/utils/color/color';

@Component({
  selector: 'app-color-history',
  templateUrl: './color-history.component.html',
  styleUrls: ['./color-history.component.scss'],
})
export class ColorHistoryComponent implements OnInit, OnChanges {
  static readonly MAX_HISTORY_LENGTH = 10;
  private static COLOR_HISTORY: Color[] = [];

  static push(color: Color): Color | undefined {
    return this.COLOR_HISTORY.push(color) > this.MAX_HISTORY_LENGTH ? this.COLOR_HISTORY.shift() : undefined;
  }
  static getColorHistory(): Color[] {
    return this.COLOR_HISTORY;
  }

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit() {}
}
