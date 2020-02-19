import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LineTool } from 'src/app/models/tools/creator-tools/line-tool';
import { RectangleTool } from 'src/app/models/tools/creator-tools/shape-tools/rectangle-tool';
import { BrushTool } from 'src/app/models/tools/creator-tools/stroke-tools/brush-tool';
import { PenTool } from 'src/app/models/tools/creator-tools/stroke-tools/pen-tool';
import { Tool, ToolType } from 'src/app/models/tools/tool';
import { ColorsService } from 'src/app/services/colors.service';
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

  @ViewChild('drawingSurface', { static: false })
  drawingSurface: DrawingSurfaceComponent;

  currentToolType: ToolType;

  surfaceColor: Color;
  surfaceWidth: number;
  surfaceHeight: number;

  tools: Record<ToolType, Tool>;

  constructor(private router: ActivatedRoute, public colorsService: ColorsService) {
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

    this.tools = {
      [ToolType.Pen]: new PenTool(colorsService),
      [ToolType.Brush]: new BrushTool(colorsService),
      [ToolType.Rectangle]: new RectangleTool(colorsService),
      [ToolType.Line]: new LineTool(colorsService),
    } as Record<ToolType, Tool>;

    this.selectTool(ToolType.Pen);
  }

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.surfaceWidth = params.width ? +params.width : 500;
      this.surfaceHeight = params.height ? +params.height : 300;
      this.surfaceColor = params.color ? Color.hex(params.color) : Color.WHITE;
    });
  }

  ngAfterViewInit(): void {
    this.selectTool(ToolType.Pen);
  }

  handleMouseEvent(e: MouseEvent): void {
    this.currentTool.handleMouseEvent(e, this.drawingSurface);
  }

  selectTool(type: ToolType): void {
    this.currentToolType = type;
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

  get currentTool(): Tool {
    return this.tools[this.currentToolType];
  }
}
