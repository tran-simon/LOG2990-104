import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material';

enum Subject {
    Bienvenue,
    Sujet1,
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
        this.selectedSubject = selection;
    }
}
