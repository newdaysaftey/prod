'use client';

import { useState } from 'react';
import { Mail } from 'lucide-react';

export default function AffiliateProgramPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // window.location.href = `mailto:newdaysafety@gmail.com?subject=Affiliate/Distributor Program Application&body=Name: ${formData.name}%0D%0AEmail: ${formData.email}%0D%0ACompany: ${formData.company}%0D%0AMessage: ${formData.message}`;
  };

  return (
    <div className="w-[90%] mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-blue-900">Affiliate & Distributor Program</h1>
      <div className="prose lg:prose-xl mb-6 md:mb-8">
        <p className="text-base md:text-lg">
          Join our network of successful affiliates and distributors. Partner with New Day Safety to offer 
          high-quality safety gear and custom apparel to your customers.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6 bg-white p-6 md:p-8 rounded-lg shadow-lg">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
          <input
            type="text"
            id="name"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            type="email"
            id="email"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
          />
        </div>

        <div>
          <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
          <input
            type="text"
            id="company"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.company}
            onChange={(e) => setFormData({...formData, company: e.target.value})}
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea
            id="message"
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
          ></textarea>
        </div>

        <button
          type="submit"
          className="flex items-center justify-center w-full px-4 py-3 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Mail className="mr-2" size={20} />
          Send Application
        </button>
      </form>
    </div>
  );
}