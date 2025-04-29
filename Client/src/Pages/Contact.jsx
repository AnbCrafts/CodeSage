import React, { useState } from 'react';
import HomeHeader from '../Components/HomeHeader';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can implement form submission logic here, like sending an email or saving the form data.
    console.log(formData);
  };

  return (
    <div>
        <HomeHeader/>
        <section className=" text-white py-5 px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Title */}
        <h2 className="text-4xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
          Contact Us
        </h2>
        <p className="text-lg text-gray-300 mb-12 py-5 rounded-2xl border border-[#ee82ee27]">Have questions or feedback? We’d love to hear from you. Fill out the form below or reach us through the contact details provided.</p>
        
        {/* Contact Form */}
        <div className="max-w-4xl mx-auto mb-16">
          <form onSubmit={handleSubmit} className="bg-[#0c0c3a] p-8 rounded-xl shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="name" className="text-white font-medium">Full Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 rounded-md bg-[#1e3a8a] text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="text-white font-medium">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full mt-2 p-3 rounded-md bg-[#1e3a8a] text-white"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="message" className="text-white font-medium">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full mt-2 p-3 rounded-md bg-[#1e3a8a] text-white"
                rows="5"
                required
              />
            </div>

            <button type="submit" className="w-full p-3 bg-indigo-400 text-white rounded-md hover:bg-indigo-500 transition-all">
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Details */}
        <div className="mb-16">
          <h3 className="text-3xl font-semibold text-indigo-400 mb-4">Reach Us Directly</h3>
          <div className="max-w-3xl mx-auto space-y-4 border border-[#ff000070] p-10 rounded-2xl">
            <div className="flex items-center space-x-4">
              <div className="text-2xl text-indigo-400">📧</div>
              <div className="text-lg text-gray-300  py-2">Email: <a href="mailto:contact@codesage.com" className="text-indigo-400 hover:underline">contact@codesage.com</a></div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-2xl text-indigo-400">📞</div>
              <div className="text-lg text-gray-300 py-2">Phone: <a href="tel:+1234567890" className="text-indigo-400 hover:underline">+1 234 567 890</a></div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="text-2xl text-indigo-400">🌐</div>
              <div className="text-lg text-gray-300  py-2">Website: <a href="/" className="text-indigo-400 hover:underline">www.codesage.com</a></div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div>
          <h3 className="text-3xl font-semibold text-indigo-400 mb-4">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div className="text-lg text-gray-300 border border-[#0000ff5e] hover:border-[blue] transition-all py-5 rounded-lg">
              <p className="font-semibold">What services do you offer?</p>
              <p>We provide an AI-powered platform for code review, debugging, explanation, and optimization.</p>
            </div>

            <div className="text-lg text-gray-300 border border-[#0000ff5e] hover:border-[blue] transition-all py-5 rounded-lg">
              <p className="font-semibold">How can I contact support?</p>
              <p>You can contact us through the contact form above or email us at contact@codesage.com.</p>
            </div>

            <div className="text-lg text-gray-300 border border-[#0000ff5e] hover:border-[blue] transition-all py-5 rounded-lg">
              <p className="font-semibold">Do you support multiple languages?</p>
              <p>Yes, our platform supports multiple programming languages including Python, JavaScript, Java, and more.</p>
            </div>
          </div>
        </div>
      </div>
    </section>


    </div>
  );
};

export default Contact;
