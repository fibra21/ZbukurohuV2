'use client';

import Link from 'next/link';
import { 
  Shield, 
  Truck, 
  RefreshCw, 
  CreditCard, 
  Heart,
  Instagram,
  Facebook,
  Twitter
} from 'lucide-react';

export function Footer() {

  const trustFeatures = [
    {
      icon: Shield,
      title: 'Sigurisë',
      description: 'Produkte të origjinale dhe të sigurta'
    },
    {
      icon: Truck,
      title: 'Transporti i Shpejtë',
      description: 'Dërgesa në 2-3 ditë pune'
    },
    {
      icon: RefreshCw,
      title: 'Kthimi i Lehtë',
      description: '30 ditë për kthim të produkteve'
    },
    {
      icon: CreditCard,
      title: 'Pagesa e Sigurt',
      description: 'Metoda të sigurta të pagesës'
    }
  ];

  const footerLinks = {
    company: [
      { name: 'Rreth Nesh', href: '/about' },
      { name: 'Kontakti', href: '/contact' },
      { name: 'Karriera', href: '/careers' },
      { name: 'Blogu', href: '/blog' }
    ],
    support: [
      { name: 'Ndihmë', href: '/help' },
      { name: 'Kthimi', href: '/returns' },
      { name: 'Transporti', href: '/shipping' },
      { name: 'FAQ', href: '/faq' }
    ],
    legal: [
      { name: 'Kushtet e Përdorimit', href: '/terms' },
      { name: 'Politika e Privatësisë', href: '/privacy' },
      { name: 'Kushtet e Shitjes', href: '/terms-of-sale' },
      { name: 'Cookies', href: '/cookies' }
    ]
  };

  const socialLinks = [
    { icon: Instagram, href: 'https://instagram.com/zbukurohu', label: 'Instagram' },
    { icon: Facebook, href: 'https://facebook.com/zbukurohu', label: 'Facebook' },
    { icon: Twitter, href: 'https://twitter.com/zbukurohu', label: 'Twitter' }
  ];

  return (
    <footer className="bg-background-secondary border-t border-gray-200">
      {/* Trust Features */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trustFeatures.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary-50 rounded-2xl mb-3">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">
                  {feature.title}
                </h3>
                <p className="text-xs text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-primary rounded-2xl flex items-center justify-center">
                <span className="text-white font-serif font-bold text-sm">Z</span>
              </div>
              <span className="font-serif font-bold text-xl text-primary">Zbukurohu</span>
            </Link>
            <p className="text-gray-600 text-sm mb-4 max-w-md">
              Zbukurohu është platforma kryesore e tregtisë elektronike për kozmetikë dhe kujdesin e lëkurës në Kosovë. 
              Ne lidhim blerësit me distributuesit e autorizuar të markave më të mira botërore.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Kompania</h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Mbështetja</h3>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-4">Ligjore</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-600">
              © 2024 Zbukurohu. Të gjitha të drejtat e rezervuara.
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <span>Bërë me</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>në Kosovë</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
