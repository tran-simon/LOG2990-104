import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material';
import { CouleurComponent } from 'src/app/components/pages/user-guide/Couleur/couleur.component';
import { CrayonComponent } from 'src/app/components/pages/user-guide/Crayon/crayon.component';
import { LigneComponent } from 'src/app/components/pages/user-guide/Ligne/ligne.component';
import { PinceauComponent } from 'src/app/components/pages/user-guide/Pinceau/pinceau.component';
import { RectangleComponent } from 'src/app/components/pages/user-guide/Rectangle/rectangle.component';

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
        CrayonComponent,
        LigneComponent,
        PinceauComponent,
        RectangleComponent,
        CouleurComponent,
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
  it('nextSubject should not call selectSubject and openCategories when on last subject', () => {
    const selectSubjectSpy = spyOn(component, 'selectSubject').and.callThrough();
    const openCategoriesSpy = spyOn<any>(component, 'openCategories').and.callThrough();

    component.selectedSubject = component.subjects.Couleur;
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

    component.selectedSubject = component.subjects.Pinceau;
    component.previousSubject();
    fixture.detectChanges();
    expect(selectSubjectSpy).toHaveBeenCalled();
    expect(openCategoriesSpy).toHaveBeenCalled();
  });

  it('selectSubject should change the subject', () => {
    component.selectSubject(component.subjects.Rectangle);
    expect(component.selectedSubject).toEqual(component.subjects.Rectangle);
  });
  it('Next subject should be subject plus 1', () => {
    const liveSubject = component.selectedSubject;
    component.nextSubject();
    expect(component.selectedSubject).toEqual(liveSubject + 1);
  });
  it('Next subject should be subject plus 1', () => {
    component.selectedSubject = component.subjects.Pinceau;
    const liveSubject = component.selectedSubject;
    component.nextSubject();
    expect(component.selectedSubject).toEqual(liveSubject + 1);
  });

  it('All categories should be opened', () => {
    /* tslint:disable-next-line */
    component['openCategories']();
    expect(component.panelOpenState1).toEqual(true);
  });
});
