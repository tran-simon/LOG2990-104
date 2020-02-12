import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material';
import { Subject1Component } from 'src/app/components/pages/user-guide/subject1/subject1.component';
import { Subject2Component } from 'src/app/components/pages/user-guide/subject2/subject2.component';
import { Subject3Component } from 'src/app/components/pages/user-guide/subject3/subject3.component';
import { Subject4Component } from 'src/app/components/pages/user-guide/subject4/subject4.component';
import { Subject5Component } from 'src/app/components/pages/user-guide/subject5/subject5.component';
import { Subject6Component } from 'src/app/components/pages/user-guide/subject6/subject6.component';

import { Router } from '@angular/router';
import { WelcomeComponent } from 'src/app/components/pages/user-guide/welcome/welcome.component';
import { SharedModule } from '../../../shared/shared.module';
import { UserGuideComponent } from './user-guide.component';
import createSpyObj = jasmine.createSpyObj;
import createSpy = jasmine.createSpy;

describe('UserGuideComponent', () => {
  let component: UserGuideComponent;
  let fixture: ComponentFixture<UserGuideComponent>;
  const dialogRefCloseSpy = createSpy('close');
  const routerSpy = createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [
        UserGuideComponent,
        WelcomeComponent,
        Subject1Component,
        Subject2Component,
        Subject3Component,
        Subject4Component,
        Subject5Component,
        Subject6Component,
      ],
      providers: [
        { provide: MatDialogRef, useValue: { close: dialogRefCloseSpy } },
        { provide: Router, useValue: routerSpy },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call nextSubject on Suivant button clicked', () => {
    const nextSubjectSpy = spyOn(component, 'nextSubject');
    fixture.debugElement.nativeElement.querySelector('#nextButton').click();
    expect(nextSubjectSpy).toHaveBeenCalled();
  });
  it('should call previousSubject on Precedent button clicked', () => {
    const previousSubjectSpy = spyOn(component, 'previousSubject');
    fixture.debugElement.nativeElement.querySelector('#prevButton').click();
    expect(previousSubjectSpy).toHaveBeenCalled();
  });

  it('nextSubject should call selectSubject and openCategories', () => {
    const selectSubjectSpy = spyOn(component, 'selectSubject');
    const openCategoriesSpy = spyOn<any>(component, 'openCategories');
    component.nextSubject();
    expect(selectSubjectSpy).toHaveBeenCalled();
    expect(openCategoriesSpy).toHaveBeenCalled();
  });
  it('nextSubject should not call selectSubject and openCategories when on Subject 6', () => {
    const selectSubjectSpy = spyOn(component, 'selectSubject').and.callThrough();
    const openCategoriesSpy = spyOn<any>(component, 'openCategories').and.callThrough();

    component.selectedSubject = component.subjects.Sujet6;
    component.nextSubject();
    fixture.detectChanges();
    expect(selectSubjectSpy).not.toHaveBeenCalled();
    expect(openCategoriesSpy).not.toHaveBeenCalled();
  });

  it('previousSubject should not call selectSubject and openCategories because default subject is Bienvenue', () => {
    const selectSubjectSpy = spyOn(component, 'selectSubject');
    const openCategoriesSpy = spyOn<any>(component, 'openCategories');
    component.previousSubject();
    expect(selectSubjectSpy).not.toHaveBeenCalled();
    expect(openCategoriesSpy).not.toHaveBeenCalled();
  });
  it('previousSubject should call selectSubject and openCategories because the subject is not Bienvenue', () => {
    const selectSubjectSpy = spyOn(component, 'selectSubject').and.callThrough();
    const openCategoriesSpy = spyOn<any>(component, 'openCategories').and.callThrough();

    component.selectedSubject = component.subjects.Sujet3;
    component.previousSubject();
    fixture.detectChanges();
    expect(selectSubjectSpy).toHaveBeenCalled();
    expect(openCategoriesSpy).toHaveBeenCalled();
  });

  it('selectSubject should change the subject', () => {
    component.selectSubject(component.subjects.Sujet4);
    expect(component.selectedSubject).toEqual(component.subjects.Sujet4);
  });
  it('Next subject should be subject plus 1', () => {
    let liveSubject = component.selectedSubject;
    component.nextSubject();
    expect(component.selectedSubject).toEqual(liveSubject + 1);
  });
  it('Next subject should be subject plus 1', () => {
    component.selectedSubject = component.subjects.Sujet3;
    let liveSubject = component.selectedSubject;
    component.nextSubject();
    expect(component.selectedSubject).toEqual(liveSubject + 1);
  });

  it('All categories should be opened', () => {
    component['openCategories']();
    expect(component.panelOpenState1).toEqual(true);
    expect(component.panelOpenState2).toEqual(true);
    expect(component.panelOpenState3).toEqual(true);
  });
});
