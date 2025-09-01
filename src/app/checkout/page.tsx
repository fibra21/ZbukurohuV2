import { Suspense } from 'react';
import { Metadata } from 'next';
import { 
  CheckCircle, 
  Circle, 
  ArrowRight, 
  Lock, 
  Shield, 
  Truck, 
  CreditCard,
  CreditCardIcon,
  Banknote,
  Gift,
  Star,
  Clock,
  MapPin,
  User,
  Phone,
  Mail
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Checkout | Zbukurohu',
  description: 'Complete your purchase securely with multiple payment options and fast delivery.',
  openGraph: {
    title: 'Checkout | Zbukurohu',
    description: 'Complete your purchase securely with multiple payment options and fast delivery.',
  },
};

export default function CheckoutPage() {
  const currentStep = 1; // In real app, this would be managed by state
  
  const steps = [
    { id: 1, name: 'Shipping', icon: MapPin, status: 'current' },
    { id: 2, name: 'Payment', icon: CreditCard, status: 'upcoming' },
    { id: 3, name: 'Review', icon: CheckCircle, status: 'upcoming' }
  ];

  const cartItems = [
    {
      id: 1,
      name: 'Premium Hydrating Serum',
      price: 45.99,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      name: 'Luxury Foundation',
      price: 32.50,
      quantity: 1,
      image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=100&h=100&fit=crop'
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.20; // 20% tax
  const total = subtotal + shipping + tax;

  const paymentMethods = [
    {
      id: 'credit',
      name: 'Credit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, American Express',
      popular: true
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: CreditCardIcon,
      description: 'Fast and secure checkout',
      popular: false
    },
    {
      id: 'bank',
      name: 'Bank Transfer',
      icon: Banknote,
      description: 'Direct bank payment',
      popular: false
    }
  ];

  const trustFeatures = [
    {
      icon: <Lock className="w-5 h-5" />,
      title: 'SSL Secure',
      description: '256-bit encryption'
    },
    {
      icon: <Shield className="w-5 h-5" />,
      title: 'Money-back Guarantee',
      description: '30-day return policy'
    },
    {
      icon: <Truck className="w-5 h-5" />,
      title: 'Fast Delivery',
      description: '2-3 business days'
    },
    {
      icon: <Star className="w-5 h-5" />,
      title: '4.9/5 Rating',
      description: 'From 10,000+ customers'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <nav aria-label="Progress">
            <ol className="flex items-center justify-center">
              {steps.map((step, stepIdx) => (
                <li key={step.name} className={`relative ${stepIdx !== steps.length - 1 ? 'pr-8 sm:pr-20' : ''} ${stepIdx !== 0 ? 'pl-8 sm:pl-20' : ''}`}>
                  <div className="absolute inset-0 flex items-center" aria-hidden="true">
                    <div className={`h-0.5 w-full ${stepIdx === 0 ? 'bg-transparent' : step.status === 'complete' ? 'bg-primary' : 'bg-gray-200'}`} />
                  </div>
                  <div className={`relative flex h-8 w-8 items-center justify-center rounded-full ${
                    step.status === 'complete' ? 'bg-primary' : step.status === 'current' ? 'bg-primary' : 'bg-gray-200'
                  }`}>
                    {step.status === 'complete' ? (
                      <CheckCircle className="h-5 w-5 text-white" aria-hidden="true" />
                    ) : step.status === 'current' ? (
                      <step.icon className="h-5 w-5 text-white" aria-hidden="true" />
                    ) : (
                      <step.icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    )}
                  </div>
                  <span className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-sm font-medium ${
                    step.status === 'complete' ? 'text-primary' : step.status === 'current' ? 'text-primary' : 'text-gray-500'
                  }`}>
                    {step.name}
                  </span>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Checkout Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <div className="flex items-center space-x-3 mb-6">
                <MapPin className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-gray-900">Shipping Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input 
                    type="tel" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="123 Main Street"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="New York"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="10001"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                    <option>Germany</option>
                    <option>France</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <div className="flex items-center space-x-3 mb-6">
                <CreditCard className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-gray-900">Payment Method</h2>
              </div>
              
              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <label key={method.id} className="relative flex cursor-pointer rounded-xl border border-gray-200 p-4 hover:border-primary transition-colors">
                    <input type="radio" name="payment" value={method.id} className="sr-only" />
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <method.icon className="w-8 h-8 text-gray-400" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-gray-900">{method.name}</span>
                          {method.popular && (
                            <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">Popular</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-500">{method.description}</p>
                      </div>
                    </div>
                  </label>
                ))}
              </div>

              {/* Credit Card Form (shown when credit card is selected) */}
              <div className="mt-6 p-6 bg-gray-50 rounded-xl">
                <h3 className="font-medium text-gray-900 mb-4">Credit Card Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="123"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Review */}
            <div className="bg-white rounded-2xl shadow-sm p-8">
              <div className="flex items-center space-x-3 mb-6">
                <CheckCircle className="w-6 h-6 text-primary" />
                <h2 className="text-2xl font-bold text-gray-900">Order Review</h2>
              </div>
              
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">€{item.price.toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Order Summary</h3>
                
                {/* Cart Items */}
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center space-x-3">
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-medium text-gray-900 truncate">{item.name}</h4>
                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-gray-900">€{(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-gray-200 pt-4 space-y-3">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <span>€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `€${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Tax</span>
                    <span>€{tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-3">
                    <div className="flex justify-between text-lg font-bold text-gray-900">
                      <span>Total</span>
                      <span>€{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Trust Signals */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4">
                    {trustFeatures.map((feature) => (
                      <div key={feature.title} className="text-center">
                        <div className="text-primary mb-2">{feature.icon}</div>
                        <div className="text-xs font-medium text-gray-900">{feature.title}</div>
                        <div className="text-xs text-gray-500">{feature.description}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Place Order Button */}
                <button className="w-full bg-primary text-white py-4 rounded-xl font-bold text-lg hover:bg-primary/90 transition-colors mt-6 flex items-center justify-center space-x-2">
                  <Lock className="w-5 h-5" />
                  <span>Place Order Securely</span>
                </button>

                {/* Additional Trust Info */}
                <div className="mt-4 text-center">
                  <p className="text-xs text-gray-500">
                    By placing your order, you agree to our{' '}
                    <a href="/terms" className="text-primary hover:underline">Terms of Service</a>
                    {' '}and{' '}
                    <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>
                  </p>
                </div>
              </div>

              {/* Guest Checkout Option */}
              <div className="mt-6 bg-blue-50 rounded-xl p-4">
                <div className="flex items-center space-x-3">
                  <User className="w-5 h-5 text-blue-600" />
                  <div>
                    <h4 className="font-medium text-blue-900">Guest Checkout</h4>
                    <p className="text-sm text-blue-700">No account required to complete your purchase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Banner */}
        <div className="mt-16 bg-gradient-to-r from-primary to-primary/80 rounded-2xl p-8 text-white text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-4">Shop with Confidence</h2>
            <p className="text-xl text-white/90 mb-8">
              Your security and satisfaction are our top priorities
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {trustFeatures.map((feature) => (
                <div key={feature.title} className="text-center">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                  <p className="text-white/80 text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
