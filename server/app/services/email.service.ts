import { Buffer } from 'buffer';
import { injectable } from 'inversify';
import * as request from 'request';

@injectable()
export class EmailService {
    async sendEmail(userEmail: string, dataUrl: string, fileName: string, extension: string): Promise<string> {
        return new Promise<string>((resolve) => {
            let mimeType: string;
            let fileContent: string | Buffer;
            if (extension !== 'svg') {
                fileContent = Buffer.from(dataUrl, 'base64');
                mimeType = `image/${extension}`;
            } else {
                fileContent = dataUrl;
                mimeType = 'image/svg+xml';
            }
            const options = {
                method: 'POST',
                url: 'https://log2990.step.polymtl.ca/email?address_validation=true&quick_return=true',
                headers: {'x-team-key': process.env.API_KEY, 'content-type': 'multipart/form-data'
                },
                formData: {
                    to: userEmail,
                    payload: {
                        value: fileContent,
                        options: {filename: fileName, contentType: mimeType}
                    }
                }
            };
            request(options, (err: string | undefined, response: {body: string; }) => {
                console.log(response.body);
                resolve(response.body);
            });
        });
    }
}
