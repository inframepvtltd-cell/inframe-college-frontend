import React from "react";

export default function RefundCancellationPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-3xl p-10 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-purple-50 opacity-40 pointer-events-none"></div>

        <h1 className="text-4xl font-bold text-gray-900 mb-8 relative z-10 text-center">
          Refund & Cancellation Policy
        </h1>

        <div className="space-y-8 relative z-10">
          {/* Refund Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Refund Policy</h2>
            <p className="text-gray-700 leading-relaxed mb-3">
              We handle refunds in the following scenarios:
            </p>
            <ul className="list-disc pl-6 space-y-3 text-gray-700">
              <li>
                During the online payment through credit/debit card, if the payment gets debited and the internet goes down due to external server malfunction or any similar issue.
              </li>
              <li>
                The system fails to generate the required acknowledgment due to internet malfunction.
              </li>
              <li>
                The payment gets deducted from the payer's account but does not reach the institute's account, or payment gets debited twice due to server error.
              </li>
            </ul>

            <p className="text-gray-700 leading-relaxed mt-4">
              We shall not be responsible in any case until the course fee paid by the student or parent is credited into the bank account of the institute. Once credited, the refund policy will be applicable as per the institute norms.
            </p>
          </section>

          {/* Cancellation Policy */}
          <section>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Cancellation Policy</h2>
            <p className="text-gray-700 leading-relaxed">
              If a student wishes to cancel enrollment, they must submit a written request within <span className="font-semibold">X days</span> of registration. Cancellations made after this period will not be eligible for a refund.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
