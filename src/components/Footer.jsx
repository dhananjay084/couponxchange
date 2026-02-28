import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[var(--brand-primary)] text-blue-50 py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between gap-8">
        
        {/* Logo & About */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-white">CouponXchange</h2>
          <p className="text-blue-100/90 max-w-xs">
            Innovative solutions for modern businesses. Stay connected and join our community!
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white mb-4">Quick Links</h3>
          <ul className="space-y-2 text-blue-100/85">
            <li><a href="/" className="hover:text-[var(--brand-secondary)] transition">Home</a></li>
            <li><a href="/about" className="hover:text-[var(--brand-secondary)] transition">About</a></li>
            <li><a href="/services" className="hover:text-[var(--brand-secondary)] transition">Services</a></li>
            <li><a href="/contact" className="hover:text-[var(--brand-secondary)] transition">Contact</a></li>
            <li><a href="/blog" className="hover:text-[var(--brand-secondary)] transition">Blog</a></li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="font-semibold text-white mb-4">Follow Us</h3>
          <div className="flex gap-4 text-blue-100/85">
            <a href="#" className="hover:text-[var(--brand-secondary)] transition"><FaFacebookF /></a>
            <a href="#" className="hover:text-[var(--brand-secondary)] transition"><FaTwitter /></a>
            <a href="#" className="hover:text-[var(--brand-secondary)] transition"><FaInstagram /></a>
            <a href="#" className="hover:text-[var(--brand-secondary)] transition"><FaLinkedinIn /></a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="border-t border-blue-300/25 mt-8 pt-6 text-blue-100/80 text-sm">
  <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-4">
    
    {/* Left side */}
    <p className="text-left md:text-left">
      &copy; {new Date().getFullYear()} CouponXchange. All rights reserved.
    </p>

    {/* Right side - links */}
    <div className="flex gap-6">
      <Link href="/privacy" className="hover:text-[var(--brand-secondary)] transition">
        Privacy Policy
      </Link>
      <Link href="/terms" className="hover:text-[var(--brand-secondary)] transition">
        Terms of Service
      </Link>
    </div>

  </div>
</div>
    </footer>
  );
}
