'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/Toast';
import { validateForm, businessApplicationRules } from '@/utils/validation';
import { Building2, CheckCircle, AlertCircle } from 'lucide-react';

interface BusinessApplicationData {
  companyName: string;
  vatNumber: string;
  businessType: string;
  phone: string;
  email: string;
  description: string;
  website?: string;
  expectedMonthlyVolume?: string;
}

export function BusinessApplicationForm() {
  const { user, updateProfile } = useAuth();
  const { addToast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<BusinessApplicationData>({
    companyName: '',
    vatNumber: '',
    businessType: '',
    phone: '',
    email: user?.email || '',
    description: '',
    website: '',
    expectedMonthlyVolume: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const businessTypes = [
    { value: 'retail', label: 'Retail Store' },
    { value: 'wholesale', label: 'Wholesale Business' },
    { value: 'salon', label: 'Beauty Salon' },
    { value: 'spa', label: 'Spa & Wellness Center' },
    { value: 'other', label: 'Other' }
  ];

  const volumeOptions = [
    { value: 'under-1000', label: 'Under €1,000/month' },
    { value: '1000-5000', label: '€1,000 - €5,000/month' },
    { value: '5000-10000', label: '€5,000 - €10,000/month' },
    { value: '10000-25000', label: '€10,000 - €25,000/month' },
    { value: 'over-25000', label: 'Over €25,000/month' }
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateField = (field: string, value: string) => {
    const fieldRules = businessApplicationRules[field as keyof typeof businessApplicationRules];
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
    const validation = validateForm(formData, businessApplicationRules);
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
      
      // Update user profile with business application
      await updateProfile({
        role: 'business',
        isVerified: false // Will be verified by admin
      });

      addToast({
        type: 'success',
        title: 'Application Submitted',
        message: 'Your business application has been submitted successfully. We will review it and get back to you within 2-3 business days.'
      });

      // Reset form
      setFormData({
        companyName: '',
        vatNumber: '',
        businessType: '',
        phone: '',
        email: user?.email || '',
        description: '',
        website: '',
        expectedMonthlyVolume: ''
      });
      setErrors({});
      
    } catch (error) {
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
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Building2 className="w-8 h-8 text-green-600" aria-hidden="true" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Apply for Business Account</h2>
        <p className="text-gray-600">
          Get access to wholesale pricing and bulk ordering for your business. Save money and grow your inventory.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Company Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Company Information</h3>
          
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
              Company Name *
            </label>
            <input
              type="text"
              id="companyName"
              value={formData.companyName}
              onChange={(e) => handleInputChange('companyName', e.target.value)}
              onBlur={(e) => validateField('companyName', e.target.value)}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                errors.companyName ? 'border-red-300' : 'border-gray-300'
              }`}
              placeholder="Enter your company name"
              aria-describedby={errors.companyName ? 'companyName-error' : undefined}
            />
            {errors.companyName && (
              <p id="companyName-error" className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" aria-hidden="true" />
                {errors.companyName}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="vatNumber" className="block text-sm font-medium text-gray-700 mb-2">
                VAT Number *
              </label>
              <input
                type="text"
                id="vatNumber"
                value={formData.vatNumber}
                onChange={(e) => handleInputChange('vatNumber', e.target.value)}
                onBlur={(e) => validateField('vatNumber', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.vatNumber ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="e.g., XE123456789"
                aria-describedby={errors.vatNumber ? 'vatNumber-error' : undefined}
              />
              {errors.vatNumber && (
                <p id="vatNumber-error" className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" aria-hidden="true" />
                  {errors.vatNumber}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-2">
                Business Type *
              </label>
              <select
                id="businessType"
                value={formData.businessType}
                onChange={(e) => handleInputChange('businessType', e.target.value)}
                onBlur={(e) => validateField('businessType', e.target.value)}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
                  errors.businessType ? 'border-red-300' : 'border-gray-300'
                }`}
                aria-describedby={errors.businessType ? 'businessType-error' : undefined}
              >
                <option value="">Select business type</option>
                {businessTypes.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
              {errors.businessType && (
                <p id="businessType-error" className="mt-1 text-sm text-red-600 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" aria-hidden="true" />
                  {errors.businessType}
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
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
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
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent ${
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

        {/* Business Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">Business Details</h3>
          
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
              Business Description *
            </label>
            <textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Tell us about your business, target market, and how you plan to use our products..."
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
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="https://yourcompany.com"
              />
            </div>

            <div>
              <label htmlFor="expectedMonthlyVolume" className="block text-sm font-medium text-gray-700 mb-2">
                Expected Monthly Volume
              </label>
              <select
                id="expectedMonthlyVolume"
                value={formData.expectedMonthlyVolume}
                onChange={(e) => handleInputChange('expectedMonthlyVolume', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="">Select volume range</option>
                {volumeOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
            aria-label={isSubmitting ? "Submitting application..." : "Submit business application"}
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

        {/* Benefits Notice */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" aria-hidden="true" />
            <div className="text-sm text-green-800">
              <p className="font-medium mb-1">Business Account Benefits:</p>
              <ul className="space-y-1 text-green-700">
                <li>• Wholesale pricing on all products</li>
                <li>• Bulk ordering with volume discounts</li>
                <li>• Priority customer support</li>
                <li>• Business invoicing and payment terms</li>
                <li>• Access to exclusive business-only products</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Information Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5" aria-hidden="true" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-1">What happens next?</p>
              <ul className="space-y-1 text-blue-700">
                <li>• We review your application within 2-3 business days</li>
                <li>• You'll receive an email with our decision</li>
                <li>• If approved, you'll get access to wholesale pricing</li>
                <li>• You can start placing bulk orders immediately</li>
              </ul>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
