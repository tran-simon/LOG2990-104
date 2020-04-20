import * as express from 'express';
import { inject, injectable } from 'inversify';
import { EmailService } from '../services/email.service';
import Types from '../types';
// import * as nodemailer from 'nodemailer';
@injectable()
export class EmailController {
    router: express.Router;
    constructor(@inject(Types.EmailService) private emailService: EmailService) {
        this.configureRouter();
    }
    private configureRouter(): void {
        this.router = express.Router();
        this.router.post('/drawing', async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            this.emailService.sendEmail(req.body.email, req.body.dataURL, req.body.file, req.body.ext)
            // tslint:disable-next-line: no-any
            .then((returnValue: any) => {
                returnValue = JSON.parse(returnValue);
                res.send(returnValue);
            })
            .catch((err: Error) => {
                res.send(err.message);
            });
        });
    }
}
