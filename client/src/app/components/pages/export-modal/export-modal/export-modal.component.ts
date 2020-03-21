import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { EditorService } from 'src/app//services/editor.service';
import { DrawingSurfaceComponent } from 'src/app/components/pages/editor/drawing-surface/drawing-surface.component';
import { AbstractModalComponent } from 'src/app/components/shared/abstract-modal/abstract-modal.component';
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
  previewImage: DrawingSurfaceComponent;
  formGroup: FormGroup;
  selectedFilter: FilterType;
  filters: string[] = Object.values(FilterType);

  constructor(
    public dialogRef: MatDialogRef<AbstractModalComponent>,
    private editorService: EditorService,
    private sanitizer: DomSanitizer,
  ) {
    super(dialogRef);
    editorService.clearShapesBuffer();
    this.previewImage = this.editorService.view;
    this.name = '';
    this.selectedExtension = ExtensionType.EMPTY;
    this.selectedFilter = FilterType.EMPTY;
    this.exportSVGElement();
    this.formGroup = new FormGroup({});
  }

  previewURL(): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.editorService.createDataURL(this.previewImage));
  }

  addFilterToPreview(): void {
    const image = document.getElementById('preview') as HTMLImageElement;
    switch (this.selectedFilter) {
      case FilterType.EMPTY: {
        image.style.filter = 'none';
        break;
      }
      case FilterType.BLACKWHITE: {
        image.style.filter = 'grayscale(100%)';
        break;
      }
      case FilterType.BLUR: {
        image.style.filter = 'blur(5px)';
        break;
      }
      case FilterType.INVERT: {
        image.style.filter = 'invert(100%)';
        break;
      }
      case FilterType.SATURATE: {
        image.style.filter = 'saturate(200%)';
        break;
      }
      case FilterType.SEPIA: {
        image.style.filter = 'sepia(100%)';
        break;
      }
    }
  }
  removeFilter(): void {
    this.editorService.view.svg.removeAttribute('filter');
  }

  addFilter(): void {
    switch (this.selectedFilter) {
      case FilterType.EMPTY: {
        this.previewImage.svg.setAttribute('filter', 'none');
        break;
      }
      case FilterType.BLACKWHITE: {
        this.previewImage.svg.setAttribute('filter', 'grayscale(100%)');
        break;
      }
      case FilterType.BLUR: {
        this.previewImage.svg.setAttribute('filter', 'blur(5px)');
        break;
      }
      case FilterType.INVERT: {
        this.previewImage.svg.setAttribute('filter', 'invert(100%)');
        break;
      }
      case FilterType.SATURATE: {
        this.previewImage.svg.setAttribute('filter', 'saturate(200%)');
        break;
      }
      case FilterType.SEPIA: {
        this.previewImage.svg.setAttribute('filter', 'sepia(100%)');
        break;
      }
    }
  }

  exportSVGElement(): void {
    this.addFilter();
    this.href = this.previewURL();
    this.removeFilter();
  }

  exportImageElement(): void {
    const image = new Image();
    const canvas = document.createElement('canvas');
    this.addFilter();
    image.src = this.editorService.createDataURL(this.previewImage);
    const ctx: CanvasRenderingContext2D = canvas.getContext('2d') as CanvasRenderingContext2D;
    image.onload = () => {
      canvas.width = this.previewImage.width;
      canvas.height = this.previewImage.height;
      ctx.drawImage(image, 0, 0);
      this.href = canvas.toDataURL(`image/${this.selectedExtension}`);
    };
    this.removeFilter();
  }

  get fullName(): string {
    return this.name + '.' + this.selectedExtension;
  }

  changeExtension(): void {
    if (this.selectedExtension !== ExtensionType.EMPTY) {
      this.selectedExtension === ExtensionType.SVG ? this.exportSVGElement() : this.exportImageElement();
    }
  }

  submit(): void {
    if (!this.formGroup.invalid) {
      this.dialogRef.close();
    }
  }
}
