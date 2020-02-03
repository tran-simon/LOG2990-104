import {Component, HostListener, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Color} from 'src/app/utils/color/color';
import {KeyboardEventHandler} from 'src/app/utils/events/KeyboardEventHandler';
import {KeyboardListener} from 'src/app/utils/events/KeyboardListener';

export interface EditorParams {
  surfaceWidth: number;
  surfaceHeight: number;
  surfaceColor: Color;
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, KeyboardEventHandler {
  params: EditorParams = {surfaceColor: Color.WHITE, surfaceHeight: 0, surfaceWidth: 0};
  keyboardListener: KeyboardListener = new KeyboardListener(this);

  constructor(private router: ActivatedRoute) {
  }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.params.surfaceWidth = params.width ? +params.width : 500;
      this.params.surfaceHeight = params.height ? +params.height : 300;
      this.params.surfaceColor = params.color ? Color.hex(params.color) : Color.WHITE;
    });
  }

  ctrlA(event: KeyboardEvent): boolean {
    console.trace('ctrlA');
    return true;
  }

  ctrlC(event: KeyboardEvent): boolean {
    console.trace('ctrlC');
    return true;
  }

  ctrlD(event: KeyboardEvent): boolean {
    console.trace('ctrlD');
    return true;
  }

  ctrlShiftZ(event: KeyboardEvent): boolean {
    console.trace('ctrlShiftZ');
    return true;
  }

  ctrlV(event: KeyboardEvent): boolean {
    console.trace('ctrlV');
    return true;
  }

  ctrlX(event: KeyboardEvent): boolean {
    console.trace('ctrlX');
    return true;
  }

  ctrlZ(event: KeyboardEvent): boolean {
    console.trace('ctrlZ');
    return true;
  }

  @HostListener('window:keydown', ['$event'])
  keyDown(event: KeyboardEvent): void {
    this.keyboardListener.keyDown(event);
  }

}
