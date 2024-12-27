import React from "react";
import { Instagram, Facebook, X, Youtube } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white ">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Company Info</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors">
                  About Company
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors">
                  Affiliate & Influencer Program
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors">
                  Career
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors">
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors">
                  Return and Refund Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors">
                  Intellectual Property Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors">
                  Shipping Info
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors">
                  Your Records and Safety Alerts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors">
                  Report Suspicious Activity
                </a>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Help</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors">
                  Support Center & FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors">
                  Safety Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors">
                  Purchase Protection
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors">
                  How to Order
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors">
                  How to Track
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-300 transition-colors">
                  Partner with us
                </a>
              </li>
            </ul>
          </div>

          {/* Connect with Us */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Connect with Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-300 transition-colors">
                <Instagram className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-blue-300 transition-colors">
                <Facebook className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-blue-300 transition-colors">
                <X className="w-6 h-6" />
              </a>
              <a href="#" className="hover:text-blue-300 transition-colors">
                <Youtube className="w-6 h-6" />
              </a>
              {/* <a href="#" className="hover:text-blue-300 transition-colors">
                <Pinterest className="w-6 h-6" />
              </a> */}
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        {/* <div className="mt-12 border-t border-blue-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <h4 className="text-sm font-medium mb-2">We Accept</h4>
              <div className="flex space-x-3">
                {['visa', 'mastercard', 'amex', 'discover', 'paypal', 'apple-pay', 'google-pay'].map((payment) => (
                  <div key={payment} className="w-12 h-8 bg-white rounded-md flex items-center justify-center">
                    <img
                      src={`https://raw.githubusercontent.com/simple-icons/simple-icons/develop/icons/${payment}.svg`}
                      alt={payment}
                      className="h-5 w-auto opacity-80"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div> */}

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-blue-800 text-sm text-center space-y-4">
          <p>
            Copyright © {new Date().getFullYear()} Company Name - All rights
            reserved
          </p>
          <div className="flex justify-center space-x-4">
            <a href="#" className="hover:text-blue-300 transition-colors">
              Terms and Conditions
            </a>
            <span>•</span>
            <a href="#" className="hover:text-blue-300 transition-colors">
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
