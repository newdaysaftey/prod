import { Shield, CheckCircle } from 'lucide-react';

export default function PurchaseProtectionPage() {
  return (
    <div className="w-[90%] mx-auto px-4 py-8 md:py-12">
      <div className="text-center mb-8 md:mb-12">
        <Shield className="mx-auto h-12 w-12 md:h-16 md:w-16 text-blue-600 mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold mb-3 md:mb-4">Purchase Protection</h1>
        <p className="text-lg md:text-xl text-gray-600">
          Shop with confidence knowing that your purchase is protected
        </p>
      </div>

      <div className="grid gap-6 md:gap-8 md:grid-cols-1 grid-cols-2">
        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Our Guarantee</h2>
          <ul className="space-y-3 md:space-y-4">
            {[
              'Secure payment processing',
              'Quality assurance on all products',
              '14-day return policy',
              'Protection against defects',
              'Verified supplier status',
              'Customer support assistance'
            ].map((item, index) => (
              <li key={index} className="flex items-center">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                <span className="text-sm md:text-base">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-lg shadow-md">
          <h2 className="text-xl md:text-2xl font-semibold mb-4">Secure Transactions</h2>
          <p className="text-sm md:text-base text-gray-600 mb-4">
            All transactions are processed through secure and encrypted channels. 
            We partner with trusted payment providers to ensure your financial information 
            remains safe and protected.
          </p>
          <div className="border-t pt-4 mt-4">
            <h3 className="text-lg md:text-xl font-semibold mb-3">What's Covered:</h3>
            <ul className="space-y-2 text-gray-600 text-sm md:text-base">
              <li>• Item not received</li>
              <li>• Item not as described</li>
              <li>• Damaged items</li>
              <li>• Manufacturing defects</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}