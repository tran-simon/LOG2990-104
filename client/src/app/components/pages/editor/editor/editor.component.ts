import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Color } from 'src/app/utils/color/color';
import { KeyboardEventHandler } from 'src/app/utils/events/KeyboardEventHandler';
import { KeyboardListener } from 'src/app/utils/events/KeyboardListener';

export interface EditorParams {
  width: string;
  height: string;
  color: string;
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, KeyboardEventHandler {
  surfaceWidth = 0;
  surfaceHeight = 0;
  surfaceColor = Color.WHITE;
  keyboardListener: KeyboardListener = new KeyboardListener(this);

  constructor(private router: ActivatedRoute) {}

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.surfaceWidth = params.width ? +params.width : 500;
      this.surfaceHeight = params.height ? +params.height : 300;
      this.surfaceColor = params.color ? Color.hex(params.color) : Color.WHITE;
    });
  }

  ctrlA(event: KeyboardEvent): boolean {
    return true;
  }

  ctrlC(event: KeyboardEvent): boolean {
    return true;
  }

  ctrlD(event: KeyboardEvent): boolean {
    return true;
  }

  ctrlShiftZ(event: KeyboardEvent): boolean {
    return true;
  }

  ctrlV(event: KeyboardEvent): boolean {
    return true;
  }

  ctrlX(event: KeyboardEvent): boolean {
    return true;
  }

  ctrlZ(event: KeyboardEvent): boolean {
    return true;
  }

  @HostListener('window:keydown', ['$event'])
  keyDown(event: KeyboardEvent): void {
    this.keyboardListener.keyDown(event);
  }
}
