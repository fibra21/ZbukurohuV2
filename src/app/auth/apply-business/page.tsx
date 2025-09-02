import { BusinessApplicationForm } from '@/components/auth/BusinessApplicationForm';

export default function ApplyBusinessPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <BusinessApplicationForm />
      </div>
    </div>
  );
}
