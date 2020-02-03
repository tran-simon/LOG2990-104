import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CreatorTool } from 'src/app/models/CreatorTool';
import { Color } from 'src/app/utils/color/color';
import { LineTool } from '../../../../models/LineTool';
import { RectangleTool } from '../../../../models/RectangleTool';
import { DrawingSurfaceComponent } from '../drawing-surface/drawing-surface.component';

export interface EditorParams {
    surfaceWidth: number;
    surfaceHeight: number;
    surfaceColor: Color;
}

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements AfterViewInit, OnInit {
    params: EditorParams = { surfaceColor: Color.WHITE, surfaceHeight: 0, surfaceWidth: 0 };

    @ViewChild('drawingSurface', { static: false })
    drawingSurface: DrawingSurfaceComponent;

    constructor(private router: ActivatedRoute) {}

    tools = {
        // todo - move to afterInit where drawing surface is defined
        line: new LineTool(this.drawingSurface),
        rectangle: new RectangleTool(this.drawingSurface),
    };

    currentTool: CreatorTool = new LineTool(this.drawingSurface);

    ngOnInit() {
        this.router.params.subscribe((params) => {
            this.params.surfaceWidth = params.width ? +params.width : 500;
            this.params.surfaceHeight = params.height ? +params.height : 300;
            this.params.surfaceColor = params.color ? Color.hex(params.color) : Color.WHITE;
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

    selectRectangleTool() {
        this.currentTool = new RectangleTool(this.drawingSurface);
    }
}
