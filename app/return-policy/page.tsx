export default function ReturnPolicyPage() {
  return (
    <div className="w-[90%] mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-blue-900">Return & Refund Policy</h1>
      <div className="prose lg:prose-xl">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Our 14-Day Return Policy</h2>
          <p className="text-lg mb-4">
            We want you to be completely satisfied with your purchase. If you're not happy with your order, 
            you have 14 days from the date of delivery to return the item(s).
          </p>
          
          <h3 className="text-xl font-semibold mb-3">Return Requirements:</h3>
          <ul className="list-disc pl-6 mb-6">
            <li>Items must be in their original condition</li>
            <li>All original packaging must be intact</li>
            <li>Tags must still be attached</li>
            <li>No signs of wear or use</li>
          </ul>

          <p className="text-lg">
            Once we receive and inspect the returned item(s), we will process your refund to the original 
            payment method within 5-7 business days.
          </p>
        </div>
      </div>
    </div>
  );
}