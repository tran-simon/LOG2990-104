import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

enum Subject {
    Bienvenue,
    Sujet1,
    Sujet2,
    Sujet3,
    Sujet4,
    Sujet5,
    Sujet6,
}

@Component({
    selector: 'app-user-guide',
    templateUrl: './user-guide.component.html',
    styleUrls: ['./user-guide.component.scss'],
})
export class UserGuideComponent implements OnInit {
    @ViewChild('sidenav', { static: false })
    sidenav: MatSidenav;
    subjects = Subject;
    selectedSubject: Subject;
    opened = false;
    panelOpenState1 = false;
    panelOpenState2 = false;
    panelOpenState3 = false;

    ngOnInit() {
        this.selectedSubject = this.subjects.Bienvenue;
    }

    selectSubject(selection: Subject) {
        this.selectedSubject = selection;
    }

    openCategories() {
        this.panelOpenState1 = true;
        this.panelOpenState2 = true;
        this.panelOpenState3 = true;
    }

    closeCategorie() {
        this.panelOpenState1 = false;
        this.panelOpenState2 = false;
        this.panelOpenState3 = false;
    }
}
