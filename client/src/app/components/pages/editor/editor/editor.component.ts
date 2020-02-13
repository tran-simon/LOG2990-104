import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreatorTool } from 'src/app/models/tools/creator-tools/CreatorTool';
import { LineTool } from 'src/app/models/tools/creator-tools/LineTool';
import { RectangleTool } from 'src/app/models/tools/creator-tools/shape-tools/RectangleTool';
import { BrushTool } from 'src/app/models/tools/creator-tools/stroke-tools/BrushTool';
import { PenTool } from 'src/app/models/tools/creator-tools/stroke-tools/PenTool';
import { Color } from 'src/app/utils/color/color';
import { KeyboardEventHandler } from 'src/app/utils/events/keyboard-event-handler';
import { KeyboardListener } from 'src/app/utils/events/keyboard-listener';
import { DrawingSurfaceComponent } from '../drawing-surface/drawing-surface.component';

import { ToolProperties } from 'src/app/models/ToolProperties/ToolProperties';
import { ToolbarComponent } from '../toolbar/toolbar.component';

export interface EditorParams {
  width: string;
  height: string;
  color: string;
}

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit, AfterViewInit {
  private keyboardEventHandler: KeyboardEventHandler;

  surfaceWidth = 0;
  surfaceHeight = 0;

  surfaceColor = Color.WHITE;

  @ViewChild('toolbar', { static: false })
  toolbar: ToolbarComponent;

  @ViewChild('drawingSurface', { static: false })
  drawingSurface: DrawingSurfaceComponent;

  currentTool: CreatorTool = new LineTool(this.drawingSurface);

  constructor(private router: ActivatedRoute) {
    this.keyboardEventHandler = {
      l: () => {
        this.selectLineTool(this.toolbar.lineProperties);
        return true;
      },
      c: () => {
        this.selectPenTool(this.toolbar.penProperties);
        return false;
      },
      w: () => {
        this.selectBrushTool(this.toolbar.brushProperties);
        return false;
      },
      1: () => {
        this.selectRectangleTool(this.toolbar.rectangleProperties);
        return false; // todo - enable default behavior when typing in text field
      },
      def: (e) => {
        return this.currentTool.handleKeyboardEvent(e);
      },
    } as KeyboardEventHandler;
  }

  ngOnInit() {
    this.router.params.subscribe((params) => {
      this.surfaceWidth = params.width ? +params.width : 500;
      this.surfaceHeight = params.height ? +params.height : 300;
      this.surfaceColor = params.color ? Color.hex(params.color) : Color.WHITE;
    });
  }

  ngAfterViewInit() {
    this.selectLineTool(this.toolbar.lineProperties);
  }

  handleMouseEvent(e: MouseEvent) {
    this.currentTool.handleMouseEvent(e);
  }

  handleToolChanged(toolEvent: ToolProperties) {
    switch (toolEvent.toolName) {
      case 'Pen':
        this.selectPenTool(toolEvent);
        break;
      case 'Brush':
        this.selectBrushTool(toolEvent);
        break;
      case 'Rectangle':
        this.selectRectangleTool(toolEvent);
        break;
      case 'Line':
        this.selectLineTool(toolEvent);
        break;
    }
  }

  selectPenTool(properties: ToolProperties) {
    this.currentTool = new PenTool(this.drawingSurface);
    this.currentTool.toolProperties = properties;
  }

  selectBrushTool(properties: ToolProperties) {
    this.currentTool = new BrushTool(this.drawingSurface);
    this.currentTool.toolProperties = properties;
  }

  selectRectangleTool(properties: ToolProperties) {
    this.currentTool = new RectangleTool(this.drawingSurface);
    this.currentTool.toolProperties = properties;
  }

  selectLineTool(properties: ToolProperties) {
    this.currentTool = new LineTool(this.drawingSurface);
    this.currentTool.toolProperties = properties;
  }

  changeBackground(color: Color): void {
    this.drawingSurface.color = color;
  }

  @HostListener('window:keydown', ['$event'])
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    KeyboardListener.keyEvent(event, this.keyboardEventHandler);
  }
}
