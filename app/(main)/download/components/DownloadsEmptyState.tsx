import React from "react";
import { FileDown, RefreshCw, Mail, AlertCircle } from "lucide-react";
import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

interface DownloadsEmptyStateProps {
  onRetry: () => void;
}

const DownloadsEmptyState: React.FC<DownloadsEmptyStateProps> = ({ onRetry }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-yellow-100 text-center">
      <div className="max-w-md mx-auto">
        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-yellow-100 to-yellow-200 rounded-full flex items-center justify-center mb-6">
          <FileDown className="w-12 h-12 text-yellow-600" />
        </div>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-3">
          No Downloads Available
        </h3>
        
        <p className="text-gray-600 mb-8">
          We're currently preparing valuable resources for you. Check back soon for course materials, guides, and important documents.
        </p>
        
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg text-left">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-blue-800 mb-1">What to expect:</p>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Course syllabi and study materials</li>
                <li>• Admission forms and prospectus</li>
                <li>• Previous year question papers</li>
                <li>• Important announcements and notices</li>
              </ul>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
            <Button
              onClick={onRetry}
              className="bg-yellow-600 hover:bg-yellow-700 text-white"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh Page
            </Button>
            
            <Button
              variant="outline"
              onClick={() => window.location.href = '/contact'}
              className="border-yellow-600 text-yellow-600 hover:bg-yellow-50"
            >
              <Mail className="w-4 h-4 mr-2" />
              Contact Administration
            </Button>
          </div>
          
          <p className="text-sm text-gray-500 pt-4">
            Check our <a href="/announcements" className="text-yellow-600 hover:underline">announcements page</a> for updates
          </p>
        </div>
      </div>
    </div>
  );
};

export default DownloadsEmptyState;