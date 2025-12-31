"use client";

import { useState } from "react";
import { createPaymentOrder } from "../api";
// import { createPaymentOrder } from "@/utils/api";

interface PaymentStepProps {
    registrationFee: number;
    processingFee: number;
    courseName: string;
    onPaymentSuccess: () => void;
    onBack: () => void;
}

export default function PaymentStep({
    registrationFee,
    processingFee,
    courseName,
    onPaymentSuccess,
    onBack,
}: PaymentStepProps) {
    const totalAmount = registrationFee + processingFee;
    const [loading, setLoading] = useState(false);
    const [paymentCompleted, setPaymentCompleted] = useState(false);

    const loadRazorpay = () => {
        return new Promise<boolean>((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const handlePayment = async () => {
        setLoading(true);

        try {
            // Load Razorpay
            const razorpayLoaded = await loadRazorpay();
            if (!razorpayLoaded) {
                throw new Error("Razorpay SDK failed to load");
            }

            // Create order using API utility
            const order = await createPaymentOrder(totalAmount * 100);

            // Configure Razorpay options
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: "INR",
                name: "Your Institution Name",
                description: `Payment for ${courseName}`,
                order_id: order.id,
                handler: function (response: any) {
                    console.log("Payment successful:", response);
                    
                    // Verify payment on backend
                    verifyPayment(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature);
                    
                    setPaymentCompleted(true);
                    onPaymentSuccess();
                },
                prefill: {
                    email: "", // You can prefill with user email
                    contact: "", // You can prefill with user phone
                },
                theme: { color: "#111827" },
                modal: {
                    ondismiss: function() {
                        setLoading(false);
                    }
                }
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();

        } catch (error: any) {
            console.error("Payment error:", error);
            alert(`Payment failed: ${error.message || "Please try again."}`);
            setLoading(false);
        }
    };

    const verifyPayment = async (paymentId: string, orderId: string, signature: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payment/verify`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    razorpay_payment_id: paymentId,
                    razorpay_order_id: orderId,
                    razorpay_signature: signature
                }),
            });

            if (!response.ok) {
                throw new Error('Payment verification failed');
            }

            console.log('Payment verified successfully');
        } catch (error) {
            console.error('Payment verification error:', error);
        }
    };

    return (
        <div className="max-w-full mx-auto p-6">
            <div className="bg-white rounded-none shadow-lg border border-gray-200 overflow-hidden">
                <div className="p-6">
                    <p className="text-gray-600 mb-6">Complete your application by making the payment</p>

                    {/* Fee Summary */}
                    <div className="bg-gray-50 rounded-lg p-5 mb-6">
                        <h3 className="font-semibold text-lg mb-4 text-gray-800">Fee Summary</h3>

                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">Registration Fee</span>
                                <span className="font-medium">₹{registrationFee}</span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-700">Processing Fee</span>
                                <span className="font-medium">₹{processingFee}</span>
                            </div>

                            <div className="border-t border-gray-300 pt-3 mt-3">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold text-gray-900">Total Amount</span>
                                    <span className="text-2xl font-bold text-gray-900">₹{totalAmount}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Instructions */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <h4 className="font-medium text-blue-800 mb-2">Important Notes:</h4>
                        <ul className="text-sm text-blue-700 space-y-1">
                            <li>• You will be redirected to Razorpay's secure payment gateway</li>
                            <li>• Payment confirmation may take a few moments</li>
                            <li>• Please don't close the window during payment processing</li>
                            <li>• Save your payment receipt for future reference</li>
                        </ul>
                    </div>

                    {/* Payment Status */}
                    {paymentCompleted && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                            <div className="flex items-center gap-2 text-green-800">
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                                <span className="font-medium">Payment Successful!</span>
                            </div>
                            <p className="text-green-700 text-sm mt-1">
                                Your payment has been processed successfully. You will be redirected to the confirmation page shortly.
                            </p>
                        </div>
                    )}

                    {/* Payment Button */}
                    <div className="flex flex-col sm:flex-row gap-4 mt-8">
                       

                        <button
                            onClick={handlePayment}
                            disabled={loading || paymentCompleted}
                            className={`px-6 py-3 font-semibold rounded-lg transition-all duration-200 flex-1 ${paymentCompleted
                                ? "bg-green-600 text-white cursor-not-allowed"
                                : loading
                                    ? "bg-gray-600 text-white cursor-wait"
                                    : "bg-black text-white hover:bg-gray-800"
                                }`}
                        >
                            {loading ? (
                                <div className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Processing...
                                </div>
                            ) : paymentCompleted ? (
                                "Payment Completed ✓"
                            ) : (
                                `Pay ₹${totalAmount} Now`
                            )}
                        </button>
                    </div>

                    <p className="text-xs text-center text-gray-500 mt-4">
                        Secure payment powered by Razorpay
                    </p>
                </div>
            </div>
        </div>
    );
}