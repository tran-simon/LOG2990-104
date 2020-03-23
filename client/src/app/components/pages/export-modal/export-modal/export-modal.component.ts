import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SafeResourceUrl } from '@angular/platform-browser';
import { EditorService } from 'src/app//services/editor.service';
import { AbstractModalComponent } from 'src/app/components/shared/abstract-modal/abstract-modal.component';
import { ImageExportService } from 'src/app/services/image-export.service';
import { ExtensionType } from '../extension-type.enum';
import { FilterType } from '../filter-type.enum';

@Component({
  selector: 'app-export-modal',
  templateUrl: './export-modal.component.html',
  styleUrls: ['./export-modal.component.scss'],
})
export class ExportModalComponent extends AbstractModalComponent {
  selectedExtension: ExtensionType;
  extensions: string[] = Object.values(ExtensionType);
  href: SafeResourceUrl;
  name: string;
  formGroup: FormGroup;
  selectedFilter: FilterType;
  filters: string[] = Object.values(FilterType);

  constructor(
    public dialogRef: MatDialogRef<AbstractModalComponent>,
    private editorService: EditorService,
    private imageExportService: ImageExportService,
  ) {
    super(dialogRef);
    editorService.clearShapesBuffer();
    this.name = '';
    this.selectedExtension = ExtensionType.SVG;
    this.href = this.imageExportService.exportSVGElement(this.editorService.view);
    this.formGroup = new FormGroup({});
  }

  get fullName(): string {
    return this.name + '.' + this.selectedExtension;
  }

  changeExtension(): void {
    this.selectedExtension === ExtensionType.SVG
      ? (this.href = this.imageExportService.exportSVGElement(this.editorService.view))
      : this.imageExportService.exportImageElement(this.editorService.view, this.selectedExtension).then((data: string) => {
          this.href = data;
        });
  }

  submit(): void {
    if (!this.formGroup.invalid) {
      this.dialogRef.close();
    }
  }

  get previewURL(): SafeResourceUrl {
    return this.imageExportService.exportSVGElement(this.editorService.view);
  }
}
