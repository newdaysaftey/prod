import React from "react";
import { Mail, Phone, MessageSquare } from "lucide-react";

const ContactForm = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side - Image and text */}
        <div className="space-y-6">
          <img
            src="images/images/contact.png"
            alt="Contact support"
            className="w-full max-w-md mx-auto rounded-lg shadow-lg"
          />
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-800">Get in Touch</h2>
            <p className="text-gray-600">
              For inquiries or large order assistance, please complete the form
              with your details, and our team will get back to you promptly to
              assist with all needs.
            </p>
            <div className="flex flex-col space-y-3">
              <div className="flex items-center space-x-3 text-gray-600">
                <Mail className="w-5 h-5" />
                <span>support@company.com</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-600">
                <Phone className="w-5 h-5" />
                <span>+1 (555) 123-4567</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
                  placeholder="First Name"
                />
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
                  placeholder="Last Name"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Phone Number
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <select
                  id="country"
                  className="rounded-l-md border-r-0 border-gray-300 bg-gray-50 py-2 pl-3 pr-7 text-base focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option>US</option>
                  <option>CA</option>
                  <option>UK</option>
                </select>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
                  placeholder="(555) 987-6543"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="orderType"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Order Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <input
                    type="radio"
                    id="singleOrder"
                    name="orderType"
                    className="peer hidden"
                  />
                  <label
                    htmlFor="singleOrder"
                    className="block w-full p-4 text-sm border rounded-lg cursor-pointer bg-white hover:border-blue-500 peer-checked:border-blue-500 peer-checked:bg-blue-50"
                  >
                    <div className="font-medium">Single Order</div>
                    <div className="text-gray-500">
                      For individual purchases
                    </div>
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="radio"
                    id="bulkOrder"
                    name="orderType"
                    className="peer hidden"
                  />
                  <label
                    htmlFor="bulkOrder"
                    className="block w-full p-4 text-sm border rounded-lg cursor-pointer bg-white hover:border-blue-500 peer-checked:border-blue-500 peer-checked:bg-blue-50"
                  >
                    <div className="font-medium">Bulk Order</div>
                    <div className="text-gray-500">For orders of 10+ items</div>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all min-h-[120px]"
                placeholder="Leave us a message"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 py-3 px-4 rounded-md text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
