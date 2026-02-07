import React from 'react';
import { Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <div className="bg-primary p-1.5 rounded-md">
                            <Globe className="text-white w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tight text-primary uppercase">ADIKAR AI</span>
                    </Link>

                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Home</Link>
                        <Link to="/about" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">About</Link>
                        <Link to="/resources" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Resources</Link>
                        <Link to="/help" className="text-sm font-medium text-slate-600 hover:text-primary transition-colors">Help</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="flex items-center gap-2 text-sm font-medium border border-slate-200 px-3 py-1.5 rounded-md hover:bg-slate-50 transition-colors">
                            <Globe className="w-4 h-4" />
                            English
                        </button>
                        <button className="bg-primary text-white text-sm font-medium px-4 py-1.5 rounded-md hover:bg-primary/90 transition-all flex items-center gap-2">
                            Login
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
