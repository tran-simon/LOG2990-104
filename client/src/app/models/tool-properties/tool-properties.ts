export abstract class ToolProperties {
  toolName: string;

  protected constructor(toolName: string) {
    this.toolName = toolName;
  }
}
