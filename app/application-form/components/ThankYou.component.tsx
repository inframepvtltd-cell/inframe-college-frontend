"use client";

import { PartyPopper, CheckCircle, Download, Mail, Phone } from "lucide-react";

interface ThankYouStepProps {
  studentName: string;
  email: string;
  applicationId: string;
}

export default function ThankYouStep({
  studentName,
  email,
  applicationId,
}: ThankYouStepProps) {
  const handleDownloadReceipt = () => {
    // Implement receipt download logic
    alert("Receipt download will be implemented!");
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-8 text-white text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-white/20 p-4 rounded-full">
              <PartyPopper className="w-12 h-12" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">Application Submitted Successfully!</h1>
          <p className="text-green-100">Thank you for choosing our institution</p>
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex items-center justify-center gap-2 mb-6">
            <CheckCircle className="w-6 h-6 text-green-500" />
            <span className="text-lg font-semibold text-gray-900">
              Your application is now complete
            </span>
          </div>

          {/* Summary Card */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Application Details</h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Application ID:</span>{" "}
                    <span className="font-mono text-gray-900">{applicationId}</span>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Student Name:</span>{" "}
                    <span className="text-gray-900">{studentName}</span>
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Email:</span>{" "}
                    <span className="text-gray-900">{email}</span>
                  </p>
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-gray-700 mb-2">Next Steps</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    You will receive a confirmation email within 24 hours
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Document verification process will begin shortly
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    Admission letter will be sent within 3-5 working days
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={handleDownloadReceipt}
              className="px-6 py-3 bg-white border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              Download Receipt
            </button>
            
            <button
              onClick={() => window.print()}
              className="px-6 py-3 bg-gray-800 text-white font-medium rounded-lg hover:bg-gray-900 transition-all duration-200"
            >
              Print Confirmation
            </button>
          </div>

          {/* Contact Information */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              Need Assistance?
            </h3>
            <div className="flex flex-col sm:flex-row justify-center gap-6 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="w-4 h-4" />
                <span>admissions@yourcollege.edu</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}