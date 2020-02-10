import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreatorTool } from 'src/app/models/CreatorTool';
import { LineTool } from 'src/app/models/LineTool';
import { RectangleTool } from 'src/app/models/RectangleTool';
import { Color } from 'src/app/utils/color/color';
import { KeyboardEventHandler } from 'src/app/utils/events/keyboard-event-handler';
import { KeyboardListener } from 'src/app/utils/events/keyboard-listener';
import { PenTool } from '../../../../models/PenTool';
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
  private keyboardEventHandler: KeyboardEventHandler;
  surfaceWidth = 0;
  surfaceHeight = 0;
  surfaceColor = Color.WHITE;

  @ViewChild('drawingSurface', { static: false })
  drawingSurface: DrawingSurfaceComponent;

  currentTool: CreatorTool = new LineTool(this.drawingSurface);

  constructor(private router: ActivatedRoute) {
    this.keyboardEventHandler = {
      l: () => {
        this.selectLineTool();
        return true;
      },
      c: () => {
        this.selectPenTool();
        return false;
      },
      1: () => {
        this.selectRectangleTool();
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
    this.selectLineTool();
  }

  handleMouseEvent(e: MouseEvent) {
    this.currentTool.handleMouseEvent(e);
  }

  selectLineTool() {
    this.currentTool = new LineTool(this.drawingSurface);
  }

  selectPenTool() {
    this.currentTool = new PenTool(this.drawingSurface);
  }

  selectRectangleTool() {
    this.currentTool = new RectangleTool(this.drawingSurface);
  }

  @HostListener('window:keydown', ['$event'])
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    KeyboardListener.keyEvent(event, this.keyboardEventHandler);
  }
}
