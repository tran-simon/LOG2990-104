/* tslint:disable:no-any */
import { Overlay } from '@angular/cdk/overlay';
import { Injector } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material';
import { CreateDrawingModalComponent } from 'src/app/components/pages/home/create-drawing-modal/create-drawing-modal.component';
import { UserGuideModalComponent } from 'src/app/components/pages/user-guide/user-guide/user-guide-modal.component';

import { ModalDialogService, ModalTypes } from './modal-dialog.service';
import Spy = jasmine.Spy;

describe('ModalDialogService', () => {
  let service: ModalDialogService;
  let openSpy: Spy;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      Overlay,
      Injector,
    ]
  }));

  beforeEach(() => {
    service = TestBed.get(ModalDialogService);
    openSpy = spyOn(service, 'open').and.callFake((): MatDialogRef<any> => {
      service.openDialogs.push({} as any);
      return null as any;
    });
    spyOn(service, 'closeAll').and.callFake(()=> {
      service.openDialogs.length = 0;
    });
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not open a modal if invalid dialog name', () => {
    service.openByName('INVALID_NAME' as ModalTypes);
    expect(openSpy).not.toHaveBeenCalled();
  });

  it('should not open modal if already opened', () => {
    service.openByName(ModalTypes.GUIDE);
    service.openByName(ModalTypes.CREATE);
    expect(openSpy).toHaveBeenCalledTimes(1);
    expect(openSpy).toHaveBeenCalledWith(UserGuideModalComponent, {});
  });

  it('should open second modal after first one is closed', () => {
    service.openByName(ModalTypes.CREATE);
    expect(service.modalIsOpened).toEqual(true);
    expect(openSpy).toHaveBeenCalledWith(CreateDrawingModalComponent, {});

    service.closeAll();
    expect(service.modalIsOpened).toEqual(false);

    service.openByName(ModalTypes.GUIDE);
    expect(openSpy).toHaveBeenCalledTimes(2);
  });
});
