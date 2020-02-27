import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tool, ToolType } from 'src/app/models/tools/tool';
import { EditorService } from 'src/app/services/editor.service';
import { Color } from 'src/app/utils/color/color';
import { KeyboardEventAction, KeyboardListener } from 'src/app/utils/events/keyboard-listener';
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
  private readonly keyboardListener: KeyboardListener;

  @ViewChild('drawingSurface', { static: false })
  drawingSurface: DrawingSurfaceComponent;

  private _currentToolType: ToolType;

  surfaceColor: Color;
  surfaceWidth: number;
  surfaceHeight: number;

  constructor(private router: ActivatedRoute, public editorService: EditorService) {
    this.surfaceColor = Color.WHITE;
    this.surfaceWidth = 0;
    this.surfaceHeight = 0;

    this.keyboardListener = new KeyboardListener(new Map<string, KeyboardEventAction>([
      [KeyboardListener.getIdentifier('l'), () => {
        this.currentToolType = ToolType.Line;
        return false;
      }],
      [KeyboardListener.getIdentifier('c'), () => {
        this.currentToolType = ToolType.Pen;
        return false;
      }],
      [KeyboardListener.getIdentifier('w'), () => {
        this.currentToolType = ToolType.Brush;
        return false;
      }],
      [KeyboardListener.getIdentifier('1'), () => {
        this.currentToolType = ToolType.Rectangle;
        return false;
      }],
    ]));

    this.keyboardListener.defaultEventAction = (e) => {
      return this.currentTool ? this.currentTool.handleKeyboardEvent(e) : false;
    };

    this.currentToolType = ToolType.Pen;
  }

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.surfaceWidth = params.width ? +params.width : 500;
      this.surfaceHeight = params.height ? +params.height : 300;
      this.surfaceColor = params.color ? Color.hex(params.color) : Color.WHITE;
    });
  }

  ngAfterViewInit(): void {
    this.editorService.view = this.drawingSurface;
  }

  handleMouseEvent(e: MouseEvent): void {
    if (this.currentTool) {
      this.currentTool.handleMouseEvent(e);
    }
  }

  changeBackground(color: Color): void {
    this.drawingSurface.color = color;
  }

  @HostListener('window:keydown', ['$event'])
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    this.keyboardListener.handle(event);
  }

  @HostListener('contextmenu', ['$event'])
  onRightClick(e: MouseEvent): void {
    e.preventDefault();
  }

  get currentTool(): Tool | undefined {
    return this.editorService.tools.get(this.currentToolType);
  }

  get currentToolType(): ToolType {
    return this._currentToolType;
  }

  set currentToolType(value: ToolType) {
    if (this.currentTool) {
      this.currentTool.cancel();
    }
    this._currentToolType = value;
  }
}
