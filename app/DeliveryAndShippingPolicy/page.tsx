"use client";

export default function DeliveryAndShippingPolicy() {
    return (
        <section className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 md:p-12">

                {/* Header */}
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 text-center">
                    Delivery & Shipping Policy
                </h1>

                {/* Intro */}
                <p className="text-gray-600 mb-8 leading-relaxed">
                    Our Delivery & Shipping Policy outlines how we process, ship, and deliver your orders both
                    within India and internationally. Please read the details below to understand our process
                    and timelines.
                </p>

                {/* Shipping Policy */}
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Shipping Policy</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                    We provide shipping services across India and outside India.
                    Shipping is available <span className="font-medium text-gray-800">5 days a week</span>.
                </p>

                {/* Processing */}
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Processing</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                    Orders placed after <span className="font-semibold text-gray-800">10 AM IST</span> will be processed
                    the next working day.
                    Orders are not processed on <span className="font-medium">Saturdays, Sundays, or National Holidays</span>.
                </p>

                {/* Shipping Charges */}
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Delivery or Shipping Charges</h2>

                <ul className="list-disc list-inside text-gray-600 space-y-3 leading-relaxed mb-6">
                    <li>Courier charges apply for packages shipped across India.</li>
                    <li>Some products may include free shipping offers.</li>
                </ul>

                <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-8">
                    <p className="text-gray-700 leading-relaxed">
                        <span className="font-semibold text-gray-900">Across India:</span> ₹50–₹90 for individual books/subjects
                        <br />
                        <span className="font-semibold text-gray-900">Outside India:</span> Charges vary by country.
                        Contact: <a href="mailto:wereskill@inframecollege.org" className="text-blue-600 underline">wereskill@inframecollege.org</a>
                    </p>
                </div>

                {/* Estimated Delivery Time */}
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Estimated Delivery Time</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Our standard shipping time is about 5-7 days. For shipping to a remote location, the possibility of delivery may depend on the area or the location where the order is to be delivered. In case none of our shipping partner delivers to your area, then we can send your order through Speed Post/Registered Post/Parcel by India Post. The orders sent through India Post can be tracked and it may take up to 5-10 days for the order to reach you, in extreme cases.
                </p>

                {/* <p className="text-gray-600 leading-relaxed mb-6">
                    If our delivery partners do not cover your location, we will ship through
                    <span className="font-medium text-gray-800"> Speed Post / Registered Post / Parcel (India Post)</span>.
                    Delivery through India Post may take <span className="font-medium">5–10 days</span> in some cases.
                </p> */}

                {/* Tracking Your Order */}
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Tracking Your Order</h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  You can track your order using the tracking number provided in your order confirmation email by visiting our delivery partner's website. It may take upto 12-24 hours to update your tracking number on our website.
                </p>

                {/* Shipping Partners */}
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Shipping Partners</h2>

                <p className="text-gray-600 leading-relaxed mb-4">
                    We use the best shipping partners in India. They provide Fast, Secure and Reliable delivery service. To track your orders you can visit the site of the relevant shipper.        </p>

                <div className="bg-gray-100 p-4 rounded-lg shadow-inner mb-8">
                    <p className="text-gray-700 leading-relaxed">
                        India Post (Speed Post), FEDEX, Blue Dart, DHL, and others.
                    </p>
                </div>  

                {/* Footer */}
                <div className="mt-12 text-center text-sm text-gray-500 border-t pt-4">
                    © {new Date().getFullYear()} INFRAME SCHOOL OF ART DESIGN & BUSINESS. All Rights Reserved.
                </div>
            </div>
        </section>
    );
}
