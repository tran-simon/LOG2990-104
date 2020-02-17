import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreatorTool } from 'src/app/models/tools/creator-tools/creator-tool';
import { LineTool } from 'src/app/models/tools/creator-tools/line-tool';
import { RectangleTool } from 'src/app/models/tools/creator-tools/shape-tools/rectangle-tool';
import { BrushTool } from 'src/app/models/tools/creator-tools/stroke-tools/brush-tool';
import { PenTool } from 'src/app/models/tools/creator-tools/stroke-tools/pen-tool';
import { ToolType } from 'src/app/models/tools/tool';
import { SelectedColorsService } from 'src/app/services/selected-colors.service';
import { Color } from 'src/app/utils/color/color';
import { KeyboardEventHandler } from 'src/app/utils/events/keyboard-event-handler';
import { KeyboardListener } from 'src/app/utils/events/keyboard-listener';
import { DrawingSurfaceComponent } from '../drawing-surface/drawing-surface.component';

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

  // @ViewChild('toolbar', { static: false })
  // toolbar: ToolbarComponent;

  @ViewChild('drawingSurface', { static: false })
  drawingSurface: DrawingSurfaceComponent;

  tools: any; // todo

  currentTool: CreatorTool;
  surfaceColor: Color;
  surfaceWidth: number;
  surfaceHeight: number;

  constructor(private router: ActivatedRoute, public selectedColors: SelectedColorsService) {
    // todo
    this.surfaceColor = Color.WHITE;
    this.surfaceWidth = 0;
    this.surfaceHeight = 0;
    this.keyboardEventHandler = {
      l: () => {
        this.selectTool(ToolType.Line);
        return false;
      },
      c: () => {
        this.selectTool(ToolType.Pen);
        return false;
      },
      w: () => {
        this.selectTool(ToolType.Brush);
        return false;
      },
      1: () => {
        this.selectTool(ToolType.Rectangle);
        return false; // todo - enable default behavior when typing in text field
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
    // todo
    this.tools = {
      [ToolType.Pen]: new PenTool(this.drawingSurface, this.selectedColors),
      [ToolType.Brush]: new BrushTool(this.drawingSurface, this.selectedColors),
      [ToolType.Rectangle]: new RectangleTool(this.drawingSurface, this.selectedColors),
      [ToolType.Line]: new LineTool(this.drawingSurface, this.selectedColors),
    };

    this.selectTool(ToolType.Pen); // todo
  }

  handleMouseEvent(e: MouseEvent): void {
    this.currentTool.handleMouseEvent(e);
  }

  handleToolChanged(type: ToolType): void {
    this.selectTool(type);
  }

  selectTool(type: ToolType): void {
    this.currentTool = this.tools[type];
  }

  /* selectPenTool(properties: ToolProperties): void {
    if (this.toolbar.currentTool !== ToolType.Pen) {
      this.toolbar.currentTool = ToolType.Pen;
    } else {
      this.currentTool = new PenTool(this.drawingSurface, this.selectedColors);
      this.currentTool.toolProperties = properties;
    }
  }

  selectBrushTool(properties: ToolProperties): void {
    if (this.toolbar.currentToolType !== ToolType.Brush) {
      this.toolbar.currentToolType = ToolType.Brush;
    } else {
      this.currentTool = new BrushTool(this.drawingSurface, this.selectedColors);
      this.currentTool.toolProperties = properties;
    }
  }

  selectRectangleTool(properties: ToolProperties): void {
    if (this.toolbar.currentToolType !== ToolType.Rectangle) {
      this.toolbar.currentToolType = ToolType.Rectangle;
    } else {
      this.currentTool = new RectangleTool(this.drawingSurface, this.selectedColors);
      this.currentTool.toolProperties = properties;
    }
  }

  selectLineTool(properties: ToolProperties): void {
    if (this.toolbar.currentToolType !== ToolType.Line) {
      this.toolbar.currentToolType = ToolType.Line;
    } else {
      this.currentTool = new LineTool(this.drawingSurface, this.selectedColors);
      this.currentTool.toolProperties = properties;
    }
  }*/

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
