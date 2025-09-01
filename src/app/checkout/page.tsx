'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/lib/store';
import { t } from '@/lib/i18n';
import { 
  ArrowLeft, 
  Truck, 
  CheckCircle,
  Lock
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { locale, clearCart } = useAppStore();
  const [step, setStep] = useState<'form' | 'confirmation'>('form');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const subtotal = 45.99; // Mock total
  const shipping = 5;
  const total = subtotal + shipping;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock payment processing
    setTimeout(() => {
      setStep('confirmation');
      clearCart();
    }, 2000);
  };

  if (step === 'confirmation') {
    return (
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-serif font-bold text-gray-900 mb-4">
              {t(locale, 'thankYou')}
            </h1>
            <p className="text-gray-600 mb-8">
              Porosia juaj u konfirmua me sukses! Numri i porosisë: #ZB-2024-001
            </p>
            
            <div className="bg-gray-50 rounded-2xl p-6 mb-8">
              <h2 className="font-semibold text-gray-900 mb-4">Detajet e Dërgesës</h2>
              <div className="space-y-2 text-sm text-gray-600">
                <p>{formData.firstName} {formData.lastName}</p>
                <p>{formData.address}</p>
                <p>{formData.city}, {formData.postalCode}</p>
                <p>{formData.email}</p>
                <p>{formData.phone}</p>
              </div>
            </div>

            <div className="bg-primary-50 rounded-2xl p-6 mb-8">
              <div className="flex items-center space-x-2 text-primary mb-2">
                <Truck className="w-5 h-5" />
                <span className="font-semibold">Dërgesa</span>
              </div>
              <p className="text-sm text-gray-600">
                Porosia juaj do të dërgohet në 2-3 ditë pune. Do të merrni një email me detajet e gjurmimit.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => router.push('/')}
                className="w-full bg-primary text-white py-3 rounded-2xl font-semibold hover:bg-primary-600 transition-colors"
              >
                Vazhdo Blerjen
              </button>
              <button
                onClick={() => router.push('/account')}
                className="w-full border border-gray-300 text-gray-700 py-3 rounded-2xl font-semibold hover:bg-gray-50 transition-colors"
              >
                Shiko Porositë e Mia
              </button>
            </div>
          </div>
        </div>
    );
  }

  return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => router.back()}
            className="p-2 text-gray-600 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-3xl font-serif font-bold text-gray-900">
            {t(locale, 'checkout')}
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div>
            <div className="bg-white rounded-2xl shadow-soft p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Informacionet Personale
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emri
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Mbiemri
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefon
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresa
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Qyteti
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kodi Postar
                    </label>
                    <input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange('postalCode', e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Payment Information */}
                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Informacionet e Pagesës
                  </h3>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-6">
                    <div className="flex items-center space-x-2 text-yellow-800 text-sm">
                      <Lock className="w-4 h-4" />
                      <span>Ky është një demo. Pagesat janë të çaktivizuara.</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Numri i Kartës
                    </label>
                    <input
                      type="text"
                      value={formData.cardNumber}
                      onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Data e Skadimit
                      </label>
                      <input
                        type="text"
                        value={formData.expiryDate}
                        onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        CVV
                      </label>
                      <input
                        type="text"
                        value={formData.cvv}
                        onChange={(e) => handleInputChange('cvv', e.target.value)}
                        placeholder="123"
                        className="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-4 rounded-2xl font-semibold hover:bg-primary-600 transition-colors"
                >
                  Konfirmo Porosinë
                </button>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-2xl shadow-soft p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Përmbledhja e Porosisë
              </h2>

              {/* Mock Order Items */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">L&#39;Oréal Paris True Match Foundation</span>
                  <span>24.99 €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Maybelline Sky High Mascara</span>
                  <span>12.99 €</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">CeraVe Moisturizing Cream</span>
                  <span>18.50 €</span>
                </div>
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-gray-200 pt-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>{t(locale, 'subtotal')}</span>
                  <span>{subtotal.toFixed(2)} €</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>{t(locale, 'shipping')}</span>
                  <span>{shipping.toFixed(2)} €</span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between font-semibold text-lg text-gray-900">
                  <span>{t(locale, 'total')}</span>
                  <span>{total.toFixed(2)} €</span>
                </div>
              </div>

              {/* Security Notice */}
              <div className="mt-6 bg-gray-50 rounded-xl p-4">
                <div className="flex items-center space-x-2 text-gray-600 text-sm">
                  <Lock className="w-4 h-4" />
                  <span>Pagesa e sigurt me enkriptim SSL</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
