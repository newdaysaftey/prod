import Link from 'next/link';
import { Instagram, Facebook, Twitter, Youtube } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-blue-900 text-white py-8 mdModified:py-12">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 mdModified:grid-cols-4 gap-6 mdModified:gap-8">
        {/* Company Info Section */}
        <div className="text-center mdModified:text-left">
          <h3 className="text-lg mdModified:text-xl font-bold mb-3 mdModified:mb-4">Company Info</h3>
          <ul className="space-y-2">
            <li><Link href="/about" className="hover:text-gray-300 text-sm mdModified:text-base">About Company</Link></li>
            {/* <li><Link href="/what-we-do" className="hover:text-gray-300 text-sm mdModified:text-base">What We Do</Link></li> */}
            <li><Link href="/affiliate-program" className="hover:text-gray-300 text-sm mdModified:text-base">Affiliate & Distributor Program</Link></li>
            <li><Link href="/contact" className="hover:text-gray-300 text-sm mdModified:text-base">Contact Us</Link></li>
          </ul>
        </div>

        {/* Customer Service Section */}
        <div className="text-center mdModified:text-left">
          <h3 className="text-lg mdModified:text-xl font-bold mb-3 mdModified:mb-4">Customer Service</h3>
          <ul className="space-y-2">
            <li><Link href="/return-policy" className="hover:text-gray-300 text-sm mdModified:text-base">Return & Refund Policy</Link></li>
            <li><Link href="/shipping" className="hover:text-gray-300 text-sm mdModified:text-base">Shipping Info</Link></li>
          </ul>
        </div>

        {/* Help Section */}
        <div className="text-center mdModified:text-left">
          <h3 className="text-lg mdModified:text-xl font-bold mb-3 mdModified:mb-4">Help</h3>
          <ul className="space-y-2">
            <li><Link href="/faq" className="hover:text-gray-300 text-sm mdModified:text-base">Support Center & FAQ</Link></li>
            <li><Link href="/purchase-protection" className="hover:text-gray-300 text-sm mdModified:text-base">Purchase Protection</Link></li>
            <li><Link href="/how-to-order" className="hover:text-gray-300 text-sm mdModified:text-base">How to Order</Link></li>
            {/* <li><Link href="/shipping" className="hover:text-gray-300 text-sm mdModified:text-base">How to Track</Link></li> */}
            {/* <li><Link href="/affiliate-program" className="hover:text-gray-300 text-sm mdModified:text-base">Partner with Us</Link></li> */}
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="text-center mdModified:text-left ">
          <h3 className="text-lg mdModified:text-xl font-bold mb-3 mdModified:mb-4">Connect with Us</h3>
          <div className="flex justify-start md:justify-center md:gap-2 mdModified:space-x-6">
            <span className="opacity-50 cursor-not-allowed"><Instagram size={20} className="mdModified:w-6 mdModified:h-6" /></span>
            <span className="opacity-50 cursor-not-allowed"><Facebook size={20} className="mdModified:w-6 mdModified:h-6" /></span>
            <span className="opacity-50 cursor-not-allowed"><Twitter size={20} className="mdModified:w-6 mdModified:h-6" /></span>
            <span className="opacity-50 cursor-not-allowed"><Youtube size={20} className="mdModified:w-6 mdModified:h-6" /></span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;