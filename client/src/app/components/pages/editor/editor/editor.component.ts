import { AfterViewInit, Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EraserTool } from '@tools/editing-tools/eraser-tool/eraser-tool';
import { ToolbarComponent } from 'src/app/components/pages/editor/toolbar/toolbar/toolbar.component';
import { BaseShape } from 'src/app/models/shapes/base-shape';
import { SelectionTool } from 'src/app/models/tools/editing-tools/selection-tool';
import { SimpleSelectionTool } from 'src/app/models/tools/editing-tools/simple-selection-tool';
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

  @ViewChild('toolbar', { static: false }) toolbar: ToolbarComponent;

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
        KeyboardListenerService.getIdentifier('a'),
        () => {
          this.currentToolType = ToolType.Spray;
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
        KeyboardListenerService.getIdentifier('s'),
        () => {
          this.currentToolType = ToolType.Select;
          return false;
        },
      ],
      [
        KeyboardListenerService.getIdentifier('a', true),
        () => {
          (this.editorService.tools.get(ToolType.Select) as SelectionTool).selectAll();
          return false;
        },
      ],
      [
        KeyboardListenerService.getIdentifier('+', false),
        () => {
          // (this.editorService.tools.get(ToolType.Grid) as GridTool).upscaleGrid();
          return false;
        },
      ],
      [
        KeyboardListenerService.getIdentifier('-', false),
        () => {
          // (this.editorService.tools.get(ToolType.Grid) as GridTool).downscaleGrid();
          return false;
        },
      ],
      [
        KeyboardListenerService.getIdentifier('r'),
        () => {
          this.currentToolType = ToolType.ColorApplicator;
          return false;
        },
      ],
      [
        KeyboardListenerService.getIdentifier('e'),
        () => {
          this.currentToolType = ToolType.Eraser;
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
      [
        KeyboardListenerService.getIdentifier('z', true),
        () => {
          this.editorService.commandReceiver.undo();
          if (this.currentTool) {
            this.currentTool.handleUndoRedoEvent(true);
          }
          return true;
        },
      ],
      [
        KeyboardListenerService.getIdentifier('z', true, true),
        () => {
          this.editorService.commandReceiver.redo();
          if (this.currentTool) {
            this.currentTool.handleUndoRedoEvent(false);
          }
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
    if (!this.dialog.modalIsOpened) {
      this.keyboardListener.handle(event);
    }
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

  shapeClicked(shape: BaseShape, rightClick: boolean = false): void {
    if (this.currentTool instanceof SimpleSelectionTool) {
      (this.currentTool as SimpleSelectionTool).selectShape(shape, rightClick);
    }
  }

  setToolbarState(opened: boolean): void {
    opened ? this.toolbar.open() : this.toolbar.close();
    this.keyboardListener.listening = !(opened || this.dialog.modalIsOpened);
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
    if (value === ToolType.Eraser) {
      // todo
      (this.currentTool as EraserTool).init();
    }
  }
}
