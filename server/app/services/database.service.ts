import { injectable } from 'inversify';

import * as express from 'express';
import * as httpStatus from 'http-status-codes';

import * as mongoose from 'mongoose';
import drawingModel, { Drawing } from '../../models/drawing';

@injectable()
export class DatabaseService {

  constructor() {
    mongoose.connect(
      'mongodb+srv://polydessin:letmein1@cluster0-lgpty.azure.mongodb.net/polydessin?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true },
      (err: mongoose.Error) => {
        err ? console.error(err.message) : console.log('Connected to MongoDB');
      });
  }

  getAllDrawings(res: express.Response): void {
    drawingModel.find({}, (err: Error, docs: Drawing[]) => {
      const status = this.determineStatus(err, docs);
      docs ? res.status(status).json(docs) : res.sendStatus(status);
    });
  }

  getDrawingById(res: express.Response, id: string): void {
    drawingModel.findById(id, (err: Error, doc: Drawing) => {
      const status = this.determineStatus(err, doc);
      doc ? res.status(status).json(doc) : res.sendStatus(status);
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
    drawingModel.findByIdAndDelete(id, (err: Error, doc: Drawing) => {
      res.sendStatus(this.determineStatus(err, doc));
    });
  }

  updateDrawing(res: express.Response, id: string, body: string): void {
    drawingModel.findByIdAndUpdate(id, body, (err: Error, doc: Drawing) => {
      res.sendStatus(this.determineStatus(err, doc));
    });
  }

  private determineStatus(err: Error, results: Drawing | Drawing[]): number {
    const status = err ? httpStatus.INTERNAL_SERVER_ERROR :
      results ? httpStatus.OK : httpStatus.NOT_FOUND;

    return status;
  }
}
