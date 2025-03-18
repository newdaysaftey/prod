'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';

export default function ShippingPage() {
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleTrackingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // This is a simplified example. You would need to determine the carrier and redirect accordingly
    // window.open(`https://www.google.com/search?q=${trackingNumber}+tracking`, '_blank');
  };

  return (
    <div className="w-[90%] h-[600px] md:h-[800px] mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-blue-900 ">Shipping Information</h1>
{/* 
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-6">Track Your Order</h2>
        <form onSubmit={handleTrackingSubmit} className="space-y-4">
          <div>
            <label htmlFor="tracking" className="block text-sm font-medium text-gray-700">
              Enter Tracking Number
            </label>
            <div className="mt-1 flex rounded-md shadow-sm">
              <input
                type="text"
                id="tracking"
                className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-l-md border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Enter your tracking number"
                value={trackingNumber}
                onChange={(e) => setTrackingNumber(e.target.value)}
              />
              <button
                type="submit"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Search className="mr-2" size={20} />
                Track
              </button>
            </div>
          </div>
        </form>
      </div> */}

      <div className="prose lg:prose-xl">
        <h2 className="text-2xl font-semibold mb-4">Shipping Information</h2>
        <div className="space-y-4">
          <p>
            We process and ship orders Monday through Friday, excluding holidays. 
            Most orders are processed within 1-2 business days.
          </p>
          <h3 className="text-xl font-semibold">Shipping Methods:</h3>
          <ul className="list-disc pl-6">
            <li>Standard Shipping (5-7 business days)</li>
            <li>Express Shipping (2-3 business days)</li>
            <li>Next Day Shipping (order by 2 PM EST)</li>
          </ul>
        </div>
      </div>
    </div>
  );
}