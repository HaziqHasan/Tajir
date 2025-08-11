// ContactPage.jsx
import React, { useState } from "react";

const ContactPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Thanks for reaching out!");
  };

  return (
    <div className="min-h-screen bg-[#fdfaf6] flex justify-center py-10 px-4 mt-20">
      <div className="max-w-6xl w-full border border-gray-300 bg-[#F5ede5] flex flex-col md:flex-row">
        {/* Left Panel */}
        <div className="md:w-1/2 p-8 border-b md:border-b-0 md:border-r border-gray-300">
          <h2 className="text-3xl font-semibold mb-6">Contact form</h2>
          <p className="font-semibold mb-2">Address</p>
          <p className="text-gray-800 mb-4 leading-6">
            6 Koh E Fiza
            <br />
            Bhopal
            <br />
            Madhya Pradesh
            <br />
            India
          </p>

          <p className="font-semibold">Customer Query | 01254 662400</p>
          <p className="font-semibold mt-2">Seller Query | 07856 520000</p>
          <p className="mt-2">
            <span className="font-semibold">Email | </span>
            <a
              href="mailto:customercare@jubbas.com"
              className="text-gray-800 hover:underline"
            >
              customercare@Tajir.com
            </a>
          </p>

          <p className="mt-4">Retail Opening Times</p>
          <p className="mt-2 font-semibold">Mon – Sat | 13:00 – 19:00</p>
          <p className="font-semibold">Sun | 13:00 – 17:00</p>
        </div>

        {/* Right Panel */}
        <div className="md:w-1/2 p-8">
          <p className="mb-6 text-gray-800">
            We would love to hear from you. Any questions you may have will be
            responded to within 2 working days.
          </p>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                required
                onChange={handleChange}
                className="w-full mt-1 p-3 bg-[#faf8f5] border border-gray-300 rounded"
                placeholder="Name"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                E-mail <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                required
                onChange={handleChange}
                className="w-full mt-1 p-3 bg-[#faf8f5] border border-gray-300 rounded"
                placeholder="E-mail"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                name="phone"
                required
                onChange={handleChange}
                className="w-full mt-1 p-3 bg-[#faf8f5] border border-gray-300 rounded"
                placeholder="Phone Number"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-800">
                Your Request <span className="text-red-500">*</span>
              </label>
              <textarea
                name="message"
                rows="4"
                required
                onChange={handleChange}
                className="w-full mt-1 p-3 bg-[#faf8f5] border border-gray-300 rounded"
                placeholder="Your Request"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-black text-white rounded hover:bg-gray-800"
            >
              Submit
            </button>
          </form>
          <p className="mt-4 text-xs text-gray-600">
            Additional text for contact form.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
