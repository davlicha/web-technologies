import { expect } from 'chai';
import * as Validator from '../src/validation.js';
import { describe, it } from 'mocha';

describe('Validator', () => {

    it('повинен повертати помилку, якщо обов\'язкове поле порожнє', () => {
        const data = { title: '' };
        const config = { title: { required: true } };
        const result = Validator.validate(data, config);

        expect(result.isValid).to.be.false;
        expect(result.errors.title).to.equal("Це поле є обов'язковим");
    });

    it('повинен повертати помилку, якщо рік введено неправильно', () => {
        const data = { year: 'abc' };
        const config = { year: { isYear: true } };
        const result = Validator.validate(data, config);

        expect(result.isValid).to.be.false;
        expect(result.errors.year).to.equal("Введіть коректний рік (напр. 2023)");
    });

    it('повинен проходити валідацію з коректними даними', () => {
        const data = { title: 'Test', year: '2020' };
        const config = { title: { required: true }, year: { isYear: true } };
        const result = Validator.validate(data, config);

        expect(result.isValid).to.be.true;
        expect(result.errors).to.be.empty;
    });
});