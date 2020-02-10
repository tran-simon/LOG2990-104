import { BaseShape } from './BaseShape';

export class Path extends BaseShape {
  private _trace: string;

  get trace(): string {
    return this._trace;
  }

  set trace(node: string) {
    this._trace += node;
  }

  constructor(posX: number, posY: number) {
    super('path');
    this._trace = 'M ' + posX + ' ' + posY;
  }

  updateProperties() {
    super.updateProperties();
    this._svgNode.style.fill = 'transparent';
    this._svgNode.style.strokeLinecap = 'round';
    this._svgNode.style.strokeLinejoin = 'round';
  }
}
