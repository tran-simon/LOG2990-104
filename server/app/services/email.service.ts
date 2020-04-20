import axios from 'axios';
import { Buffer } from 'buffer';
import * as FormData from 'form-data';
import { injectable } from 'inversify';
@injectable()
export class EmailService {
// tslint:disable-next-line: no-any
    async sendEmail(userEmail: string, dataUrl: string, fileName: string, extension: string): Promise<any> {
        // tslint:disable-next-line: no-any
        return new Promise((resolve: any, reject: any) => {
            const data: FormData = new FormData();
            data.append('to', userEmail);
            if (extension !== 'svg') {
                const buffer = Buffer.from(dataUrl, 'base64');
                data.append('payload', buffer, {filename: fileName, contentType: `image/${extension}`});
            } else {
                data.append('payload', dataUrl, {filename: fileName, contentType: 'image/svg+xml'});
            }
            axios.post('https://log2990.step.polymtl.ca/email?address_validation=true&quick_return=true', data, {headers:
            {...data.getHeaders({'X-Team-Key': process.env.API_KEY})}}).then((res) => {
                console.log(res);
                resolve(res);
            }).catch((err) => {
                console.log(err);
                reject(err);
            });
        });
    }
}
