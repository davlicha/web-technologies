export function validate(formData, config) {
    var errors = {};
    for (var key in config) {
        var rules = config[key];
        var value = formData[key] ? formData[key].trim() : '';
        if (rules.required && !value) {
            errors[key] = "Це поле є обов'язковим";
            continue;
        }
        if (rules.isYear && value) {
            var yearRegex = /^(1[0-9]{3}|20[0-9]{2})$/;
            if (!yearRegex.test(value)) {
                errors[key] = 'Введіть коректний рік (напр. 2023)';
            }
        }
        if (rules.isEmail && value) {
            var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                errors[key] = 'Введіть коректний email.';
            }
        }
    }
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors,
    };
}
//# sourceMappingURL=validation.js.map