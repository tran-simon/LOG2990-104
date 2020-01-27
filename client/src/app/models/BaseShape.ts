import {ShapeProperties} from './ShapeProperties';

export abstract class BaseShape {
  properties: ShapeProperties;

  constructor() {
    this.properties = new ShapeProperties();
  }
}
