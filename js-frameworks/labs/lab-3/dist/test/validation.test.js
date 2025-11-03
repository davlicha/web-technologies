import { expect } from 'chai';
import * as Validator from '../src/validation.js';
import { describe, it } from 'mocha';
describe('Validator', function () {
    it('повинен повертати помилку, якщо обов\'язкове поле порожнє', function () {
        var data = { title: '' };
        var config = { title: { required: true } };
        var result = Validator.validate(data, config);
        expect(result.isValid).to.be.false;
        expect(result.errors.title).to.equal("Це поле є обов'язковим");
    });
    it('повинен повертати помилку, якщо рік введено неправильно', function () {
        var data = { year: 'abc' };
        var config = { year: { isYear: true } };
        var result = Validator.validate(data, config);
        expect(result.isValid).to.be.false;
        expect(result.errors.year).to.equal("Введіть коректний рік (напр. 2023)");
    });
    it('повинен проходити валідацію з коректними даними', function () {
        var data = { title: 'Test', year: '2020' };
        var config = { title: { required: true }, year: { isYear: true } };
        var result = Validator.validate(data, config);
        expect(result.isValid).to.be.true;
        expect(result.errors).to.be.empty;
    });
});
//# sourceMappingURL=validation.test.js.map