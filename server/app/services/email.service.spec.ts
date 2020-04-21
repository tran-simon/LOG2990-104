/* tslint:disable:no-any no-magic-numbers */
/* tslint:disable:no-any no-string-literal */
import { expect } from 'chai';
import * as sinon from 'sinon';

import { Mongoose } from 'mongoose';

import * as httpStatus from 'http-status-codes';

import { EmailService } from './email.service';

import { testingContainer } from '../../test/test-utils';
import Types from '../types';

describe('Database Service', () => {
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
    it('should send email', (done: Mocha.Done) => {
        emailService.sendEmail('theo.st-denis@polymtl.ca', '', 'test', 'svg');
    });
});
