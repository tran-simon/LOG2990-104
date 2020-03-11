import { Component, Input, OnInit } from '@angular/core';
import { Drawing } from 'src/app/models/drawing';
import { BaseShape } from 'src/app/models/shapes/base-shape';

@Component({
  selector: 'app-gallery-drawing',
  templateUrl: './gallery-drawing.component.html',
  styleUrls: ['./gallery-drawing.component.scss'],
})
export class GalleryDrawingComponent implements OnInit {
  @Input() drawing: Drawing;

  ngOnInit(): void {
    const shapes: BaseShape[] = JSON.parse(JSON.stringify(this.drawing.data)) as BaseShape[];
    console.log(shapes);
  }
}
