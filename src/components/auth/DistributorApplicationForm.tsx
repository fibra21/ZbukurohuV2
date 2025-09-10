'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/Toast';
import { validateForm, distributorApplicationRules } from '@/utils/validation';
import { Store, CheckCircle, AlertCircle } from 'lucide-react';

interface DistributorApplicationData {
  businessName: string;
  businessLicense: string;
  taxId: string;
  phone: string;
  email: string;
  description: string;
  website?: string;
  socialMedia?: string;
}

export function DistributorApplicationForm() {
  const { user, updateProfile } = useAuth();
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<DistributorApplicationData>({
    businessName: '',
    businessLicense: '',
    taxId: '',
    phone: '',
    email: user?.email || '',
    description: '',
    website: '',
    socialMedia: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateField = (field: string, value: string) => {
    const fieldRules = distributorApplicationRules[field as keyof typeof distributorApplicationRules];
    if (fieldRules) {
      const validation = validateForm({ [field]: value }, { [field]: fieldRules });
      if (!validation.isValid) {
        setErrors(prev => ({ ...prev, [field]: validation.errors[0] }));
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const formDataForValidation: Record<string, string | number> = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== undefined && value !== '') {
        formDataForValidation[key] = value;
      }
    });
    
    const validation = validateForm(formDataForValidation, distributorApplicationRules);
    if (!validation.isValid) {
      const fieldErrors: Record<string, string> = {};
      validation.errors.forEach(error => {
        const [field] = error.split(': ');
        fieldErrors[field] = error.replace(`${field}: `, '');
      });
      setErrors(fieldErrors);
      addToast({
        type: 'error',
        title: 'Validation Error',
        message: 'Please fix the errors in the form'
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Update user profile with distributor application
      await updateProfile({
        role: 'distributor',
        isVerified: false // Will be verified by admin
      });

      addToast({
        type: 'success',
        title: 'Application Submitted',
        message: 'Your distributor application has been submitted successfully. We will review it and get back to you within 2-3 business days.'
      });

      // Reset form
      setFormData({
        businessName: '',
        businessLicense: '',
        taxId: '',
        phone: '',
        email: user?.email || '',
        description: '',
        website: '',
        socialMedia: ''
      });
      setErrors({});
      
    } catch {
      addToast({
        type: 'error',
        title: 'Submission Failed',
        message: 'There was an error submitting your application. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-lg">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Store className="w-8 h-8 text-purple-600" aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Apply to Become a Distributor</h2>
        <p className="text-gray-600">
          Join our exclusive network of verified distributors and grow your business with premium beauty products.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Business Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Business Information</h3>
          
          <div>
            <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-2">
              Business Name *
            </label>
            <input
              type="text"
              id="businessName"
              value={formData.businessName}
              onChange={(e) => handleInputChange('businessName', e.target.value)}
              onBlur={(e) => validateField('businessName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                errors.businessName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your business name"
              aria-describedby={errors.businessName ? 'businessName-error' : undefined}
            />
            {errors.businessName && (
              <p id="businessName-error" className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" aria-hidden="true" />
                {errors.businessName}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="businessLicense" className="block text-sm font-medium text-gray-700 mb-2">
                Business License Number *
              </label>
              <input
                type="text"
                id="businessLicense"
                value={formData.businessLicense}
                onChange={(e) => handleInputChange('businessLicense', e.target.value)}
                onBlur={(e) => validateField('businessLicense', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.businessLicense ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="e.g., BL12345678"
                aria-describedby={errors.businessLicense ? 'businessLicense-error' : undefined}
              />
              {errors.businessLicense && (
                <p id="businessLicense-error" className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" aria-hidden="true" />
                  {errors.businessLicense}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="taxId" className="block text-sm font-medium text-gray-700 mb-2">
                Tax ID Number *
              </label>
              <input
                type="text"
                id="taxId"
                value={formData.taxId}
                onChange={(e) => handleInputChange('taxId', e.target.value)}
                onBlur={(e) => validateField('taxId', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.taxId ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="e.g., TX123456789"
                aria-describedby={errors.taxId ? 'taxId-error' : undefined}
              />
              {errors.taxId && (
                <p id="taxId-error" className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" aria-hidden="true" />
                  {errors.taxId}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Contact Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                onBlur={(e) => validateField('phone', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.phone ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="+383 44 123 456"
                aria-describedby={errors.phone ? 'phone-error' : undefined}
              />
              {errors.phone && (
                <p id="phone-error" className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" aria-hidden="true" />
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onBlur={(e) => validateField('email', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="business@example.com"
                aria-describedby={errors.email ? 'email-error' : undefined}
              />
              {errors.email && (
                <p id="email-error" className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" aria-hidden="true" />
                  {errors.email}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Additional Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Additional Information</h3>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Business Description *
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Tell us about your business, experience, and why you want to become a distributor..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                Website (Optional)
              </label>
              <input
                type="url"
                id="website"
                value={formData.website}
                onChange={(e) => handleInputChange('website', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="https://yourbusiness.com"
              />
            </div>

            <div>
              <label htmlFor="socialMedia" className="block text-sm font-medium text-gray-700 mb-2">
                Social Media (Optional)
              </label>
              <input
                type="text"
                id="socialMedia"
                value={formData.socialMedia}
                onChange={(e) => handleInputChange('socialMedia', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="@yourbusiness"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            aria-label={isSubmitting ? "Submitting application..." : "Submit distributor application"}
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" aria-hidden="true" />
                Submitting Application...
              </>
            ) : (
              <>
                <CheckCircle className="w-5 h-5 mr-2" aria-hidden="true" />
                Submit Application
              </>
            )}
          </button>
        </div>

        {/* Information Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" aria-hidden="true" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">What happens next?</p>
              <ul className="space-y-1 text-blue-700">
                <li>• We review your application within 2-3 business days</li>
                <li>• You&apos;ll receive an email with our decision</li>
                <li>• If approved, you&apos;ll get access to distributor features</li>
                <li>• You can start managing products and orders immediately</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
