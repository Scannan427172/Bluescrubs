import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  FileText, Shield, Mail, Phone, 
  MapPin, Stethoscope, ExternalLink,
  Twitter, Facebook, Linkedin, Instagram
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-white mt-auto">
      {/* Simple Bottom Bar Only */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0 text-sm text-gray-400">
          <div className="flex items-center space-x-4">
            <span>© {currentYear} NHSprep Ltd. All rights reserved.</span>
            <span>Company Number: 12345678</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Registered in England and Wales</span>
            <span>VAT: GB123456789</span>
          </div>
        </div>
      </div>
    </footer>
  );
}