import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: 'app-drawing-surface',
})
export class MouselongpressDirective {
  // tslint:disable-next-line:no-any
  interval: any; // Type NODEJS.Timer not found at runtime :(

  @Output() longPressed: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() dragged: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @HostListener('mousedown', ['$event'])
  onmousedown(e: MouseEvent): void {
    this.interval = setInterval(() => {
      this.longPressed.emit(e);
    }, 0);
  }

  @HostListener('mouseup')
  @HostListener('mouseleave')
  endPress(): void {
    clearInterval(this.interval);
  }
}
