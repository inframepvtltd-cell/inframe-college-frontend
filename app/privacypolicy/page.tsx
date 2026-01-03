import React from "react";
// import { Card, CardContent } from "../components/ui/card";
import { Poppins } from "next/font/google";
import { Card, CardContent } from "@/components/ui/card";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const PrivacyPolicy = () => {
  return (
    <div
      className={`min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ${poppins.className} my-0`}
    >
      <div className="max-w-6xl text-justify mx-auto">
        <Card className="bg-white shadow">
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">
              Privacy Policy
            </h1>

            {/* Introduction */}
            <section className="mb-8">
              <p className="text-gray-600">
                We are committed to protecting the privacy of users ("Users") who
                access our website, application, or mobile applications
                ("Website/App"). This Privacy Policy explains how we collect,
                use, and disclose your information.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Information We Collect
              </h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>
                  Personal information such as name, email address, phone
                  number, date of birth, and other details you provide
                </li>
                <li>
                  Usage data including IP address, browser type, and device
                  information
                </li>
                <li>
                  Information from social media logins such as name, profile
                  picture, and email address
                </li>
                <li>
                  Contact information available on your device, if permission
                  is granted
                </li>
              </ul>
            </section>

            {/* How We Use Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                How We Use Your Information
              </h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Provide, operate, and improve our services</li>
                <li>Understand user behavior and platform usage</li>
                <li>Develop new features and functionalities</li>
                <li>Communicate with you regarding services, updates, and offers</li>
                <li>Prevent fraud, misuse, and illegal activities</li>
              </ul>
            </section>

            {/* Sharing Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Sharing Your Information
              </h2>
              <p className="text-gray-600">
                We may share your information with third parties only when
                necessary and only with partners who follow appropriate
                security standards. Such sharing is strictly limited to the
                purposes outlined in this policy.
              </p>
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Data Retention
              </h2>
              <p className="text-gray-600">
                We retain your information only for as long as necessary to
                fulfill the purposes described in this policy. Chat data and
                test attempt data are retained for a maximum of two years and
                are then automatically deleted.
              </p>
            </section>

            {/* Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Cookies and Third-Party Links
              </h2>
              <p className="text-gray-600 mb-4">
                We use cookies to enhance your experience and analyze usage
                trends. You may disable cookies through your browser settings,
                but some features may not function properly.
              </p>
              <p className="text-gray-600">
                Our platform may contain links to third-party websites. We are
                not responsible for the privacy practices or content of those
                sites.
              </p>
            </section>

            {/* User Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Your Privacy Rights
              </h2>
              <ul className="list-disc pl-6 text-gray-600 space-y-2">
                <li>Access and review your personal data</li>
                <li>Request correction of inaccurate information</li>
                <li>Request deletion of your personal data</li>
                <li>Object to or restrict processing of your data</li>
                <li>Request data portability where applicable</li>
              </ul>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Children’s Privacy
              </h2>
              <p className="text-gray-600">
                We do not knowingly collect personal information from children
                under the age of 13. If you believe that a child has provided us
                with personal information, please contact us so we can take
                appropriate action.
              </p>
            </section>

            {/* Age Requirements */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Age Requirements
              </h2>
              <p className="text-gray-600">
                The minimum age to use our platform is 18 for India and
                Australia, 13 for Singapore, 14 for South Korea, and 16 for
                Vietnam. Users below the required age must obtain parental
                consent.
              </p>
            </section>

            {/* Foreground Services */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Foreground Services
              </h2>
              <p className="text-gray-600 mb-4">
                We utilize Foreground Data Sync permission to enable seamless
                synchronization of downloaded videos. This ensures uninterrupted
                playback and efficient data management.
              </p>
              <p className="text-gray-600">
                All data processed through this service is handled securely and
                strictly in accordance with this Privacy Policy.
              </p>
            </section>

            {/* Updates */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Updates to This Policy
              </h2>
              <p className="text-gray-600">
                This Privacy Policy may be updated from time to time. Any
                changes that affect your rights will be communicated
                appropriately.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Governing Law and Jurisdiction
              </h2>
              <p className="text-gray-600">
                This policy is governed by the laws of India. Any disputes shall
                be resolved through arbitration in New Delhi.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Contact Us
              </h2>
              <p className="text-gray-600">
                If you have any questions or concerns regarding this Privacy
                Policy, please contact us through our official support channels.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
