"use client";
import React from "react";
import { CheckCircle, Home, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const ThankYouPage = () => {
  return (
    <div
      className={`min-h-screen pt-20 md:pt-24 pb-8 bg-gradient-to-b from-white to-gray-50 flex items-center justify-center p-0 ${poppins.className}`}
    >
      <div className="max-w-2xl w-full mx-auto text-center">
        {/* Main Card */}
        <div className="bg-white   p-6 md:p-10 border border-yellow-400">
          {/* Success Icon with Animation */}
          <div className="mb-6">
            <div className="mx-auto w-20 h-20 md:w-24 md:h-24 bg-green-50 rounded-full flex items-center justify-center mb-4 ">
              <CheckCircle size={48} className="text-green-500 md:w-12 md:h-12" />
            </div>
          </div>

          {/* Main Content */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-500 mb-4 leading-tight">
            Application Submitted Successfully!
          </h1>

          <div className="space-y-6 mb-4">
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              Thank you for choosing to apply with us. We&apos;re excited to review your application!
            </p>

            {/* What happens next card */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-5 md:p-6 text-sm md:text-base text-gray-600">
              <h3 className="font-semibold mb-3 text-lg flex items-center justify-center gap-2">
                <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full"></span>
                What happens next?
              </h3>
              <ul className="space-y-3 text-left list-none">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>You&apos;ll receive a confirmation email within the next few minutes</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Our admissions team will review your application within 2-3 business days</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>We&apos;ll schedule an interview if required for your chosen program</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mb-2">
            <Button
              onClick={() => (window.location.href = "/landingpage")}
              className="w-full sm:w-auto bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-black font-semibold px-8 py-6 text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Home className="w-5 h-5 mr-2 inline" />
              Return to Homepage
            </Button>
          </div>

          
          {/* Decorative Line */}
          <div className="w-20 md:w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-500 mx-auto mb-5 rounded-full"></div>


          {/* Contact Information */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <p className="text-sm md:text-base text-gray-600 mb-4">Have questions? Contact our admissions team:</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gray-500" />
                <a 
                  href="mailto:info@inframeschool.com" 
                  className="text-sm md:text-base font-medium text-gray-800 hover:text-yellow-600 transition-colors"
                >
                  info@inframeschool.com
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-500" />
                <a 
                  href="tel:+919649964937" 
                  className="text-sm md:text-base font-medium text-gray-800 hover:text-yellow-600 transition-colors"
                >
                  +91 9649 9649 37
                </a>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <div className="mt-6 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Your application ID: APP-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              You can track your application status in your email dashboard
            </p>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400">
            &copy; {new Date().getFullYear()} Inframe School of Photography. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;