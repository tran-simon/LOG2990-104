import { Color } from 'src/app/utils/color/color';

export class ToolProperties {
  toolName: string;
  primaryColor: Color;
  secondaryColor: Color;

  constructor(toolName: string, primaryColor: Color, secondaryColor: Color) {
    this.toolName = toolName;
    this.primaryColor = primaryColor;
    this.secondaryColor = secondaryColor;
  }
}
