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

    ngOnInit() {
        this.selectedSubject = this.subjects.Bienvenue;
    }

    selectSubject(selection: Subject) {
        if (selection >= this.subjects.Sujet6) {
            this.selectedSubject = this.subjects.Sujet6;
        } else if (selection <= this.subjects.Bienvenue) {
            this.selectedSubject = this.subjects.Bienvenue;
        } else {
            this.selectedSubject = selection;
        }
    }
}
