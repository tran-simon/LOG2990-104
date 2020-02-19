import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommandReceiver } from 'src/app/models/commands/command-receiver';
import { ToolProperties } from 'src/app/models/tool-properties/tool-properties';
import { CreatorTool } from 'src/app/models/tools/creator-tools/creator-tool';
import { LineTool } from 'src/app/models/tools/creator-tools/line-tool';
import { RectangleTool } from 'src/app/models/tools/creator-tools/shape-tools/rectangle-tool';
import { BrushTool } from 'src/app/models/tools/creator-tools/stroke-tools/brush-tool';
import { PenTool } from 'src/app/models/tools/creator-tools/stroke-tools/pen-tool';
import { SelectedColorsService } from 'src/app/services/selected-colors.service';
import { Color } from 'src/app/utils/color/color';
import { KeyboardEventHandler } from 'src/app/utils/events/keyboard-event-handler';
import { KeyboardListener } from 'src/app/utils/events/keyboard-listener';
import { DrawingSurfaceComponent } from '../drawing-surface/drawing-surface.component';
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
  private readonly keyboardEventHandler: KeyboardEventHandler;

  @ViewChild('toolbar', { static: false })
  toolbar: ToolbarComponent;

  @ViewChild('drawingSurface', { static: false })
  drawingSurface: DrawingSurfaceComponent;

  currentTool: CreatorTool;
  surfaceColor: Color;
  surfaceWidth: number;
  surfaceHeight: number;

  constructor(private router: ActivatedRoute, private selectedColors: SelectedColorsService, private commandReceiver: CommandReceiver) {
    this.surfaceColor = Color.WHITE;
    this.surfaceWidth = 0;
    this.surfaceHeight = 0;

    this.keyboardEventHandler = {
      l: () => {
        this.selectLineTool(this.toolbar.lineProperties);
        return false;
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
        return false;
      },
      ctrl_z: () => {
        this.commandReceiver.undo();
        return true;
      },
      ctrl_shift_z: () => {
        this.commandReceiver.redo();
        return true;
      },
      def: (e) => {
        return this.currentTool.handleKeyboardEvent(e);
      },
    } as KeyboardEventHandler;
  }

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.surfaceWidth = params.width ? +params.width : 500;
      this.surfaceHeight = params.height ? +params.height : 300;
      this.surfaceColor = params.color ? Color.hex(params.color) : Color.WHITE;
    });
  }

  ngAfterViewInit(): void {
    this.selectPenTool(this.toolbar.lineProperties);
  }

  handleMouseEvent(e: MouseEvent): void {
    this.currentTool.handleMouseEvent(e);
  }

  handleToolChanged(toolEvent: ToolProperties): void {
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

  selectPenTool(properties: ToolProperties): void {
    if (this.toolbar.currentTool !== this.toolbar.tools.Pen) {
      this.toolbar.currentTool = this.toolbar.tools.Pen;
    } else {
      this.currentTool = new PenTool(this.drawingSurface, this.selectedColors);
      this.currentTool.toolProperties = properties;
    }
  }

  selectBrushTool(properties: ToolProperties): void {
    if (this.toolbar.currentTool !== this.toolbar.tools.Brush) {
      this.toolbar.currentTool = this.toolbar.tools.Brush;
    } else {
      this.currentTool = new BrushTool(this.drawingSurface, this.selectedColors);
      this.currentTool.toolProperties = properties;
    }
  }

  selectRectangleTool(properties: ToolProperties): void {
    if (this.toolbar.currentTool !== this.toolbar.tools.Rectangle) {
      this.toolbar.currentTool = this.toolbar.tools.Rectangle;
    } else {
      this.currentTool = new RectangleTool(this.drawingSurface, this.selectedColors);
      this.currentTool.toolProperties = properties;
    }
  }

  selectLineTool(properties: ToolProperties): void {
    if (this.toolbar.currentTool !== this.toolbar.tools.Line) {
      this.toolbar.currentTool = this.toolbar.tools.Line;
    } else {
      this.currentTool = new LineTool(this.drawingSurface, this.selectedColors);
      this.currentTool.toolProperties = properties;
    }
  }

  changeBackground(color: Color): void {
    this.drawingSurface.color = color;
  }

  @HostListener('window:keydown', ['$event'])
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    KeyboardListener.keyEvent(event, this.keyboardEventHandler);
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(e: MouseEvent): void {
    e.preventDefault();
  }
}
