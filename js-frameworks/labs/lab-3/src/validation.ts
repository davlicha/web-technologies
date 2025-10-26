export namespace Validator {
    export interface ValidationConfig {
        [key: string]: {
            required?: boolean;
            isYear?: boolean;
            isEmail?: boolean;
        };
    }

    export interface FormErrors {
        [key: string]: string;
    }

    export function validate(
        formData: { [key: string]: string },
        config: ValidationConfig
    ): { isValid: boolean; errors: FormErrors } {
        const errors: FormErrors = {};

        for (const key in config) {
            const rules = config[key];
            const value = formData[key] ? formData[key].trim() : '';

            if (rules.required && !value) {
                errors[key] = "Це поле є обов'язковим";
                continue;
            }

            if (rules.isYear && value) {
                const yearRegex = /^(1[0-9]{3}|20[0-9]{2})$/;
                if (!yearRegex.test(value)) {
                    errors[key] = 'Введіть коректний рік (напр. 2023)';
                }
            }

            if (rules.isEmail && value) {
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
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
}
