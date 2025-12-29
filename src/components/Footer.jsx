
import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, Github } from 'lucide-react';

const Footer =() => {
  return (
    <footer className="bg-[#030906] pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-20">
        <div className="col-span-2 lg:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-[#00ff66] rounded flex items-center justify-center">
              <svg className="w-5 h-5 text-[#05100a]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4 4h7v7H4zm0 9h7v7H4zm9-9h7v7h-7zm0 9h7v7h-7z" />
              </svg>
            </div>
            <span className="text-2xl font-extrabold tracking-tight text-white">Tablixy</span>
          </div>
          <p className="text-gray-500 text-sm max-w-xs mb-8 leading-relaxed">
            The leading QR ordering platform for forward-thinking hospitality businesses. Speed up service and increase revenue today.
          </p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="text-gray-500 hover:text-white transition-colors">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-white">Product</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li><a href="#" className="hover:text-[#00ff66] transition-colors">Features</a></li>
            <li><a href="#" className="hover:text-[#00ff66] transition-colors">Pricing</a></li>
            <li><a href="#" className="hover:text-[#00ff66] transition-colors">Hardware</a></li>
            <li><a href="#" className="hover:text-[#00ff66] transition-colors">Integrations</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-white">Company</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li><a href="#" className="hover:text-[#00ff66] transition-colors">About Us</a></li>
            <li><a href="#" className="hover:text-[#00ff66] transition-colors">Careers</a></li>
            <li><a href="#" className="hover:text-[#00ff66] transition-colors">Blog</a></li>
            <li><a href="#" className="hover:text-[#00ff66] transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold mb-6 text-white">Support</h4>
          <ul className="space-y-4 text-sm text-gray-500">
            <li><a href="#" className="hover:text-[#00ff66] transition-colors">Help Center</a></li>
            <li><a href="#" className="hover:text-[#00ff66] transition-colors">API Docs</a></li>
            <li><a href="#" className="hover:text-[#00ff66] transition-colors">Status</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:row items-center justify-between gap-4">
        <p className="text-gray-600 text-xs font-medium">
          © {new Date().getFullYear()} Tablixy Inc. All rights reserved.
        </p>
        <div className="flex gap-8 text-xs text-gray-600 font-medium">
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
