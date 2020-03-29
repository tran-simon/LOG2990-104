import { ToolProperties } from '@tool-properties/tool-properties';

export abstract class CreatorToolProperties extends ToolProperties {
  strokeWidth: number;
  abstract readonly minThickness: number;
  abstract readonly maxThickness: number;
}
