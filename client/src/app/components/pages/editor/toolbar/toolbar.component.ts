import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatDrawer } from '@angular/material';
import { Router } from '@angular/router';
import { AbstractModalComponent } from 'src/app/components/shared/abstract-modal/abstract-modal.component';
import { ColorPickerComponent } from 'src/app/components/shared/color-picker/color-picker.component';
import { Tool, ToolType } from 'src/app/models/tools/tool';
import { ColorsService, SelectedColorType } from 'src/app/services/colors.service';
import { Color } from 'src/app/utils/color/color';

import { UserGuideModalComponent } from 'src/app/components/pages/user-guide/user-guide/user-guide-modal.component';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
})
export class ToolbarComponent {
  static readonly TOOLBAR_WIDTH = 60;
  static readonly SLIDER_STEP = 0.1;

  @Input() stepThickness: number;

  @Input() currentToolType: ToolType;
  @Output() currentToolTypeChange = new EventEmitter<ToolType>();

  @Output() editorBackgroundChanged: EventEmitter<Color>;
  @Input() tools: Record<ToolType, Tool>;

  ToolType = ToolType;
  toolTypeKeys = Object.values(ToolType);

  selectedColor: SelectedColorType;
  SelectedColorType = SelectedColorType;

  showColorPicker: boolean;

  @ViewChild('drawer', { static: false })
  drawer: MatDrawer;

  @ViewChild('colorPicker', { static: false })
  colorPicker: ColorPickerComponent;

  modalIsOpened: boolean;
  dialogRef: MatDialogRef<AbstractModalComponent>;

  constructor(private router: Router, public selectedColors: ColorsService, public dialog: MatDialog) {
    this.stepThickness = ToolbarComponent.SLIDER_STEP;
    this.editorBackgroundChanged = new EventEmitter<Color>();
    this.showColorPicker = false;
    this.selectedColor = SelectedColorType.primary;
    this.modalIsOpened = false;
  }

  handleColorChanged(eventColor: Color): void {
    this.color = eventColor;
    this.showColorPicker = false;
    this.drawer.close();
  }

  openModal(): void {
    if (!this.modalIsOpened) {
      this.dialogRef = this.dialog.open(UserGuideModalComponent, {});

      this.dialogRef.afterClosed().subscribe(() => {
        this.modalIsOpened = false;
      });
      this.modalIsOpened = true;
    }
  }

  selectTool(selection: ToolType): void {
    this.currentToolType = selection;
    this.showColorPicker = false;
    this.currentToolTypeChange.emit(selection);
  }

  selectColor(index: number): void {
    this.showColorPicker = true;
    this.drawer.open();
    this.selectedColor = index;
  }

  navigate(path: string): void {
    this.router.navigate([path]);
  }

  updateBackground(color: Color): void {
    this.editorBackgroundChanged.emit(color);
  }

  getToolbarIcon(tool: ToolType): string {
    // todo
    switch (tool) {
      case ToolType.Pen:
        return 'edit';
      case ToolType.Brush:
        return 'brush';
      case ToolType.Rectangle:
        return 'crop_square';
      case ToolType.Line:
        return 'show_chart';
    }
    return '';
  }

  get primaryColor(): Color {
    return this.selectedColors.primaryColor;
  }

  get secondaryColor(): Color {
    return this.selectedColors.secondaryColor;
  }

  set color(color: Color) {
    this.selectedColors.setColorByIndex(color, this.selectedColor);
  }

  get color(): Color {
    return this.selectedColors.getColor(this.selectedColor);
  }
}
