import { injectable } from 'inversify';
import { Message } from '../../../common/communication/message';

import * as express from 'express';
import * as httpStatus from 'http-status-codes';

import * as mongoose from 'mongoose';
import drawingModel from '../../models/drawing';

@injectable()
export class DatabaseService {

  constructor() {
    mongoose.connect(
      'mongodb+srv://polydessin:letmein1@cluster0-lgpty.azure.mongodb.net/polydessin?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err: mongoose.Error) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log('Connected to MongoDB');
        }
      });
  }

  message(): Message {
    return { title: 'PolyDessin Database API', body: 'Welcome to the database API homepage.' };
  }

  getAllDrawings(res: express.Response): void {
    drawingModel.find({}, (err, docs) => {
      if (err) {
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
      } else if (docs) {
        res.status(httpStatus.OK).json(docs);
      } else {
        res.sendStatus(httpStatus.NOT_FOUND);
      }
    });
  }

  getDrawingById(res: express.Response, id: string): void {
    drawingModel.findById(id, (err, doc) => {
      if (err) {
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
      } else if (doc) {
        res.status(httpStatus.OK).json(doc);
      } else {
        res.sendStatus(httpStatus.NOT_FOUND);
      }
    });
  }

  addDrawing(res: express.Response, body: string): void {
    const drawing = new drawingModel(body);

    drawing.save((err: mongoose.Error) => {
      const status = err ? httpStatus.INTERNAL_SERVER_ERROR : httpStatus.OK;
      res.sendStatus(status);
    });
  }

  deleteDrawing(res: express.Response, id: string): void {
    drawingModel.findByIdAndDelete(id, (err, doc) => {
      const status = err ? httpStatus.INTERNAL_SERVER_ERROR :
        doc ? httpStatus.OK : httpStatus.NOT_FOUND;

      res.sendStatus(status);
    });
  }

  updateDrawing(res: express.Response, id: string, body: string): void {
    drawingModel.findByIdAndUpdate(id, body, (err, doc) => {
      const status = err ? httpStatus.INTERNAL_SERVER_ERROR :
        doc ? httpStatus.OK : httpStatus.NOT_FOUND;

      res.sendStatus(status);
    });
  }
}
