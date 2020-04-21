import { expect } from 'chai';

import { testingContainer } from '../../test/test-utils';
import Types from '../types';

import { EmailService } from './email.service';

describe('Email Service', () => {
    let emailService: EmailService;

    beforeEach(async () => {
        await testingContainer().then((instance) => {
          emailService = instance[0].get<EmailService>(Types.EmailService);
        });
    });

    it('should instanciate correctly', (done: Mocha.Done) => {
        expect(emailService).to.be.instanceOf(EmailService);
        done();
    });
    it('should send email as jpeg', (done: Mocha.Done) => {
        emailService.sendEmail('theo.st-denis@polymtl.ca', '', 'test', 'jpeg').then((result) => {
            expect(result).to.equal('{"error":"File of MIME type application/octet-stream is not accepted."}');
            done();
        });
    });
    it('should send email as png', (done: Mocha.Done) => {
        emailService.sendEmail('theo.st-denis@polymtl.ca', '', 'test', 'png').then((result) => {
            expect(result).to.equal('{"error":"File of MIME type application/octet-stream is not accepted."}');
            done();
        });
    });
    it('should send email as svg', (done: Mocha.Done) => {
        emailService.sendEmail('theo.st-denis@polymtl.ca', '', 'test', 'svg').then((result) => {
            expect(result).to.equal('{"error":"File of MIME type  is not accepted."}');
            done();
        });
    });
});
