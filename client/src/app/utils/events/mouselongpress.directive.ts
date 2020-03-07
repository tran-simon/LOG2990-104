import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[mouselongpress]',
})
export class MouselongpressDirective {
  @Output() longPressed: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @HostBinding('class.longPress') get longPress(): EventEmitter<MouseEvent> {
    return this.longPressed;
  }
  interval: number;
  @HostListener('mousedown', ['$event'])
  onMouseDown(e: MouseEvent): void {
    this.interval = setInterval(() => {
      this.longPressed.emit(e);
    }, 1);
  }

  @HostListener('mouseup')
  @HostListener('mouseleave')
  endPress(): void {
    clearInterval(this.interval);
  }
}
