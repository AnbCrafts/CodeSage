import React from 'react';
import HomeHeader from '../Components/HomeHeader';

const Help = () => {
  return (
    <div>
        <HomeHeader/>
        <section className=" text-white py-5 px-6 ">
      <div className="max-w-7xl mx-auto text-center ">
        {/* Title */}
        <h2 className="text-4xl font-semibold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
          Help Center
        </h2>
        <p className="text-lg text-gray-300 mb-12">
          Need assistance? Find helpful articles and FAQs to guide you through using our platform.
        </p>

        {/* General Help Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <h3 className="text-3xl font-semibold text-indigo-400 mb-4">Getting Started</h3>
          <p className="text-lg text-gray-300 mb-4">
            Welcome to CodeSage! To get started, simply upload your code into our platform. Choose the programming language, and we’ll analyze it for you.
          </p>
          <p className="text-lg text-gray-300">
            Our AI will automatically provide a summary, suggest improvements, and offer debugging assistance based on your code.
          </p>
        </div>

        {/* Troubleshooting Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <h3 className="text-3xl font-semibold text-indigo-400 mb-4">Troubleshooting</h3>
          <p className="text-lg text-gray-300 mb-4">
            If you encounter any issues, try these troubleshooting steps:
          </p>
          <ul className="text-lg text-gray-300 list-disc pl-8 space-y-3">
            <li>Ensure your code is correctly formatted before uploading.</li>
            <li>If the AI doesn't give a response, try re-uploading your file or refreshing the page.</li>
            <li>Check that you are using a supported programming language.</li>
          </ul>
        </div>

        {/* Common Issues Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <h3 className="text-3xl font-semibold text-indigo-400 mb-4">Common Issues</h3>
          <div className="space-y-4">
            <div className="text-lg text-gray-300">
              <p className="font-semibold">AI Not Analyzing Code</p>
              <p>Ensure your code file is in a supported format. Our platform supports .js, .py, .java, and other popular languages.</p>
            </div>

            <div className="text-lg text-gray-300">
              <p className="font-semibold">Error in Output</p>
              <p>If there’s an issue with the analysis, please submit feedback using the contact form, and our team will investigate the issue.</p>
            </div>

            <div className="text-lg text-gray-300">
              <p className="font-semibold">Slow Response Time</p>
              <p>If you experience delays, it may be due to server overload. Please try again later, or check our status page for updates.</p>
            </div>
          </div>
        </div>

        {/* Contact Support Section */}
        <div className="max-w-3xl mx-auto mb-16">
          <h3 className="text-3xl font-semibold text-indigo-400 mb-4">Contact Support</h3>
          <p className="text-lg text-gray-300 mb-4">
            If your issue is not resolved with the above steps, feel free to reach out to our support team. We’re here to assist you!
          </p>
          <div className="flex items-center justify-center space-x-4">
            <a href="mailto:support@codesage.com" className="text-indigo-400 hover:underline text-lg">
              📧 Email Support
            </a>
            <a href="tel:+1234567890" className="text-indigo-400 hover:underline text-lg">
              📞 Call Us
            </a>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default Help;
