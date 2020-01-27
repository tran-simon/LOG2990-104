import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

export interface EditorParams {
    width: number;
    height: number;
    color: number;
}

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements OnInit {
    private params: EditorParams = { color: 0, height: 0, width: 0 };

    constructor(private router: ActivatedRoute) {}

    ngOnInit() {
        this.router.params.subscribe((params) => {
            this.params.width = +params.width;
            this.params.height = +params.height;
            this.params.color = +params.color;
        });
    }
}
