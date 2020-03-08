import { Directive, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: 'app-drawing-surface',
})
export class MouselongpressDirective {
  interval: number;

  @Output() longPressed: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output() dragged: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  @HostListener('mousedown', ['$event'])
  protected onmousedown(e: MouseEvent): void {
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
