// tslint:disable: no-string-literal max-line-length
import { Overlay } from '@angular/cdk/overlay';
import { HttpXhrBackend } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material';
import { SharedModule } from '@components/shared/shared.module';
import { Drawing } from '@models/drawing';
import { of } from 'rxjs';
import { APIService } from './api.service';

describe('APIService', () => {
  let apiService: APIService;
  let httpTestingController: HttpTestingController;
  let notification: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: HttpXhrBackend, useClass: HttpTestingController }, APIService, MatSnackBar, Overlay],
      imports: [HttpClientTestingModule, SharedModule],
    });
    httpTestingController = TestBed.get(HttpTestingController);
    apiService = TestBed.get(APIService);
    notification = apiService['notification'];
  });
  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(apiService).toBeTruthy();
  });

  it('should get call http get on getAllDrawings', async () => {
    const getSpy = spyOn(apiService['http'], 'get').and.returnValue(of(Drawing));

    apiService.getAllDrawings().then(() => {
      expect(getSpy).toHaveBeenCalled();
    });
  });

  it('should get call http post on uploadDrawing', async () => {
    const postSpy = spyOn(apiService['http'], 'post').and.returnValue(of(Drawing));

    const drawing = new Drawing('test drawing', [], '', '', 0, 0, 'www');

    apiService.uploadDrawing(drawing).then(() => {
      expect(postSpy).toHaveBeenCalled();
    });
  });

  it('should get call http get on searchDrawings', async () => {
    const getSpy = spyOn(apiService['http'], 'get').and.returnValue(of(Drawing));

    apiService.searchDrawings('testname', 'testtag').then(() => {
      expect(getSpy).toHaveBeenCalled();
    });
  });

  it('should get call http delete on deleteDrawings', async () => {
    const deleteSpy = spyOn(apiService['http'], 'delete').and.returnValue(of(Drawing));

    apiService.deleteDrawing('testid').then(() => {
      expect(deleteSpy).toHaveBeenCalled();
    });
  });
  it('should get call http post on sendMail with the right svg data', () => {
    const svgData =
      '<svg xmlns="http://www.w3.org/2000/svg" _ngcontent-hgk-c15="" width="1852" height="931" filter="none"><rect _ngcontent-hgk-c15="" id="background" fill="#ffffff" width="1852" height="931"/><defs _ngcontent-hgk-c15="" id="defs"><filter _ngcontent-hgk-c15="" height="200%" id="TEXTURE_1" width="200%" x="-50%" y="-50%"><feGaussianBlur _ngcontent-hgk-c15="" in="SourceGraphic" stdDeviation="3"/></filter><filter _ngcontent-hgk-c15="" height="200%" id="TEXTURE_2" width="200%" x="-50%" y="-50%"><feTurbulence _ngcontent-hgk-c15="" baseFrequency="0.05" numOctaves="2" result="turbulence" type="turbulence"/><feDisplacementMap _ngcontent-hgk-c15="" in="SourceGraphic" in2="turbulence" scale="40" xChannelSelector="R" yChannelSelector="G"/></filter><filter _ngcontent-hgk-c15="" height="200%" id="TEXTURE_3" width="200%" x="-50%" y="-50%"><feTurbulence _ngcontent-hgk-c15="" baseFrequency="0.05" numOctaves="2" result="turbulence" type="turbulence"/><feDisplacementMap _ngcontent-hgk-c15="" in="SourceGraphic" in2="turbulence" scale="10" xChannelSelector="R" yChannelSelector="G"/></filter><filter _ngcontent-hgk-c15="" height="200%" id="TEXTURE_4" width="200%" x="-50%" y="-50%"><feTurbulence _ngcontent-hgk-c15="" baseFrequency="0.05" numOctaves="2" result="turbulence" type="turbulence"/><feDisplacementMap _ngcontent-hgk-c15="" in="SourceGraphic" in2="turbulence" scale="5" xChannelSelector="R" yChannelSelector="G"/></filter><filter _ngcontent-hgk-c15="" height="200%" id="TEXTURE_5" width="200%" x="-50%" y="-50%"><feTurbulence _ngcontent-hgk-c15="" baseFrequency="0.05" numOctaves="2" result="turbulence" type="turbulence"/><feDisplacementMap _ngcontent-hgk-c15="" in="SourceGraphic" in2="turbulence" scale="100" xChannelSelector="R" yChannelSelector="G"/></filter></defs><path shape-type="Path" id="shape-path-1538" transform="translate(0,0)" d="M 1569 76 L 1569 76" style="stroke-width: 1; stroke-opacity: 1; fill-opacity: 1; stroke: rgb(16, 16, 16); fill: none; stroke-linecap: round; stroke-linejoin: round;"/></svg>';
    spyOn(notification, 'open');
    apiService.sendEmail('theo', 'theo.st-denis@polymtl.ca', svgData, 'file', 'svg');
    const req = httpTestingController.expectOne('http://localhost:3000/api/email');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({
      name: 'theo',
      email: 'theo.st-denis@polymtl.ca',
      dataURL: svgData,
      file: 'file',
      ext: 'svg',
    });
    req.flush('');
  });
  it('should get call http post on sendMail with the right image data', () => {
    const imageData =
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABzwAAAOjCAYAAADOH3L6AAAgAElEQVR4XuzZwQ2EMBRDwaU5iqY5VqKK+GlSwfc4N1/v+74/jwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoMCl8FzsDUnEyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECDwCRg8fQQCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBGYFDJ6z1TmcAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAGDpz9AgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMCsgMFztjqHEyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBg8PQHCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBCYFTB4zlbncAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEDJ7+AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECswIGz9nqHE6AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAgMHTHyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAYFbA4DlbncMJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEDB4+gMECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECMwKGDxnq3M4AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIGT3+AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIFZAYPnbHUOJ0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEDA4OkPECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAwK2DwnK3O4QQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIGDz9AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEZgUMnrPVOZwAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAYOnP0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwKyAwXO2OocTIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIGDw9AcIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEJgVMHjOVudwAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQMnv4AAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKzAgbP2eocToAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICAwdMfIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEBgVsDgOVudwwkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQMHj6AwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIzAoYPGerczgBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgZPf4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgVkBg+dsdQ4nQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQMDg6Q8QIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIDArYPCcrc7hBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgYPP0BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgRmBQyes9U5nAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABg6c/QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDArIDBc7Y6hxMgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgYPD0BwgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQmBUweM5W53ACBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAye/gABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB';
    const cutData =
      'iVBORw0KGgoAAAANSUhEUgAABzwAAAOjCAYAAADOH3L6AAAgAElEQVR4XuzZwQ2EMBRDwaU5iqY5VqKK+GlSwfc4N1/v+74/jwABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAoMCl8FzsDUnEyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECDwCRg8fQQCBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBGYFDJ6z1TmcAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAGDpz9AgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgMCsgMFztjqHEyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBg8PQHCBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBCYFTB4zlbncAIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEDJ7+AAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECswIGz9nqHE6AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAgMHTHyBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECBAYFbA4DlbncMJECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEDB4+gMECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECMwKGDxnq3M4AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIGT3+AAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAAIFZAYPnbHUOJ0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEDA4OkPECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIECAwK2DwnK3O4QQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIGDz9AQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIEZgUMnrPVOZwAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAYOnP0CAAAECBAgQIECAAAECBAgQIECAAAECBAgQIECAwKyAwXO2OocTIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIGDw9AcIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIEJgVMHjOVudwAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQMnv4AAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAAQKzAgbP2eocToAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQICAwdMfIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIEBgVsDgOVudwwkQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQMHj6AwQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgQIzAoYPGerczgBAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgZPf4AAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIAAgVkBg+dsdQ4nQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQMDg6Q8QIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQIDArYPCcrc7hBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgYPP0BAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABAgRmBQyes9U5nAABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAABg6c/QIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgQIDArIDBc7Y6hxMgQIAAAQIECBAgQIAAAQIECBAgQIAAAQIECBAgYPD0BwgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAgQmBUweM5W53ACBAgQIECAAAECBAgQIECAAAECBAgQIECAAAECBAye/gABAgQIECBAgAABAgQIECBAgAABAgQIECBAgAAB';
    spyOn(notification, 'open');
    apiService.sendEmail('theo', 'theo.st-denis@polymtl.ca', imageData, 'file', 'png');
    const req = httpTestingController.expectOne('http://localhost:3000/api/email');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual({
      name: 'theo',
      email: 'theo.st-denis@polymtl.ca',
      dataURL: cutData,
      file: 'file',
      ext: 'png',
    });
    req.flush('');
  });

  it('can handle message response', () => {
    const openNotifSpy = spyOn(notification, 'open');

    apiService.handleResponse('error: "message"');

    expect(openNotifSpy).toHaveBeenCalledWith(APIService.SENDING_MSG, '', { duration: 5000 });
  });

  it('can handle error response', () => {
    const openNotifSpy = spyOn(notification, 'open');

    apiService.handleResponse('error: "error"');

    expect(openNotifSpy).toHaveBeenCalledWith(APIService.EMAIL_NOT_FOUND_MSG, '', { duration: 5000 });
  });

  it('can handle other response', () => {
    const openNotifSpy = spyOn(notification, 'open');

    apiService.handleResponse('error: "detail"');

    expect(openNotifSpy).toHaveBeenCalledWith(APIService.INVALID_DATA_MSG, '', { duration: 5000 });
  });

  it('can handle server error', () => {
    const openNotifSpy = spyOn(notification, 'open');

    apiService.handleError({ message: 'error: 500' } as ErrorEvent);

    expect(openNotifSpy).toHaveBeenCalledWith(APIService.SERVER_PROBLEM_MSG, 'ok', { duration: 10000 });
  });

  it('can handle file too large error', () => {
    const openNotifSpy = spyOn(notification, 'open');

    apiService.handleError({ message: 'error: 501' } as ErrorEvent);

    expect(openNotifSpy).toHaveBeenCalledWith(APIService.FILE_TOO_LARGE_MSG, 'ok', { duration: 10000 });
  });
});
