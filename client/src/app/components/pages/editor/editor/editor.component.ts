import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Tool } from 'src/app/models/tools/tool';
import { ToolType } from 'src/app/models/tools/tool-type.enum';
import { EditorService } from 'src/app/services/editor.service';
import { KeyboardListenerService } from 'src/app/services/event-listeners/keyboard-listener/keyboard-listener.service';
import { MouseListenerService } from 'src/app/services/event-listeners/mouse-listener/mouse-listener.service';
import { ModalDialogService } from 'src/app/services/modal/modal-dialog.service';
import { ModalType } from 'src/app/services/modal/modal-type.enum';
import { Color } from 'src/app/utils/color/color';
import { DrawingSurfaceComponent } from '../drawing-surface/drawing-surface.component';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  providers: [KeyboardListenerService, MouseListenerService],
})
export class EditorComponent implements OnInit, AfterViewInit {
  @ViewChild('drawingSurface', { static: false })
  drawingSurface: DrawingSurfaceComponent;

  private _currentToolType: ToolType;

  surfaceColor: Color;
  surfaceWidth: number;
  surfaceHeight: number;
  modalTypes: typeof ModalType;

  constructor(
    private router: ActivatedRoute,
    public editorService: EditorService,
    private dialog: ModalDialogService,
    private keyboardListener: KeyboardListenerService,
    private mouseListener: MouseListenerService,
  ) {
    this.surfaceColor = DrawingSurfaceComponent.DEFAULT_COLOR;
    this.surfaceWidth = DrawingSurfaceComponent.DEFAULT_WIDTH;
    this.surfaceHeight = DrawingSurfaceComponent.DEFAULT_HEIGHT;
    this.modalTypes = ModalType;

    this.keyboardListener.addEvents([
      [
        KeyboardListenerService.getIdentifier('l'),
        () => {
          this.currentToolType = ToolType.Line;
        },
      ],
      [
        KeyboardListenerService.getIdentifier('3'),
        () => {
          this.currentToolType = ToolType.Polygon;
        },
      ],
      [
        KeyboardListenerService.getIdentifier('c'),
        () => {
          this.currentToolType = ToolType.Pen;
        },
      ],
      [
        KeyboardListenerService.getIdentifier('w'),
        () => {
          this.currentToolType = ToolType.Brush;
        },
      ],
      [
        KeyboardListenerService.getIdentifier('1'),
        () => {
          this.currentToolType = ToolType.Rectangle;
        },
      ],
      [
        KeyboardListenerService.getIdentifier('i'),
        () => {
          this.currentToolType = ToolType.Pipette;
        },
      ],
      [
        KeyboardListenerService.getIdentifier('o', true),
        () => {
          this.openCreateModal();
          return true;
        },
      ],
      [
        KeyboardListenerService.getIdentifier('z', true),
        () => {
          this.editorService.commandReceiver.undo();
          return true;
        },
      ],
      [
        KeyboardListenerService.getIdentifier('z', true, true),
        () => {
          this.editorService.commandReceiver.redo();
          return true;
        },
      ],
      [
        KeyboardListenerService.getIdentifier('e', true),
        () => {
          this.dialog.openByName(ModalType.EXPORT);
          return true;
        },
      ],
      [
        KeyboardListenerService.getIdentifier('s', true),
        () => {
          this.dialog.openByName(ModalType.SAVE);
          return true;
        },
      ],
    ]);

    this.keyboardListener.defaultEventAction = (e) => {
      return this.currentTool ? this.currentTool.handleKeyboardEvent(e) : false;
    };

    this.mouseListener.defaultEventAction = (e) => {
      return this.currentTool ? this.currentTool.handleMouseEvent(e) : false;
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
    this.mouseListener.handle(e);
  }
  changeBackground(color: Color): void {
    this.drawingSurface.color = color;
  }

  @HostListener('window:keydown', ['$event'])
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent): void {
    this.keyboardListener.handle(event);
  }

  openGuide(): void {
    this.dialog.openByName(ModalType.GUIDE);
  }

  openChooseExportSave(): void {
    const confirmDialog = this.dialog.openByName(ModalType.CHOOSE_EXPORT_SAVE);

    if (confirmDialog) {
      confirmDialog.afterClosed().subscribe((result) => {
        this.dialog.openByName(result);
      });
    }
  }

  openCreateModal(): void {
    const confirmDialog = this.dialog.openByName(ModalType.CONFIRM);
    if (confirmDialog) {
      confirmDialog.afterClosed().subscribe((result) => {
        if (result) {
          this.dialog.openByName(ModalType.CREATE);
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
