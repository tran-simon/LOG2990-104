import { Color } from '@utils/color/color';
import { Coordinate } from '@utils/math/coordinate';
import { Direction } from '@utils/math/direction.enum';

export type ColorGetter = (point: Coordinate) => Color | undefined;
export type ColorSetter = (point: Coordinate, color: Color) => void;

/**
 * https://en.wikipedia.org/wiki/Flood_fill
 */
export class ColorFillUtils {
  getColor: ColorGetter;
  setColor: ColorSetter;
  private node: Coordinate;
  private targetColor: Color;
  private replacementColor: Color;
  private tolerance: number;

  constructor(getColor?: ColorGetter, setColor?: ColorSetter) {
    if (getColor) {
      this.getColor = getColor;
    }
    if (setColor) {
      this.setColor = setColor;
    }
  }

  updateNode(node: Coordinate, direction: Direction): Coordinate | undefined {
    const neighbor = node.neighbor(direction);
    const neighborColor = this.getColor(neighbor);
    if (this.nodeColorIsTarget(neighborColor)) {
      this.setColor(neighbor, this.replacementColor);
      return neighbor;
    }
    return undefined;
  }

  private nodeColorIsTarget(color: Color | undefined): boolean {
    if (!color) {
      return false;
    }
    return color.compare(this.targetColor, this.tolerance) && !color.compare(this.replacementColor);
  }

  /**
   * returns an array of x pairs representing lines to fill.
   * @param x0 lower x bound
   * @param x1 upper x bound
   * @param y the line to inspect
   */
  scanLine(x0: number, x1: number = x0, y: number): number[][] {
    // todo: remove
    const res = [];
    let left = x0;
    let length = 0;
    for (let right = left; right <= x1 + 1; right++) {
      const color = this.getColor(new Coordinate(right, y));
      if (this.nodeColorIsTarget(color)) {
        length++;
      } else if (length) {
        res.push([left, right - 1]);
        left = right - 1;
        length = 0;
      } else {
        left = right + 1;
      }
    }
    return res;
  }

  private updateNodes(node: Coordinate, queue: Coordinate[]): void {
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

  floodFill(node: Coordinate, targetColor: Color, replacementColor: Color, tolerance: number = 0): void {
    if (!this.getColor || !this.setColor) {
      throw new Error('ColorFillUtils::floodFill error: missing required methods getColor or setColor');
    }

    this.node = node;
    this.targetColor = targetColor;
    this.replacementColor = replacementColor;
    this.tolerance = tolerance;

    const targetIsReplacement = this.targetColor.compare(this.replacementColor);
    if (!targetIsReplacement) {
      this.setColor(this.node, this.replacementColor);
      const Q: Coordinate[] = [this.node];
      while (Q.length !== 0) {
        const n: Coordinate = Q.shift() as Coordinate;
        this.updateNodes(n, Q);
      }
    }
  }

  /**
   * Based on https://lodev.org/cgtutor/floodfill.html
   */
  floodFillScanLine(node: Coordinate, targetColor: Color, replacementColor: Color, tolerance: number = 0): void {
    if (!this.getColor || !this.setColor) {
      throw new Error('ColorFillUtils::floodFillScanLine error: missing required methods getColor or setColor');
    }

    this.node = node;
    this.targetColor = targetColor;
    this.replacementColor = replacementColor;
    this.tolerance = tolerance;

    const array: Coordinate[] = [node];

    let above = false;
    let bellow = false;

    while (!!array.length) {
      const coord: Coordinate = array.pop() as Coordinate;
      let x1 = coord.x;
      while (this.nodeColorIsTarget(this.getColor(new Coordinate(x1, coord.y)))) {
        x1--;
      }
      x1++;
      above = false;
      bellow = false;

      while (this.nodeColorIsTarget(this.getColor(new Coordinate(x1, coord.y)))) {
        this.setColor(new Coordinate(x1, coord.y), this.replacementColor);
        if (!above && coord.y > 0 && this.nodeColorIsTarget(this.getColor(new Coordinate(x1, coord.y - 1)))) {
          array.push(new Coordinate(x1, coord.y - 1));
          above = true;
        } else if (above && this.nodeColorIsTarget(this.getColor(new Coordinate(x1, coord.y - 1)))) {
          above = false;
        }

        if (!bellow && this.nodeColorIsTarget(this.getColor(new Coordinate(x1, coord.y + 1)))) {
          array.push(new Coordinate(x1, coord.y + 1));
          bellow = true;
        } else if (bellow && this.nodeColorIsTarget(this.getColor(new Coordinate(x1, coord.y + 1)))) {
          bellow = false;
        }
        x1++;
      }
    }
  }
}
