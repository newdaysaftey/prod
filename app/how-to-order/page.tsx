import { Circle as CircleNumber } from 'lucide-react';

export default function HowToOrderPage() {
  const steps = [
    {
      title: "Browse Products",
      description: "Navigate through our catalog and select the items you're interested in."
    },
    {
      title: "Select Specifications",
      description: "Choose size, color, quantity, and any custom requirements for your order."
    },
    {
      title: "Add to Cart",
      description: "Click 'Add to Cart' for each item you want to purchase."
    },
    {
      title: "Review Cart",
      description: "Review your cart to ensure all items and specifications are correct."
    },
    {
      title: "Checkout",
      description: "Proceed to checkout and fill in your shipping and billing information."
    },
    {
      title: "Confirm Order",
      description: "Review your order one final time and confirm your purchase."
    }
  ];

  return (
    <div className="w-[90%] mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-blue-900">How to Order</h1>

      <div className="bg-white p-8 rounded-lg shadow-lg">
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="flex items-start">
              <div className="flex-shrink-0 bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                {index + 1}
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-gray-50 rounded-lg">
          <h3 className="text-xl font-semibold mb-4">Need Help?</h3>
          <p className="text-gray-600">
            If you need assistance with your order or have any questions, please don't hesitate to 
            contact our customer service team. We're here to help!
          </p>
        </div>
      </div>
    </div>
  );
}