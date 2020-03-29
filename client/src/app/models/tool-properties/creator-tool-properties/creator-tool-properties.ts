import { ToolProperties } from 'src/app/models/tool-properties/tool-properties';

export abstract class CreatorToolProperties extends ToolProperties{
  strokeWidth: number;
  abstract readonly minThickness: number;
  abstract readonly maxThickness: number;
}
