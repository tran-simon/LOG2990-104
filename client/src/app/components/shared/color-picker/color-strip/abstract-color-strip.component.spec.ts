import { AbstractColorStripComponent } from 'src/app/components/shared/color-picker/color-strip/abstract-color-strip.component';

describe('AbstractColorStripComponent', () => {
  class AbstractColorStripComponentImpl extends AbstractColorStripComponent {
    getFillStyle(width: number, height: number): string | CanvasGradient | CanvasPattern {
      return 'white';
    }

    getIndicatorFillStyle(): string | CanvasGradient | CanvasPattern {
      return 'black';
    }

    getIndicatorStrokeStyle(): string | CanvasGradient | CanvasPattern {
      return 'blue';
    }

    get value(): number {
      return 0;
    }
  }

  const component: AbstractColorStripComponent = new AbstractColorStripComponentImpl();

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
