export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string | number) => boolean | string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export const validateField = (value: string | number, rules: ValidationRule): ValidationResult => {
  const errors: string[] = [];

  // Required check
  if (rules.required && (!value || value.toString().trim() === '')) {
    errors.push('This field is required');
  }

  if (value && value.toString().trim() !== '') {
    // Min length check
    if (rules.minLength && value.toString().length < rules.minLength) {
      errors.push(`Minimum length is ${rules.minLength} characters`);
    }

    // Max length check
    if (rules.maxLength && value.toString().length > rules.maxLength) {
      errors.push(`Maximum length is ${rules.maxLength} characters`);
    }

    // Pattern check
    if (rules.pattern && !rules.pattern.test(value.toString())) {
      errors.push('Invalid format');
    }

    // Custom validation
    if (rules.custom) {
      const customResult = rules.custom(value);
      if (typeof customResult === 'string') {
        errors.push(customResult);
      } else if (!customResult) {
        errors.push('Invalid value');
      }
    }
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export const validateForm = (data: Record<string, string | number>, rules: Record<string, ValidationRule>): ValidationResult => {
  const errors: string[] = [];
  let isValid = true;

  for (const [field, fieldRules] of Object.entries(rules)) {
    const fieldValue = data[field];
    const fieldValidation = validateField(fieldValue, fieldRules);

    if (!fieldValidation.isValid) {
      isValid = false;
      errors.push(...fieldValidation.errors.map(error => `${field}: ${error}`));
    }
  }

  return { isValid, errors };
};

// Common validation rules
export const commonRules = {
  email: {
    required: true,
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    custom: (value: string | number) => {
      if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.toString())) {
        return 'Please enter a valid email address';
      }
      return true;
    }
  },
  password: {
    required: true,
    minLength: 8,
    custom: (value: string | number) => {
      if (value && value.toString().length < 8) {
        return 'Password must be at least 8 characters long';
      }
      if (value && !/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value.toString())) {
        return 'Password must contain at least one uppercase letter, one lowercase letter, and one number';
      }
      return true;
    }
  },
  phone: {
    pattern: /^[\+]?[1-9][\d]{0,15}$/,
    custom: (value: string | number) => {
      if (value && !/^[\+]?[1-9][\d]{0,15}$/.test(value.toString())) {
        return 'Please enter a valid phone number';
      }
      return true;
    }
  },
  discountCode: {
    pattern: /^[A-Z0-9]{4,20}$/,
    custom: (value: string | number) => {
      if (value && !/^[A-Z0-9]{4,20}$/.test(value.toString())) {
        return 'Discount code must be 4-20 characters, uppercase letters and numbers only';
      }
      return true;
    }
  },
  wholesaleQuantity: {
    required: true,
    custom: (value: string | number) => {
      if (value && Number(value) < 1) {
        return 'Quantity must be at least 1';
      }
      if (value && Number(value) > 10000) {
        return 'Quantity cannot exceed 10,000';
      }
      return true;
    }
  },
  price: {
    required: true,
    custom: (value: string | number) => {
      if (value && Number(value) < 0) {
        return 'Price cannot be negative';
      }
      if (value && Number(value) > 10000) {
        return 'Price cannot exceed €10,000';
      }
      return true;
    }
  }
};

// Validation for distributor application
export const distributorApplicationRules = {
  businessName: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  businessLicense: {
    required: true,
    pattern: /^[A-Z0-9]{8,20}$/
  },
  taxId: {
    required: true,
    pattern: /^[A-Z0-9]{9,15}$/
  },
  phone: commonRules.phone,
  email: commonRules.email
};

// Validation for business application
export const businessApplicationRules = {
  companyName: {
    required: true,
    minLength: 2,
    maxLength: 100
  },
  vatNumber: {
    required: true,
    pattern: /^[A-Z]{2}[0-9A-Z]+$/
  },
  businessType: {
    required: true,
    custom: (value: string | number) => {
      const validTypes = ['retail', 'wholesale', 'salon', 'spa', 'other'];
      if (value && !validTypes.includes(value.toString())) {
        return 'Please select a valid business type';
      }
      return true;
    }
  },
  phone: commonRules.phone,
  email: commonRules.email
};
