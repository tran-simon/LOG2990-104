import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { CreateDrawingModalComponent } from 'src/app/components/pages/home/create-drawing-modal/create-drawing-modal.component';
import { AbstractModalComponent } from 'src/app/components/shared/abstract-modal/abstract-modal.component';
import { KeyboardListener } from 'src/app/utils/events/keyboard-listener';
import { SharedModule } from '../../../shared/shared.module';

import { HomeComponent } from './home.component';
import createSpyObj = jasmine.createSpyObj;

import Spy = jasmine.Spy;

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let dialogOpenSpy: Spy;
  const routerSpy = createSpyObj('Router', ['navigate']);

  let afterClosedFunc: () => void;
  const matDialogRefMock = {
    close: () => {
      afterClosedFunc();
    },
    afterClosed: () => {
      return {
        subscribe: (func: () => void) => {
          afterClosedFunc = func;
        },
      };
    },
  } as MatDialogRef<AbstractModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SharedModule, RouterTestingModule],
      declarations: [HomeComponent, CreateDrawingModalComponent],
      providers: [
        {
          provide: Router,
          useValue: routerSpy,
        },
      ],
    })
      .overrideModule(BrowserDynamicTestingModule, { set: { entryComponents: [CreateDrawingModalComponent] } })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    dialogOpenSpy = spyOn(component.dialog, 'open').and.returnValue(matDialogRefMock);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call openCreateModal on create button clicked', () => {
    const openCreateModalSpy = spyOn(component, 'openModal');
    fixture.debugElement.nativeElement.querySelector('#btn-create').click();
    expect(openCreateModalSpy).toHaveBeenCalled();
  });

  it('should open modal when openCreateModal is called', () => {
    component.openModal();
    expect(dialogOpenSpy).toHaveBeenCalled();
  });

  it('should not open modal if already opened', () => {
    component.openModal();
    component.openModal();
    expect(dialogOpenSpy).toHaveBeenCalledTimes(1);
  });

  it('should open second modal after first one is closed', () => {
    component.openModal();
    expect(component.modalIsOpened).toEqual(true);

    component.dialogRef.close();
    expect(component.modalIsOpened).toEqual(false);

    component.openModal();
    expect(dialogOpenSpy).toHaveBeenCalledTimes(2);
  });

  it('should call openCreateModal on guide button clicked', () => {
    const openModalSpy = spyOn(component, 'openModal');
    fixture.debugElement.nativeElement.querySelector('#btn-guide').click();
    expect(openModalSpy).toHaveBeenCalledWith('help');
  });

  it('should call openGallery on gallery button clicked', () => {
    const openGallerySpy = spyOn(component, 'openGallery').and.callThrough();
    fixture.debugElement.nativeElement.querySelector('#btn-gallery').click();
    expect(openGallerySpy).toHaveBeenCalled();
  });

  it('should route', () => {
    component.openPage('test');
    expect(routerSpy.navigate).toHaveBeenCalledWith(['test']);
  });

  /* keyboard shortcuts */

  it('should handle keyboard event', () => {
    const keyDownSpy = spyOn(KeyboardListener, 'keyEvent');

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));

    expect(keyDownSpy).toHaveBeenCalled();
  });

  it('can open modal with keyboard shortcut', () => {
    const openCreateModalSpy = spyOn(component, 'openModal');
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'o', ctrlKey: true }));
    expect(openCreateModalSpy).toHaveBeenCalled();
  });

  it('can open gallery with keyboard shortcut', () => {
    const openGallerySpy = spyOn(component, 'openGallery');
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'g', ctrlKey: true }));
    expect(openGallerySpy).toHaveBeenCalled();
  });
});
