import { Buffer } from 'buffer';
import { injectable } from 'inversify';
import * as request from 'request';

@injectable()
export class EmailService {
  async sendEmail(userEmail: string, dataUrl: string, fileName: string, extension: string): Promise<string> {
    return new Promise<string>((resolve) => {
      let fileContent: string | Buffer;
      fileContent = extension !== 'svg' ? Buffer.from(dataUrl, 'base64') : dataUrl;
      const options = {
        method: 'POST',
        url: 'https://log2990.step.polymtl.ca/email?address_validation=true&quick_return=true',
        headers: {
          'x-team-key': process.env.API_KEY, 'content-type': 'multipart/form-data'
        },
        formData: {
          to: userEmail,
          payload: {
            value: fileContent,
            options: { filename: fileName, contentType: null }
          }
        }
      };
      request(options, (err: string | undefined, response: { body: string; }) => {
        console.log(response.body);
        resolve(response.body);
      });
    });
  }
}
