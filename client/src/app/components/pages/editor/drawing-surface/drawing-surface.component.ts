import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { CreatorTool } from 'src/app/models/tools/creator-tools/creator-tool';
import { ColorsService } from 'src/app/services/colors.service';
import { Color } from 'src/app/utils/color/color';

@Component({
  selector: 'app-drawing-surface',
  templateUrl: './drawing-surface.component.html',
  styleUrls: ['./drawing-surface.component.scss'],
})
export class DrawingSurfaceComponent {
  @Input() width: number;
  @Input() height: number;
  @Input() color: Color;

  @ViewChild('svg', { static: false })
  svg: ElementRef;

  constructor(public tools: ColorsService) {
    this.color = Color.WHITE;
  }

  drawShape(tool: CreatorTool): void {
    this.svg.nativeElement.appendChild(tool.shape.svgNode);
  }

  cancelShape(tool: CreatorTool): void {
    this.svg.nativeElement.removeChild(tool.shape.svgNode);
  }
}
