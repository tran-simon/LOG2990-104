import { injectable } from 'inversify';
import { Message } from '../../../common/communication/message';

import * as express from 'express';
import * as httpStatus from 'http-status-codes';

import * as mongoose from 'mongoose';
import DrawingModel from '../../models/drawing';

@injectable()
export class DatabaseService {

  static DATABASE_URL = 'mongodb+srv://polydessin:letmein1@cluster0-lgpty.azure.mongodb.net/polydessin?retryWrites=true&w=majority';

  constructor() {
    mongoose.connect(DatabaseService.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }, (err: any) => {
      if (err) {
        console.log(err.message);
      } else {
        console.log('Connected to MongoDB');
      }
    });
  }

  message(): Message {
    return { title: 'PolyDessin Database API', body: 'Welcome to the database API homepage.' };
  }

  getAllDrawings(res: express.Response): void {
    DrawingModel.find({}, (err, docs) => {
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
    DrawingModel.findById(id, (err, doc) => {
      if (err) {
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
      } else if (doc) {
        res.status(httpStatus.OK).json(doc);
      } else {
        res.sendStatus(httpStatus.NOT_FOUND)
      }
    });
  }

  addDrawing(res: express.Response, body: string): void {
    let drawing = new DrawingModel(body);

    drawing.save((err: any) => {
      if (err) {
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
      } else {
        res.sendStatus(httpStatus.OK);
      }
    });
  }

  deleteDrawing(res: express.Response, id: string): void {
    DrawingModel.findByIdAndDelete(id, (err, doc) => {
      if (err) {
        res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
      } else if (doc) {
        res.sendStatus(httpStatus.OK);
      } else {
        res.sendStatus(httpStatus.NOT_FOUND);
      }
    });
  }
}
