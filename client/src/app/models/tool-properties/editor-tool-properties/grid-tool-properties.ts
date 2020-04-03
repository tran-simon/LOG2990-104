import { NumericProperty } from '@tool-properties/props/numeric-property/numeric-property';
import { ToolProperties } from '@tool-properties/tool-properties';

export class GridToolProperties extends ToolProperties {
  static readonly MIN_SMALLGRID_SIZE: number = 1;
  static readonly MAX_SMALLGRID_SIZE: number = 50;
  static readonly MIN_LARGEGRID_SIZE: number = 5;
  static readonly MAX_LARGEGRID_SIZE: number = 250;
  static readonly DEFAULT_GRIDOPACITY: number = 0.75;

  smallGridSize: NumericProperty;
  largeGridSize: NumericProperty;
  gridOpacity: NumericProperty;

  constructor(
    smallGridSize: number = GridToolProperties.MIN_SMALLGRID_SIZE,
    largeGridSize: number = GridToolProperties.MIN_LARGEGRID_SIZE,
    gridOpacity: number = GridToolProperties.DEFAULT_GRIDOPACITY,
  ) {
    super();
    this.smallGridSize = new NumericProperty(GridToolProperties.MIN_SMALLGRID_SIZE, GridToolProperties.MAX_SMALLGRID_SIZE, smallGridSize);
    this.largeGridSize = new NumericProperty(GridToolProperties.MIN_LARGEGRID_SIZE, GridToolProperties.MAX_LARGEGRID_SIZE, largeGridSize);
    this.gridOpacity = new NumericProperty(0, 1, gridOpacity);
  }
}
