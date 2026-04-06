'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

const CONTACTS = [
  { icon: '📍', title: 'Visit Us', info: '260/1, Pragathi Mawatha, Pannipitiya', subinfo: 'Sri Lanka' },
  { icon: '📧', title: 'Contact Us', info: 'We reply within 24 hours', subinfo: 'Use the form below' },
  { icon: '📞', title: 'Call Us', info: '+94 741190465', subinfo: 'Mon-Fri 9am-6pm SLST' },
];

const DEPARTMENTS = [
  { name: 'General Inquiry' },
  { name: 'Partnership' },
  { name: 'Press & Media' },
  { name: 'Careers' },
  { name: 'Technical Support' },
];

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', company: '', department: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          department: form.department,
          message: form.message,
        }),
      });

      const data = await response.json() as { success?: boolean; error?: string };

      if (data.success) {
        setSubmitted(true);
        setForm({ name: '', email: '', company: '', department: '', message: '' });
      } else {
        alert(data.error || 'Something went wrong, please try again');
      }
    } catch (error) {
      console.error('Form error:', error);
      alert('Something went wrong, please try again');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-rixven-charcoal overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'linear-gradient(#0887C9 1px, transparent 1px), linear-gradient(90deg, #0887C9 1px, transparent 1px)', backgroundSize: '48px 48px' }} />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-rixven-blue opacity-20 blur-[200px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-rixven-gold opacity-10 blur-[150px] rounded-full" />
        
        <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-24 md:py-32">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="text-center">
            <span className="inline-block text-xs font-semibold tracking-ultra text-rixven-blue uppercase mb-4">Contact Us</span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight mb-6">
              Let's Build the<br /><span className="text-rixven-blue">Future Together</span>
            </h1>
            <p className="text-lg text-rixven-charcoal-400 max-w-2xl mx-auto leading-relaxed">
              Whether you're looking for infrastructure-grade technology or an engineer pushing the boundaries — we want to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-16 -mt-12 relative z-10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CONTACTS.map((contact, i) => (
              <motion.div
                key={contact.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="bg-white rounded-2xl p-8 border border-rixven-white-pearl shadow-card-lg hover:shadow-card-xl hover:border-rixven-blue/30 transition-all duration-300"
              >
                <div className="text-3xl mb-4">{contact.icon}</div>
                <h3 className="font-semibold text-rixven-charcoal text-lg mb-2">{contact.title}</h3>
                <p className="text-rixven-charcoal font-medium">{contact.info}</p>
                <p className="text-rixven-charcoal-400 text-sm">{contact.subinfo}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-bold text-rixven-charcoal mb-6">Send us a Message</h2>
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-rixven-blue-50 border border-rixven-blue-100 rounded-2xl p-8 text-center">
                <div className="text-4xl mb-4">✓</div>
                <h3 className="text-xl font-bold text-rixven-charcoal mb-2">Message Sent!</h3>
                <p className="text-rixven-charcoal-600">Thank you for reaching out. We'll get back to you within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-rixven-charcoal mb-2">First Name *</label>
                    <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-rixven-white-pearl bg-white text-rixven-charcoal focus:border-rixven-blue focus:ring-2 focus:ring-rixven-blue/20 outline-none transition-all" placeholder="John" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-rixven-charcoal mb-2">Email *</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-rixven-white-pearl bg-white text-rixven-charcoal focus:border-rixven-blue focus:ring-2 focus:ring-rixven-blue/20 outline-none transition-all" placeholder="john@company.com" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-rixven-charcoal mb-2">Company</label>
                    <input type="text" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-rixven-white-pearl bg-white text-rixven-charcoal focus:border-rixven-blue focus:ring-2 focus:ring-rixven-blue/20 outline-none transition-all" placeholder="Acme Inc." />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-rixven-charcoal mb-2">Department</label>
                    <select value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-rixven-white-pearl bg-white text-rixven-charcoal focus:border-rixven-blue focus:ring-2 focus:ring-rixven-blue/20 outline-none transition-all">
                      <option value="">Select...</option>
                      {DEPARTMENTS.map((d) => (<option key={d.name} value={d.name}>{d.name}</option>))}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-rixven-charcoal mb-2">Message *</label>
                  <textarea required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full px-4 py-3 rounded-lg border border-rixven-white-pearl bg-white text-rixven-charcoal focus:border-rixven-blue focus:ring-2 focus:ring-rixven-blue/20 outline-none transition-all resize-none" placeholder="Tell us about your project or inquiry..." />
                </div>
                <button type="submit" disabled={isLoading} className="w-full bg-rixven-blue text-white font-semibold py-4 rounded-xl hover:bg-rixven-blue-600 transition-colors shadow-blue-glow hover:shadow-blue-glow-lg disabled:opacity-50 disabled:cursor-not-allowed">
                  {isLoading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Department Contacts */}
            <div className="bg-rixven-white-slate rounded-2xl p-8">
              <h3 className="font-bold text-rixven-charcoal text-lg mb-6">Departments</h3>
              <div className="space-y-4">
                {DEPARTMENTS.map((dept) => (
                  <div key={dept.name} className="py-3 border-b border-rixven-white-pearl last:border-0">
                    <span className="text-rixven-charcoal font-medium">{dept.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Link */}
            <Link href="/about" className="block bg-gradient-to-r from-rixven-blue to-rixven-gold rounded-2xl p-8 text-white hover:opacity-90 transition-opacity">
              <h3 className="font-bold text-xl mb-2">Want to learn more?</h3>
              <p className="text-white/80 mb-4">Discover our story, mission, and the technology we're building.</p>
              <span className="inline-flex items-center gap-2 font-semibold">About RIXVEN →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="bg-rixven-white-slate py-16">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-rixven-white-pearl p-8 text-center">
            <div className="w-16 h-16 bg-rixven-blue/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-2xl">🗺️</span>
            </div>
            <h3 className="font-bold text-rixven-charcoal text-xl mb-2">Headquarters</h3>
            <p className="text-rixven-charcoal-600 mb-4">260/1, Pragathi Mawatha, Pannipitiya, Sri Lanka</p>
            <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-rixven-blue font-semibold hover:underline">
              View on Google Maps →
            </a>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-rixven-charcoal py-20">
        <div className="max-w-4xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-6">Ready to Build the Future?</h2>
          <p className="text-rixven-charcoal-400 text-lg mb-8">Join the waitlist for early access to RIXVEN OS, AI, and Lang.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/opportunities" className="px-8 py-4 bg-rixven-blue text-white font-semibold rounded-xl hover:bg-rixven-blue-600 transition-colors">
              Get Early Access
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}