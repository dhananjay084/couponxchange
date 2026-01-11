import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between gap-8">
        
        {/* Logo & About */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-white">YourBrand</h2>
          <p className="text-gray-400 max-w-xs">
            Innovative solutions for modern businesses. Stay connected and join our community!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-gray-400">
            <li><a href="/" className="hover:text-white transition">Home</a></li>
            <li><a href="/about" className="hover:text-white transition">About</a></li>
            <li><a href="/services" className="hover:text-white transition">Services</a></li>
            <li><a href="/contact" className="hover:text-white transition">Contact</a></li>
            <li><a href="/blog" className="hover:text-white transition">Blog</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex gap-4 text-gray-400">
            <a href="#" className="hover:text-blue-500 transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-sky-400 transition"><FaTwitter /></a>
            <a href="#" className="hover:text-pink-500 transition"><FaInstagram /></a>
            <a href="#" className="hover:text-blue-600 transition"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-gray-800 mt-8 pt-6 text-gray-500 text-sm">
  <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
    
    {/* Left side */}
    <p className="text-left md:text-left">
      &copy; {new Date().getFullYear()} YourBrand. All rights reserved.
    </p>

    {/* Right side - links */}
    <div className="flex gap-6">
      <Link href="/privacy" className="hover:text-white transition">
        Privacy Policy
      </Link>
      <Link href="/terms" className="hover:text-white transition">
        Terms of Service
      </Link>
    </div>

  </div>
</div>
    </footer>
  );
}
