import axios from 'axios';
import { Buffer } from 'buffer';
import * as FormData from 'form-data';
import { injectable } from 'inversify';
@injectable()
export class EmailService {
    // tslint:disable-next-line: no-any
    async sendEmail(userName: string, userEmail: string, dataUrl: string, fileName: string, extension: string): Promise<any> {
        // tslint:disable-next-line: no-any
        return new Promise((resolve: any, reject: any) => {
            const data: FormData = new FormData();
            console.log(process.env.API_KEY);
            const apiKey = process.env.API_KEY as string;
            const buffer = Buffer.from(dataUrl, 'base64');
            data.append('to', userEmail);
            data.append('payload', buffer, {
            contentType: `image/${extension}`,
            filename: fileName,
            knownLength: buffer.byteLength
            });
            // tslint:disable-next-line: max-line-length
            axios.post('https://log2990.step.polymtl.ca/email', data, {headers:
            {...data.getHeaders({'X-Team-Key': apiKey, 'content-type': 'multipart/form-data'})}}).then((res) => {
                console.log(res);
                resolve(res);
            }).catch((err) => {
                console.log(err);
                reject(err);
            });

        });

    }
}
