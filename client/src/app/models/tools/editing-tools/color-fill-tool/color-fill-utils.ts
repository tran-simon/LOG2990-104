import { Color } from '@utils/color/color';
import { Coordinate } from '@utils/math/coordinate';
import { Direction } from '@utils/math/direction.enum';

export type ColorGetter = (point: Coordinate) => Color | undefined;
export type ColorSetter = (point: Coordinate, color: Color) => void;

export class ColorFillUtils {
  private readonly getColor: ColorGetter;
  private readonly setColor: ColorSetter;
  private node: Coordinate;
  private targetColor: Color;
  private replacementColor: Color;

  constructor(getColor: ColorGetter, setColor: ColorSetter) {
    this.getColor = getColor;
    this.setColor = setColor;
  }

  updateNode(node: Coordinate, direction: Direction): Coordinate | undefined {
    const neighbor = node.neighbor(direction);
    const neighborColor = this.getColor(neighbor);
    if (!neighborColor || !neighborColor.compare(this.targetColor)) {
      return undefined;
    }
    this.setColor(neighbor, this.replacementColor);
    return neighbor;
  }

  updateNodes(node: Coordinate, queue: Coordinate[]): void {
    const update = (direction: Direction): void => {
      const res = this.updateNode(node, direction);
      if (res) {
        queue.push(res);
      }
    };

    update(Direction.North);
    update(Direction.East);
    update(Direction.South);
    update(Direction.West);
  }

  floodFill(node: Coordinate, targetColor: Color, replacementColor: Color): void {
    this.node = node;
    this.targetColor = targetColor;
    this.replacementColor = replacementColor;

    const nodeColor = this.getColor(this.node);
    const targetIsReplacement = this.targetColor.compare(this.replacementColor);
    const nodeColorIsNotTarget = !nodeColor || !nodeColor.compare(this.targetColor);

    if (!targetIsReplacement && !nodeColorIsNotTarget) {
      this.setColor(this.node, this.replacementColor);
      const Q: Coordinate[] = [this.node];
      while (Q.length !== 0) {
        const n: Coordinate = Q.shift() as Coordinate;
        this.updateNodes(n, Q);
      }
    }
  }
}
