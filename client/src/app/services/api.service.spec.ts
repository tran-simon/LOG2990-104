// tslint:disable: no-string-literal max-line-length
import { Overlay } from '@angular/cdk/overlay';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material';
import { Drawing } from '@models/drawing';
import { of } from 'rxjs';
import { SharedModule } from '../components/shared/shared.module';
import { APIService } from './api.service';

describe('APIService', () => {
  let apiService: APIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [APIService, MatSnackBar, Overlay],
      imports: [HttpClientTestingModule, SharedModule],
    });

    apiService = TestBed.get(APIService);
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
  it('should tell the user about sending email', () => {
    const spyNotif = spyOn(apiService['notification'], 'open');
    const test = 'test';
    apiService.sendEmail(test, test, test, test, test);
    expect(spyNotif).toHaveBeenCalled();
  });
  // it('should get call http post on sendMail with the right data', () => {
  //   const spy = spyOn(apiService['http'], 'post');
  //   const test = 'test';
  //   const dataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAABzwAAAOjCAYAAADOH3L6AAAgAElEQVR4XuzZQQ2DQBBA0cVDdRD89FibiCDowANN8LCHH14';
  //   const data = 'iVBORw0KGgoAAAANSUhEUgAABzwAAAOjCAYAAADOH3L6AAAgAElEQVR4XuzZQQ2DQBBA0cVDdRD89FibiCDowANN8LCHH14';
  //   apiService.sendEmail(test, test, dataUrl, test, 'png');
  //   // tslint:disable-next-line: max-line-length
  //   expect(spy).toHaveBeenCalledWith('http://localhost:3000/api/email/drawing', {name: test, email: test, dataURL: data, file: test, ext: 'png'}, { responseType: 'text' });
  // });
});
