import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Drawing } from 'src/app/models/drawing';

@Component({
  selector: 'app-gallery-drawing',
  templateUrl: './gallery-drawing.component.html',
  styleUrls: ['./gallery-drawing.component.scss'],
})
export class GalleryDrawingComponent {
  @Input() drawing: Drawing;

  @ViewChild('svg', { static: false })
  svg: ElementRef;
}
