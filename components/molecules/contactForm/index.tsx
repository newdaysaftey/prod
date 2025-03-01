import React, { useState } from "react";
import { Mail, Phone, MessageSquare } from "lucide-react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    region: "US",
    orderType: "Single",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<any>(null);

  const handleChange = (e: { target: { id: any; name: any; value: any } }) => {
    const { id, name, value } = e.target;

    // For radio buttons, use name and id
    if (name === "orderType") {
      setFormData({
        ...formData,
        orderType: id === "singleOrder" ? "Single" : "Bulk",
      });
    } else {
      // For other inputs, use id
      setFormData({
        ...formData,
        [id]: value,
      });
    }
  };

  const handleRegionChange = (e: { target: { value: any } }) => {
    setFormData({
      ...formData,
      region: e.target.value,
    });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    // This prevents the default form submission and page reload
    e.preventDefault();

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("http://localhost:3000/api/contactForm", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiJiYjIwYTc5Ny05MjZkLTRkMjAtOTFhZS1lNWM1NjVjM2JmMzMiLCJFbWFpbCI6Im5ld2RheXNhZmV0eUBnbWFpbC5jb20iLCJSb2xlIjoiQURNSU4iLCJpYXQiOjE3MzEwNTA5NjIsImV4cCI6MTczMTA1NDU2Mn0.E7boLNvfFKasDop44cI55quy8EnqS-BXswKZj-b7ZlU",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      setSubmitStatus({
        success: true,
        message:
          "Your Request has been received, Our team will reach you shortly",
      });

      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        region: "US",
        orderType: "Single",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        success: false,
        message: "Failed to send message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 bg-gray-50">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                <span>newdaysafety@gmail.com</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-xl shadow-lg space-y-6 h-full flex   items-center ">
          {submitStatus && (
            <div
              className={`p-4 mb-6 rounded-lg  ${
                submitStatus.success
                  ? "bg-green-50 text-green-800"
                  : "bg-red-50 text-red-800"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          {!submitStatus && (
            <form className="space-y-6 w-full" onSubmit={handleSubmit}>
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
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
                    placeholder="First Name"
                    required
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
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
                    placeholder="Last Name"
                    required
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
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
                  placeholder="you@company.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="phoneNumber"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Phone Number
                </label>
                <div className="mt-1 flex rounded-md shadow-sm">
                  <select
                    id="region"
                    value={formData.region}
                    onChange={handleRegionChange}
                    className="rounded-l-md border-r-0 border-gray-300 bg-gray-50 py-2 pl-3 pr-7 text-base focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="US">US</option>
                    <option value="CA">CA</option>
                    <option value="UK">UK</option>
                  </select>
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all"
                    placeholder="(555) 987-6543"
                    required
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
                      checked={formData.orderType === "Single"}
                      onChange={handleChange}
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
                      checked={formData.orderType === "Bulk"}
                      onChange={handleChange}
                    />
                    <label
                      htmlFor="bulkOrder"
                      className="block w-full p-4 text-sm border rounded-lg cursor-pointer bg-white hover:border-blue-500 peer-checked:border-blue-500 peer-checked:bg-blue-50"
                    >
                      <div className="font-medium">Bulk Order</div>
                      <div className="text-gray-500">
                        For orders of 10+ items
                      </div>
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
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500 bg-white dark:bg-slate-950 transition-all min-h-[120px]"
                  placeholder="Leave us a message"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-md text-white font-medium transition-colors duration-200 ${
                  isSubmitting
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                }`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
