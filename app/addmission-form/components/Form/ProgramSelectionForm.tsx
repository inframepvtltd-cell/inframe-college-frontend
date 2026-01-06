"use client";

import { useEffect, useState } from "react";
import { GraduationCap, IndianRupee, Calendar, BookOpen, Clock, Info, CreditCard } from "lucide-react";
import { createPaymentOrder, fetchAllPaidCourse } from "../../api";

interface Course {
  id: string;
  course_name: string;
  course_slug: string;
  price: string;
  duration?: string;
  mode?: string;
}

interface ProgramSelectionFormProps {
  data: {
    courseId?: string;
    email?: string;
    phone?: string;
    [key: string]: any;
  };
  onChange: (field: string, value: any) => void;
  onPaymentComplete?: (paymentData: any) => void; // Optional callback for payment
}

export default function ProgramAndPaymentForm({
  data,
  onChange,
  onPaymentComplete,
}: ProgramSelectionFormProps) {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [paymentLoading, setPaymentLoading] = useState(false);
  const [paymentCompleted, setPaymentCompleted] = useState(false);

  /** Fetch paid courses */
  useEffect(() => {
    const loadCourses = async () => {
      try {
        setLoading(true);
        const res = await fetchAllPaidCourse();
        console.log("Courses API Response:", res);
        setCourses(res);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    loadCourses();
  }, []);

  /** Find selected course BY ID */
  const selectedCourse = courses.find((c) => c.id === data.courseId);

  // Convert price string to number
  const registrationFee = selectedCourse ? parseFloat(selectedCourse.price) : 0;
  const totalAmount = registrationFee;
  const roundoff = Math.round(totalAmount);

  // Load Razorpay script
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
    if (!selectedCourse) {
      alert("Please select a course first");
      return;
    }

    setPaymentLoading(true);
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
        name: "Inframe College",
        description: `Payment for ${selectedCourse.course_name}`,
        order_id: order.id,
        handler: function (response: any) {
          console.log("Payment successful:", response);
          verifyPayment(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature);
          setPaymentCompleted(true);
          
          // Pass payment data to parent
          if (onPaymentComplete) {
            onPaymentComplete({
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              payment_amount: totalAmount,
              payment_status: true
            });
          }
        },
        prefill: {
          email: data.email || "",
          contact: data.phone || "",
        },
        theme: { color: "#111827" },
        modal: {
          ondismiss: function () {
            setPaymentLoading(false);
          }
        }
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.open();

    } catch (error: any) {
      console.error("Payment error:", error);
      alert(`Payment failed: ${error.message || "Please try again."}`);
      setPaymentLoading(false);
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
    <div className="space-y-8">
      {/* Program Selection Section */}
      <div className="bg-white rounded-xl shadow-sm border p-6 space-y-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5" />
            Select Your Course
          </h3>
          <p className="text-sm text-gray-500">
            Choose your preferred course
          </p>
        </div>

        {/* Course Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Course <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            value={data.courseId || ""}
            onChange={(e) => onChange("courseId", e.target.value)}
            disabled={loading}
          >
            <option value="">
              {loading ? "Loading courses..." : "Select Course"}
            </option>
            {courses.map((course) => (
              <option key={course.id} value={course.id}>
                {course.course_name} - ₹{course.price}
              </option>
            ))}
          </select>

          {!data.courseId && (
            <p className="mt-2 text-sm text-red-500 flex items-center gap-1">
              Please select a course to continue
            </p>
          )}
        </div>

        {/* Course Details Card */}
        {selectedCourse && (
          <>
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 space-y-4">
              <h4 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
                <BookOpen className="w-5 h-5" />
                Course Details
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Course Duration</p>
                      <p className="font-medium">{selectedCourse.duration || "6"} Months</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Mode</p>
                      <p className="font-medium capitalize">{selectedCourse.mode || "Online + Offline"}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <IndianRupee className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Course Fee</p>
                      <p className="text-lg font-bold">₹{selectedCourse.price}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Optional Payment Section */}
            <div className="bg-white border border-gray-200 rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-lg text-gray-900 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    Payment (Optional)
                  </h4>
                  <p className="text-sm text-gray-500 mt-1">
                    You can pay now or later at campus
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-gray-900">₹{totalAmount}</p>
                  <p className="text-sm text-gray-500">Total Amount</p>
                </div>
              </div>

              {/* Payment Status */}
              {paymentCompleted && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-green-800">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="font-medium">Payment Successful!</span>
                  </div>
                  <p className="text-green-700 text-sm mt-1">
                    Your payment has been processed successfully.
                  </p>
                </div>
              )}

              {/* Payment Button */}
              <div className="pt-2">
                <button
                  onClick={handlePayment}
                  disabled={paymentLoading || paymentCompleted}
                  className={`w-full px-6 py-3 font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-2 ${
                    paymentCompleted
                      ? "bg-green-600 text-white cursor-not-allowed"
                      : paymentLoading
                      ? "bg-gray-600 text-white cursor-wait"
                      : "bg-black text-white hover:bg-gray-800"
                  }`}
                >
                  {paymentLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : paymentCompleted ? (
                    "Payment Completed ✓"
                  ) : (
                    `Pay ₹${roundoff} Now (Optional)`
                  )}
                </button>
              </div>

              {/* Payment Note */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-medium text-yellow-800 mb-1">Payment Information</h4>
                    <p className="text-sm text-yellow-700">
                      • Payment is optional. You can submit the application now and pay later at campus.<br/>
                      • If you pay now, your application will be processed faster.<br/>
                      • Course fee: <span className="font-bold">₹{totalAmount}</span>
                    </p>
                  </div>
                </div>
              </div>

              <p className="text-xs text-center text-gray-500">
                Secure payment powered by Razorpay
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}