import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import OrderConfirmationModal from "./orderConfirmation";
declare global {
  interface Window {
    Razorpay: any;
  }
}

interface QuickPaymentProps {
  price: string;
  courseName: string;
  className?: string;
}

interface UserDetails {
  name: string;
  email: string;
  contact: string;
  city: string;
  state: string;
}

function QuickPayment({ className, price, courseName }: QuickPaymentProps) {
  const router = useRouter();
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [enrollmentId, setEnrollmentId] = useState<string | null>(null);

  const [states, setStates] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [loadingCity, setLoadingCity] = useState(false);

  // Add new state for order confirmation
  const [showOrderConfirmation, setShowOrderConfirmation] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState<UserDetails>({
    name: "",
    email: "",
    contact: "",
    city: "",
    state: "",
  });

  const [loading, setLoading] = useState(false);
  const [razorpayLoaded, setRazorpayLoaded] = useState(false);
  const [orderDetails, setOrderDetails] = useState({
    subtotal: "0",
    tax: "0",
    total: "0",
  });

  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

  // Calculate order details
  useEffect(() => {
    const amount = parseFloat(price);

    setOrderDetails({
      subtotal: amount.toFixed(2),
      tax: "0.00",
      total: amount.toFixed(2),
    });
  }, [price]);

  // Load Razorpay script
  useEffect(() => {
    if (typeof window !== "undefined" && window.Razorpay) {
      setRazorpayLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => setRazorpayLoaded(true);
    script.onerror = () => {
      console.error("Failed to load Razorpay script");
      alert("Payment gateway failed to load. Please refresh.");
    };
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!showForm) return;

    const fetchStates = async () => {
      try {
        const res = await fetch(BASE_URL + "/city-state/states");
        const data = await res.json();
        setStates(data);
      } catch (err) {
        console.error("State fetch failed", err);
      }
    };

    fetchStates();
  }, [showForm]);

  useEffect(() => {
    if (!user.state) return;

    const fetchCities = async () => {
      setLoadingCity(true);
      try {
        const res = await fetch(BASE_URL + "/city-state/cities", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ state: user.state }),
        });

        const data = await res.json();
        setCities(data);
      } catch (err) {
        console.error("City fetch failed", err);
      } finally {
        setLoadingCity(false);
      }
    };

    fetchCities();
  }, [user.state]);

  // VALIDATION
  const validateForm = () => {
    if (!user.name.trim()) return alert("Enter your name"), false;
    if (!user.email.trim()) return alert("Enter your email"), false;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) return alert("Invalid email"), false;

    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(user.contact)) return alert("Invalid phone"), false;

    return true;
  };

  // const saveLeadDataSilently = async () => {
  //   try {
  //     await Promise.all([
  //       sendLeadEmail(),
  //       fetch("/api/add-to-sheet", {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           name: user.name,
  //           email: user.email,
  //           contact: user.contact,
  //           courseName,
  //           price,
  //         }),
  //       }),
  //       sendToPrivyr(),
  //       sendWhatsApp(user.contact, user.name, price, courseName),
  //     ]);
  //   } catch (err) {
  //     console.error("Lead save failed", err);
  //   }
  // };

  // Handle form submission to show order confirmation
  // const handleFormSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault();

  //   if (!validateForm()) return;

  //   // ✅ SAVE DATA IMMEDIATELY
  //   setShowForm(false);
  //   setShowOrderConfirmation(true);
  //   await saveLeadDataSilently();
  // };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    const res = await fetch(BASE_URL + "/enrollment/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: user.name,
        email: user.email,
        contact: user.contact,
        courseName,
        price,
        state: user.state,
        city: user.city,
      }),
    });

    const data = await res.json();

    if (!data.success) {
      alert("Failed to create enrollment");
      return;
    }

    setEnrollmentId(data.enrollmentId);
    setShowForm(false);
    setShowOrderConfirmation(true);
  };

  // Proceed to payment after order confirmation
  const handleProceedToPayment = async () => {
    if (!razorpayLoaded) {
      alert("Payment gateway loading...");
      return;
    }

    setLoading(true);

    try {
      const amountInPaisa = Math.round(Number(price) * 100);

      // ✅ CREATE ORDER ON BACKEND
      // const orderRes = await fetch("/api/order", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ amount: amountInPaisa }),
      // });

      const orderRes = await fetch(
        BASE_URL + "/payment/enrollment-create-order",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ enrollmentId }),
        },
      );

      const { orderId } = await orderRes.json();

      if (!orderId) {
        throw new Error("Order creation failed");
      }

      // RAZORPAY OPTIONS (WITH ORDER ID)
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: orderId,
        amount: amountInPaisa,
        currency: "INR",
        name: "Inframe College",
        description: `Course Payment: ${courseName}`,
        image: "/pixelcut-export4.png",

        handler: async function (response: any) {
          const verifyRes = await fetch(
            BASE_URL + "/payment/enrollment-verify",
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                enrollmentId,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              }),
            },
          );

          const verifyData = await verifyRes.json();

          if (!verifyData.success) {
            alert("Payment verification failed");
            return;
          }

          toast.success("Payment successful 🎉");
          router.push("/order-confirmation");
        },

        prefill: {
          name: user.name,
          email: user.email,
          contact: user.contact,
        },

        theme: { color: "#FACC15" },

        modal: {
          ondismiss: () => {
            // USER CANCELLED PAYMENT
            setLoading(false);

            toast.dismiss(); // close processing toast
            toast.info("Payment cancelled", {
              position: "top-center",
            });
          },
        },
      };

      const rzp = new (window as any).Razorpay(options);

      rzp.on("payment.failed", () => {
        toast.error("Payment failed");
        setLoading(false);
      });

      if ((window as any).fbq) {
        (window as any).fbq("track", "InitiateCheckout", {
          currency: "INR",
          value: Number(price),
          content_name: courseName,
        });
      }
      rzp.open();
    } catch (err) {
      console.error(err);
      alert("Payment failed to start");
      setLoading(false);
    }
  };

  // Submit data to backend APIs
  const submitUserData = async () => {
    const toastId = toast.loading(
      <div
        className={
          className
            ? "flex items-center gap-4"
            : "text-center flex flex-col items-center gap-4"
        }
      >
        <div className="relative h-12 w-12">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200"></div>
          <div className="absolute inset-0 rounded-full border-4 border-yellow-400 border-t-transparent animate-spin"></div>
        </div>

        <div className="space-y-1">
          <p className="font-semibold text-gray-900 text-lg">
            Processing your order
          </p>
          <p className="text-gray-600 text-sm">
            Please wait while we prepare your payment
          </p>
        </div>
      </div>,
      {
        position: "top-center",
        duration: Infinity,
        style: {
          minWidth: "360px",
          padding: "22px 26px",
          borderRadius: "18px",
          background: "#ffffff",
          boxShadow: "0 25px 70px rgba(0,0,0,0.18)",
        },
      },
    );

    try {
      // await Promise.all([
      //     sendLeadEmail(),
      //     fetch("/api/add-to-sheet", {
      //         method: "POST",
      //         headers: { "Content-Type": "application/json" },
      //         body: JSON.stringify({
      //             name: user.name,
      //             email: user.email,
      //             contact: user.contact,
      //             courseName,
      //             price,
      //         }),
      //     }),
      // ]);

      // ✅ Success toast
      toast.success(
        <div className="text-center space-y-1">
          <p className="font-bold text-lg text-green-800">🎉 Order Processed</p>
          <p className="text-gray-700 text-sm">Redirecting to secure payment</p>
        </div>,
        {
          id: toastId,
          duration: 2200,
          position: "top-center",
          style: {
            minWidth: "360px",
            padding: "22px 26px",
            borderRadius: "18px",
            background: "#ecfdf5",
            border: "2px solid #6ee7b7",
          },
        },
      );
      setPaymentSuccess(true);
      setTimeout(handleProceedToPayment, 2200);
    } catch (err) {
      // ❌ Error toast
      toast.error(
        <div className="text-center space-y-1">
          <p className="font-bold text-lg text-red-800">
            ⚠️ Order Processing Failed
          </p>
          <p className="text-gray-700 text-sm">
            Please try again or contact support
          </p>
        </div>,
        {
          id: toastId,
          duration: 4000,
          position: "top-center",
          style: {
            minWidth: "360px",
            padding: "22px 26px",
            borderRadius: "18px",
            background: "#fef2f2",
            border: "2px solid #fca5a5",
          },
        },
      );
    }
  };

  const handlePlaceOrder = () => {
    if (!enrollmentId) {
      alert("Enrollment not found");
      return;
    }

    submitUserData();
  };

  return (
    <>
      {/* Buy Now Button */}
      <div className="text-center">
        <button
          // onClick={() => setShowForm(true)}
          onClick={() => {
            if ((window as any).fbq) {
              (window as any).fbq("track", "AddToCart", {
                currency: "INR",
                value: Number(price),
                content_name: courseName,
              });
            }
            setShowForm(true);
          }}
          disabled={loading}
          className="relative overflow-hidden bg-gradient-to-r 
                            from-black via-gray-900 to-black text-white
                            px-6 py-3 sm:px-8 sm:py-4 
                            text-xl sm:text-3xl font-semibold border border-yellow-400 shadow-xl mb-0
                            hover:scale-[1.03] active:scale-95 transition-all duration-300
                            shine-btn"
        >
          {loading ? "Processing..." : `Enroll Now`}
        </button>
      </div>

      {/* User Details Form Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => !loading && setShowForm(false)}
          />

          <div className="relative bg-white p-6 rounded-xl shadow-xl w-full max-w-md animate-fadeIn">
            <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
              Enter Your Details
            </h2>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Full Name *"
                required
                className="w-full border p-3 rounded-lg"
                value={user.name}
                onChange={(e) => setUser({ ...user, name: e.target.value })}
                disabled={loading}
              />

              <input
                type="email"
                placeholder="Email *"
                required
                className="w-full border p-3 rounded-lg"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
                disabled={loading}
              />

              <input
                type="tel"
                placeholder="Phone Number (10 digits) *"
                required
                className="w-full border p-3 rounded-lg"
                value={user.contact}
                onChange={(e) =>
                  setUser({
                    ...user,
                    contact: e.target.value.replace(/\D/g, "").slice(0, 10),
                  })
                }
                disabled={loading}
              />

              <select
                required
                className="w-full border p-3 rounded-lg"
                value={user.state}
                onChange={(e) =>
                  setUser({ ...user, state: e.target.value, city: "" })
                }
              >
                <option value="">Select State *</option>
                {states.map((state) => (
                  <option key={state.id} value={state.name}>
                    {state.name}
                  </option>
                ))}
              </select>

              <select
                required
                className="w-full border p-3 rounded-lg"
                value={user.city}
                onChange={(e) => setUser({ ...user, city: e.target.value })}
                disabled={!user.state || loadingCity}
              >
                <option value="">
                  {loadingCity ? "Loading cities..." : "Select City *"}
                </option>

                {cities.map((city) => (
                  <option key={city.id} value={city.name}>
                    {city.name}
                  </option>
                ))}
              </select>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-500 text-black py-3 rounded-lg font-semibold hover:bg-yellow-600 transition-colors"
              >
                Review Order
              </button>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="w-full bg-gray-300 hover:bg-gray-400 py-2 rounded-lg transition-colors"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Order Confirmation Modal */}
      {showOrderConfirmation && (
        <OrderConfirmationModal
          open={showOrderConfirmation}
          loading={loading}
          courseName={courseName}
          price={price}
          orderDetails={orderDetails}
          paymentSuccess={paymentSuccess}
          user={user}
          onConfirm={handlePlaceOrder}
          onClose={() => setShowOrderConfirmation(false)}
        />
      )}
    </>
  );
}

export default QuickPayment;
