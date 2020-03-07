import { Directive, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';

@Directive({
  selector: '[mouselongpress]',
})
export class MouselongpressDirective {
  interval: any;

  @Input() frequency = 1;
  @Output() longPressed = new EventEmitter<MouseEvent>();
  @HostBinding('class.longPress') get longPress() {
    return this.longPressed;
  }

  @HostListener('mousedown', ['$event'])
  onMouseDown(e: MouseEvent) {
    this.interval = setInterval(() => {
      this.longPressed.emit(e);
    }, 0.5);
  }

  @HostListener('mouseup')
  @HostListener('mouseleave')
  endPress() {
    clearInterval(this.interval);
  }
}
