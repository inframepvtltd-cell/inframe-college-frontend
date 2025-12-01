"use client";

export default function TermsAndConditions() {
  return (
    <section className="min-h-screen bg-gray-50 py-12 px-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12">
        
        {/* Header */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
          Terms & Conditions
        </h1>

        <p className="text-gray-600 mb-6 leading-relaxed">
          Welcome to our website. If you continue to browse and use this website, you are agreeing to comply 
          with and be bound by the following terms and conditions of use, which together with our privacy 
          policy govern <span className="font-medium text-gray-800">WereSkill SCHOOL OF ART DESIGN & BUSINESS</span> 
          relationship with you in relation to this website. If you disagree with any part of these terms 
          and conditions, please do not use our website.
        </p>

        {/* About Info */}
        <div className="space-y-4 mb-10">
          <p className="text-gray-600 leading-relaxed">
            The term <span className="font-medium text-gray-800">WereSkill SCHOOL OF ART DESIGN & BUSINESS’</span> 
            or <span className="font-medium">‘us’</span> or <span className="font-medium">‘we’</span> refers to the owner 
            of the website whose registered office is:
          </p>

          <p className="font-medium text-gray-800 bg-gray-100 p-4 rounded-lg shadow-inner border">
            B-09 Behind Kamla Nagar Hospital, Pal Link Road, Jodhpur, Rajasthan
          </p>

          <p className="text-gray-600 leading-relaxed">
            The term <span className="font-medium text-gray-800">‘you’</span> refers to the user or viewer of our website.
          </p>
        </div>

        {/* Terms of Use */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-8">Terms of Use</h2>

        <ul className="list-disc list-inside text-gray-600 space-y-3 leading-relaxed">
          <li>The content of this website is for general information and subject to change without notice.</li>
          <li>You agree to use the site for lawful purposes only.</li>
          <li>
            Neither we nor third parties provide any warranty or guarantee on accuracy, performance, or completeness of the material.
          </li>
          <li>Your use of any information on this website is entirely at your own risk.</li>
          <li>
            This website contains material owned or licensed by us. Reproduction is prohibited except according to the copyright notice.
          </li>
        </ul>

        {/* Student Programs Terms */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-10">Student Programs Terms</h2>

        <ul className="list-disc list-inside text-gray-600 space-y-3 leading-relaxed">
          <li>All prices are in Indian Rupees.</li>
          <li>Prices and availability may change without notice.</li>
          <li>
            The institute reserves the right to refuse or cancel any order placed at an incorrect price.
          </li>
          <li>Students must maintain discipline and regular attendance.</li>
          <li>
            Absence for more than 10 days without written application may result in expulsion.
          </li>
        </ul>

        {/* Payment & Refund Policies */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-10">Payment & Refund Policy</h2>

        <ul className="list-disc list-inside text-gray-600 space-y-3 leading-relaxed">
          <li>No refund for Registration or Admission fees.</li>
          <li>
            If tuition fees are not paid in lump sum, post-dated cheques are mandatory.
          </li>
          <li>
            Cheque bounce will incur a ₹200 penalty.
          </li>
        </ul>

        {/* Liability */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-10">Liability & Jurisdiction</h2>

        <ul className="list-disc list-inside text-gray-600 space-y-3 leading-relaxed">
          <li>
            We are not responsible for any damages resulting from use of services on this site.
          </li>
          <li>
            All disputes fall under the exclusive jurisdiction of Courts in Jodhpur.
          </li>
          <li>We may contact the user via SMS, email, or calls for updates.</li>
        </ul>

        {/* Warranties */}
        <h2 className="text-2xl font-semibold text-gray-900 mb-4 mt-10">Warranties & Disclaimers</h2>

        <p className="text-gray-600 leading-relaxed">
          We provide our services using reasonable skill and care. Except as expressly stated in these terms, 
          we do not make any specific promises about the services. All services are provided 
          <span className="font-semibold text-gray-800"> “as is”.</span>
        </p>

        {/* Footer */}
        <div className="mt-12 text-center text-sm text-gray-500 border-t pt-4">
          © {new Date().getFullYear()} INFRAME SCHOOL OF ART DESIGN & BUSINESS. All Rights Reserved.
        </div>
      </div>
    </section>
  );
}
