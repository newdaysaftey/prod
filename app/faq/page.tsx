export default function FAQPage() {
  return (
    <div className="w-[90%] mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-blue-900 text-blue-900">Support Center & FAQ</h1>

      <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">How do I place a custom order?</h3>
              <p className="text-gray-600">
                You can place a custom order by contacting our  team through the Contact Us page. 
                We'll work with you to understand your requirements and provide a quote.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What are your minimum order quantities?</h3>
              <p className="text-gray-600">
                Minimum order quantities vary by product type. For custom logo items, we typically require 
                a minimum of 12 pieces per design.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Do you offer rush orders?</h3>
              <p className="text-gray-600">
                Yes, we offer rush order services for an additional fee. Please contact us directly to 
                discuss your timeline requirements.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
              <p className="text-gray-600">
                We accept all major credit cards, PayPal, and bank transfers for business orders.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Can I modify my order after placing it?</h3>
              <p className="text-gray-600">
                Order modifications may be possible if the order hasn't entered production. Please contact 
                our customer service team as soon as possible.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">What is your warranty policy?</h3>
              <p className="text-gray-600">
                All our products come with a standard warranty against manufacturing defects. Specific 
                warranty terms vary by product type.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}