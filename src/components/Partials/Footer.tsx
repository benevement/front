import { Link } from "react-router-dom";
import { HiLockClosed, HiInformationCircle } from "react-icons/hi";
import { SiInstagram, SiFacebook  } from "react-icons/si";
import { FaTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="custom-footer fixed bottom-0 w-full text-white flex justify-around p-1 z-50">
      {/* Réseaux sociaux */}
      <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full hover:bg-blue-500 transition">
        <SiInstagram size={24} />
      </a>
      <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full hover:bg-blue-500 transition">
        <SiFacebook size={24} />
      </a>
      <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="p-3 rounded-full hover:bg-blue-500 transition">
        <FaTwitter  size={24} />
      </a>

      {/* Page sécurité/RGPD */}
      <Link to="/security" className="p-3 rounded-full hover:bg-blue-500 transition">
        <HiLockClosed size={24} />
      </Link>

      {/* Page informations / About */}
      <Link to="/about" className="p-3 rounded-full hover:bg-blue-500 transition">
        <HiInformationCircle size={24} />
      </Link>
    </footer>
  );
}
