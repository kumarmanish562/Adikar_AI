import React from 'react';
import { Globe, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-white border-t border-slate-100 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    <div className="col-span-1 md:col-span-1">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="bg-primary p-1.5 rounded-md">
                                <Globe className="text-white w-5 h-5" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-primary uppercase">ADIKAR AI</span>
                        </div>
                        <p className="text-slate-500 text-sm leading-relaxed mb-8">
                            Our mission is to democratize legal information across India, making justice accessible for everyone through the power of artificial intelligence.
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-primary transition-colors cursor-pointer">
                                <Github className="w-5 h-5" />
                            </div>
                            <div className="p-2 bg-slate-50 rounded-full text-slate-400 hover:text-primary transition-colors cursor-pointer">
                                <Twitter className="w-5 h-5" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Legal Disclaimer</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Contact Support</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm">Support</h4>
                        <ul className="space-y-4 text-sm text-slate-500">
                            <li><a href="#" className="hover:text-primary transition-colors">FAQ</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">API Access</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Community</a></li>
                            <li><a href="#" className="hover:text-primary transition-colors">Report Issue</a></li>
                        </ul>
                    </div>

                    <div className="bg-slate-50 p-8 rounded-2xl">
                        <h4 className="font-bold text-slate-900 mb-4 text-sm">Join our legal tech community</h4>
                        <p className="text-slate-500 text-xs mb-6">Get the latest updates on legal tech and Indian laws.</p>
                        <div className="flex">
                            <input type="email" placeholder="Email address" className="bg-white border border-slate-200 rounded-l-md px-4 py-2 text-sm w-full focus:outline-none focus:border-primary" />
                            <button className="bg-primary text-white px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-all">
                                <Globe className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-100 pt-8 text-center">
                    <p className="text-slate-400 text-xs">
                        © 2024 Adikar AI Technologies Pvt Ltd. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
