import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { 
  FileText, Shield, Mail, Phone, 
  MapPin, Stethoscope, ExternalLink,
  Twitter, Facebook, Linkedin, Instagram
} from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Privacy Policy", href: "/more" },
    { name: "Terms of Service", href: "/more" },
    { name: "GDPR Compliance", href: "/more" },
    { name: "Medical Disclaimer", href: "/more" },
    { name: "Accessibility", href: "/more" },
    { name: "Cookie Policy", href: "/more" }
  ];

  const supportLinks = [
    { name: "Help Center", href: "/more" },
    { name: "Contact Support", href: "/more" },
    { name: "Report Issue", href: "/more" },
    { name: "Technical Support", href: "/more" }
  ];

  const socialLinks = [
    { name: "Twitter", icon: Twitter, href: "https://twitter.com/nhsprep" },
    { name: "Facebook", icon: Facebook, href: "https://facebook.com/nhsprep" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/company/nhsprep" },
    { name: "Instagram", icon: Instagram, href: "https://instagram.com/nhsprep" }
  ];

  return (
    <footer className="bg-gray-900 text-white mt-auto">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">NHSprep</span>
            </div>
            <p className="text-gray-300 text-sm">
              Empowering international medical graduates to succeed in the UK healthcare system through comprehensive PLAB preparation and cultural training.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    <IconComponent className="w-5 h-5" />
                    <span className="sr-only">{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Legal & Privacy */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal & Privacy</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Support</h3>
            <ul className="space-y-2">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href}
                    className="text-gray-300 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="w-4 h-4" />
                <span>support@nhsprep.com</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="w-4 h-4" />
                <span>+44 20 1234 5678</span>
              </div>
              <div className="flex items-start space-x-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4 mt-0.5" />
                <span>123 Medical Square<br />London, SW1A 1AA<br />United Kingdom</span>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Desktop More Section */}
      <div className="hidden md:block bg-gray-800 border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <Link href="/more">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white hover:border-white">
                  <FileText className="w-4 h-4 mr-2" />
                  Legal Documents & Support
                </Button>
              </Link>
              <Link href="/more">
                <Button variant="outline" className="border-gray-600 text-gray-300 hover:text-white hover:border-white">
                  <Shield className="w-4 h-4 mr-2" />
                  GDPR & Privacy Rights
                </Button>
              </Link>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400">
                Need help? Visit our{" "}
                <Link href="/more" className="text-blue-400 hover:text-blue-300">
                  support center
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>



      {/* Bottom Bar */}
      <div className="bg-gray-800 border-t border-gray-700">
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
      </div>


    </footer>
  );
}