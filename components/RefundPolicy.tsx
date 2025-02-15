import React from 'react';
import { Card, CardContent } from '../components/ui/card';
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const RefundPolicy = () => {
  return (
    <div className={`min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 ${poppins.className} my-20`}>
      <div className="max-w-4xl mx-auto">
        <Card className="bg-white shadow">
          <CardContent className="p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Refund and Cancellation Policy</h1>
            
            <section className="mb-8">
              <p className="text-gray-600 mb-4">
                We handle refunds in the following scenarios:
              </p>

              <ul className="space-y-4 text-gray-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0">•</span>
                  <p>During the online payment through credit/debit card if the payment gets debited and the internet goes down due to some external server malfunction or any other similar happening.</p>
                </li>

                <li className="flex gap-3">
                  <span className="flex-shrink-0">•</span>
                  <p>The system fails to generate the required acknowledgment due to internet malfunction.</p>
                </li>

                <li className="flex gap-3">
                  <span className="flex-shrink-0">•</span>
                  <p>The payment gets deducted from the payer's account and does not reach the institute's account or payment gets debited twice due to server error.</p>
                </li>
              </ul>
            </section>

            <section>
              <p className="text-gray-600">
                We shall not be responsible in any case until the course fee paid by student or parent is credited into the Bank Account of the institute. If credited into our account, the refund policy will be applicable as per the institute norms.
              </p>
            </section>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default RefundPolicy;