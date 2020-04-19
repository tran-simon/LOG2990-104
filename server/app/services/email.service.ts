import axios from 'axios';
import { Buffer } from 'buffer';
import * as FormData from 'form-data';
import * as fs from 'fs';
import { injectable } from 'inversify';
@injectable()
export class EmailService {
    // tslint:disable-next-line: no-any
    async sendEmail(userName: string, userEmail: string, dataUrl: string, fileName: string, extension: string): Promise<any> {
        // tslint:disable-next-line: no-any
        return new Promise((resolve: any, reject: any) => {
            console.log(dataUrl);
            const imagePath = '/home/theo/Documents/session_4/LOG2990/log2990/server/app/imageFile/' + fileName;
            console.log(__dirname);
            const data: FormData = new FormData();

            if (extension !== 'svg') {
                const buffer = Buffer.from(dataUrl, 'base64');
                fs.writeFileSync(imagePath, buffer);
            } else {
                fs.writeFileSync(imagePath, dataUrl);
            }

            data.append('to', userEmail);
            data.append('payload', fs.createReadStream(imagePath));
            axios.post('https://log2990.step.polymtl.ca/email', data, {headers:
            {...data.getHeaders({'X-Team-Key': 'efe63fca-7fd3-4f9d-853a-b47e00cae079'})}}).then((res) => {
                console.log(res);
                resolve(res);
            }).catch((err) => {
                console.log(err);
                reject(err);
            });

        });

    }
}
