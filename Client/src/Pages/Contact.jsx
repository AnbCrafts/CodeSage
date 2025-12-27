import React, { useState, useContext } from 'react';
import { Mail, MapPin, Phone, MessageSquare, Send, HelpCircle, ChevronDown, Loader2 } from 'lucide-react';
import HomeHeader from '../Components/HomeHeader';
import { CodeContext } from '../ContextAPI/CodeContext'; // 1. Import Context

const Contact = () => {
  const { sendCustomEmail } = useContext(CodeContext); // 2. Get the send function
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({ 
    firstName: '', 
    lastName: '', 
    email: '', 
    message: '' 
  });
  
  const [activeFAQ, setActiveFAQ] = useState(null);

  const faqs = [
    { question: "Is CodeSage free to use?", answer: "Yes, our Hobby plan is completely free forever. Pro plans offer higher rate limits and advanced features." },
    { question: "Is my code secure?", answer: "Absolutely. We process your code in real-time and do not store it on our servers after analysis." },
    { question: "Can I use it for commercial projects?", answer: "Yes, CodeSage is designed to help professional developers in enterprise environments." }
  ];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // 3. Updated Submit Handler
  const handleSubmit = async (e) => { 
    e.preventDefault();
    setLoading(true);

    // Prepare data for the utility (combining names)
    const emailData = {
      user_name: `${formData.firstName} ${formData.lastName}`.trim(),
      user_email: formData.email,
      message: formData.message,
      subject: "New Contact Form Message"
    };

    // Send via Context Utility (handles Toast & API)
    const success = await sendCustomEmail(emailData);

    if (success) {
      setFormData({ firstName: '', lastName: '', email: '', message: '' });
    }
    setLoading(false);
  };

  return (
    <div className="bg-slate-950 min-h-screen text-slate-200 font-sans selection:bg-purple-500 selection:text-white">
      <HomeHeader />

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-20 px-6 lg:px-8 text-center overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] -z-10" />
        
        <div className="max-w-3xl mx-auto relative z-10">
          <h2 className="text-sm font-bold text-purple-400 uppercase tracking-widest mb-4">Support & Feedback</h2>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            We'd love to hear from you.
          </h1>
          <p className="text-lg text-slate-400 leading-relaxed">
            Whether you have a question about features, pricing, or just want to say hello, our team is ready to answer all your questions.
          </p>
        </div>
      </section>

      {/* ================= CONTACT GRID ================= */}
      <section className="px-6 lg:px-8 pb-32">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          
          {/* LEFT: INFO & FAQ */}
          <div>
            <div className="grid gap-8 mb-16">
              {[
                { icon: <Mail />, title: "Email Us", desc: "support@codesage.ai", sub: "For general inquiries" },
                { icon: <MessageSquare />, title: "Live Chat", desc: "Start a conversation", sub: "Available 9am-5pm EST" },
                { icon: <MapPin />, title: "Office", desc: "San Francisco, CA", sub: "123 Market St, Suite 400" }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-slate-900 border border-white/10 rounded-xl flex items-center justify-center text-purple-400 flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <p className="text-slate-300 font-medium">{item.desc}</p>
                    <p className="text-slate-500 text-sm">{item.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FAQ Accordion */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
                <HelpCircle size={24} className="text-purple-400" /> FAQ
              </h3>
              <div className="space-y-4">
                {faqs.map((faq, i) => (
                  <div 
                    key={i} 
                    onClick={() => setActiveFAQ(activeFAQ === i ? null : i)}
                    className="border border-white/5 bg-slate-900/50 rounded-xl overflow-hidden cursor-pointer hover:border-purple-500/30 transition-colors"
                  >
                    <div className="p-4 flex justify-between items-center">
                      <span className="font-medium text-slate-300">{faq.question}</span>
                      <ChevronDown 
                        size={18} 
                        className={`text-slate-500 transition-transform duration-300 ${activeFAQ === i ? 'rotate-180' : ''}`} 
                      />
                    </div>
                    <div className={`px-4 pb-4 text-slate-400 text-sm leading-relaxed transition-all duration-300 ${activeFAQ === i ? 'block' : 'hidden'}`}>
                      {faq.answer}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-purple-600/20 to-indigo-600/20 rounded-3xl blur-xl -z-10" />
            <div className="bg-slate-900 border border-white/10 p-8 md:p-10 rounded-3xl shadow-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">Send a message</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">First Name</label>
                    <input 
                      type="text" name="firstName" 
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="John"
                      value={formData.firstName} onChange={handleChange} required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-400">Last Name</label>
                    <input 
                      type="text" name="lastName"
                      className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                      placeholder="Doe"
                      value={formData.lastName} onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Email Address</label>
                  <input 
                    type="email" name="email"
                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="john@company.com"
                    value={formData.email} onChange={handleChange} required 
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-400">Message</label>
                  <textarea 
                    name="message" rows="4"
                    className="w-full bg-slate-950 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    placeholder="How can we help you?"
                    value={formData.message} onChange={handleChange} required 
                  />
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full py-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-purple-900/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default Contact;