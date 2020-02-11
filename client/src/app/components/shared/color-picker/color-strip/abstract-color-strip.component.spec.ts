import { AbstractColorStripComponent } from 'src/app/components/shared/color-picker/color-strip/abstract-color-strip.component';
import { Color } from 'src/app/utils/color/color';

describe('AbstractColorStripComponent', () => {
  class AbstractColorStripComponentImpl extends AbstractColorStripComponent {
    getFillStyle(width: number, height: number): string | CanvasGradient | CanvasPattern {
      return 'white';
    }

    get value(): number {
      return 0;
    }

    calculateNewColor(value: number): Color {
      return Color.RED;
    }

    shouldRedraw(color: Color): boolean {
      return false;
    }
  }

  const component: AbstractColorStripComponent = new AbstractColorStripComponentImpl();

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
