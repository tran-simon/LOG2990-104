import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { BrushGuideComponent } from 'src/app/components/pages/user-guide/brush-guide/brush-guide.component';
import { ColorGuideComponent } from 'src/app/components/pages/user-guide/color-guide/color-guide.component';
import { LineGuideComponent } from 'src/app/components/pages/user-guide/line-guide/line-guide.component';
import { PenGuideComponent } from 'src/app/components/pages/user-guide/pen-guide/pen-guide.component';
import { RectangleGuideComponent } from 'src/app/components/pages/user-guide/rectangle-guide/rectangle-guide.component';

import { Router } from '@angular/router';
import { GuideSubject } from 'src/app/components/pages/user-guide/user-guide/guide-subject';
import { UserGuideModalComponent } from 'src/app/components/pages/user-guide/user-guide/user-guide-modal.component';
import { WelcomeComponent } from 'src/app/components/pages/user-guide/welcome/welcome.component';
import { SharedModule } from '../../../shared/shared.module';
import createSpyObj = jasmine.createSpyObj;
import createSpy = jasmine.createSpy;

describe('UserGuideComponent', () => {
  let component: UserGuideModalComponent;
  let fixture: ComponentFixture<UserGuideModalComponent>;
  const dialogRefCloseSpy = createSpy('close');
  const routerSpy = createSpyObj('Router', ['navigate']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule],
      declarations: [
        UserGuideModalComponent,
        WelcomeComponent,
        PenGuideComponent,
        LineGuideComponent,
        BrushGuideComponent,
        RectangleGuideComponent,
        ColorGuideComponent,
      ],
      providers: [
        { provide: MatDialogRef, useValue: { close: dialogRefCloseSpy } },
        { provide: Router, useValue: routerSpy },
      ],
    })
      .overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [UserGuideModalComponent] } })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserGuideModalComponent);
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
    component.selectSubject(GuideSubject.Brush);
    fixture.detectChanges();
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

  it('previousSubject should call selectSubject and openCategories because the subject is not Bienvenue', () => {
    const selectSubjectSpy = spyOn(component, 'selectSubject').and.callThrough();
    const openCategoriesSpy = spyOn<any>(component, 'openCategories').and.callThrough();

    component.selectedSubject = component.subjects.Brush;
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
    component.selectedSubject = component.subjects.Brush;
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
