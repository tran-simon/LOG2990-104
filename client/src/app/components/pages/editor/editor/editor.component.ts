import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tool } from 'src/app/models/tools/tool';
import { ToolType } from 'src/app/models/tools/tool-type';
import { EditorService } from 'src/app/services/editor.service';
import { KeyboardListenerService } from 'src/app/services/event-listeners/keyboard-listener.service';
import { ModalDialogService, ModalTypes } from 'src/app/services/modal-dialog.service';
import { Color } from 'src/app/utils/color/color';
import { DrawingSurfaceComponent } from '../drawing-surface/drawing-surface.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [KeyboardListenerService],
})
export class EditorComponent implements OnInit, AfterViewInit {
  @ViewChild('drawingSurface', {static: false})
  drawingSurface: DrawingSurfaceComponent;

  private _currentToolType: ToolType;

  surfaceColor: Color;
  surfaceWidth: number;
  surfaceHeight: number;
  modalTypes: typeof ModalTypes;

  constructor(private router: ActivatedRoute,
              public editorService: EditorService,
              private dialog: ModalDialogService,
              private keyboardListener: KeyboardListenerService) {
    this.surfaceColor = DrawingSurfaceComponent.DEFAULT_COLOR;
    this.surfaceWidth = DrawingSurfaceComponent.DEFAULT_WIDTH;
    this.surfaceHeight = DrawingSurfaceComponent.DEFAULT_HEIGHT;
    this.modalTypes = ModalTypes;

    this.keyboardListener.addEvents([
        [
          KeyboardListenerService.getIdentifier('l'),
          () => {
            this.currentToolType = ToolType.Line;
            return false;
          },
        ],
        [
          KeyboardListenerService.getIdentifier('c'),
          () => {
            this.currentToolType = ToolType.Pen;
            return false;
          },
        ],
        [
          KeyboardListenerService.getIdentifier('w'),
          () => {
            this.currentToolType = ToolType.Brush;
            return false;
          },
        ],
        [
          KeyboardListenerService.getIdentifier('1'),
          () => {
            this.currentToolType = ToolType.Rectangle;
            return false;
          },
        ],
        [
          KeyboardListenerService.getIdentifier('i'),
          () => {
            this.currentToolType = ToolType.Pipette;
            return false;
          },
        ],
        [
          KeyboardListenerService.getIdentifier('o', true),
          () => {
            this.openCreateModal();
            return true;
          },
        ],
    ]);

    this.keyboardListener.defaultEventAction = (e) => {
      return this.currentTool ? this.currentTool.handleKeyboardEvent(e) : false;
    };

    this.currentToolType = ToolType.Pen;
  }

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
      this.surfaceWidth = params.width ? +params.width : this.surfaceWidth;
      this.surfaceHeight = params.height ? +params.height : this.surfaceHeight;
      this.surfaceColor = params.color ? Color.hex(params.color) : this.surfaceColor;
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
    this.handleMouseEvent(e);
    e.preventDefault();
  }

  openGuide(): void {
    this.dialog.openByName(ModalTypes.GUIDE);
  }

  openCreateModal(): void {
    const confirmDialog = this.dialog.openByName(ModalTypes.CONFIRM);
    if (confirmDialog) {
      confirmDialog.afterClosed().subscribe((result) => {
        if (result) {
          this.dialog.openByName(ModalTypes.CREATE);
        }
      });
    }
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
