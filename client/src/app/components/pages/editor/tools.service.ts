import { Injectable } from '@angular/core';
import { CreatorTool } from 'src/app/models/tools/creator-tools/creator-tool';
import { LineTool } from 'src/app/models/tools/creator-tools/line-tool';
import { RectangleTool } from 'src/app/models/tools/creator-tools/shape-tools/rectangle-tool';
import { BrushTool } from 'src/app/models/tools/creator-tools/stroke-tools/brush-tool';
import { PenTool } from 'src/app/models/tools/creator-tools/stroke-tools/pen-tool';
import { ToolType } from 'src/app/models/tools/tool';
import { ColorsService } from 'src/app/services/colors.service';

@Injectable({
  providedIn: 'root',
})
// todo move to services
export class ToolsService {
  readonly tools: any; // todo

  constructor(public colorsService: ColorsService) {
    this.tools = {
      [ToolType.Pen]: new PenTool(colorsService),
      [ToolType.Brush]: new BrushTool(colorsService),
      [ToolType.Rectangle]: new RectangleTool(colorsService),
      [ToolType.Line]: new LineTool(colorsService),
    };
  }

  getByType(type: ToolType): CreatorTool {
    return this.tools[type];
  }
}
