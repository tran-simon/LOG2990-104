import { defaultErrorMessages } from 'src/app/components/shared/inputs/custom-input/error-messages';

describe('ErrorMessages', () => {
    it('can get default error messages', () => {
        const errorMessages = defaultErrorMessages({ pattern: 'A' });
        expect(errorMessages.pattern).toEqual('A');
        expect(errorMessages.required).toEqual('La valeur est requise');
    });
});
