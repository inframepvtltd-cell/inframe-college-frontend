import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

declare global {
    interface Window {
        Razorpay: any;
    }
}

interface QuickPaymentProps {
    price: string;
    courseName: string;
}

interface UserDetails {
    name: string;
    email: string;
    contact: string;
}

function QuickPayment({ price, courseName }: QuickPaymentProps) {
    const router = useRouter();

    const [showForm, setShowForm] = useState(false);
    const [user, setUser] = useState<UserDetails>({
        name: "",
        email: "",
        contact: "",
    });

    const [loading, setLoading] = useState(false);
    const [razorpayLoaded, setRazorpayLoaded] = useState(false);

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

    // ✅ FIXED — Correct email API call
    const sendLeadEmail = async () => {
        try {
            const res = await fetch("/api/send-payment-intent-email", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    contact: user.contact,
                    price,
                    courseName,
                }),
            });

            const data = await res.json();
            console.log("Email Status:", data);
        } catch (err) {
            console.log("Email Error", err);
        }
    };

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

    // RAZORPAY PAYMENT
    const handleBuyNow = async () => {
        if (!validateForm()) return;

        if (!razorpayLoaded)
            return alert("Payment gateway loading... try again.");

        setLoading(true);

        try {
            const amountInPaisa = Math.round(parseFloat(price) * 100);

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: amountInPaisa,
                currency: "INR",
                name: "Inframe College",
                description: "Course Payment",
                image: "/pixelcut-export4.png",

                handler: function (response: any) {
                    alert("Payment Successful!");
                    router.push("/order-confirmation");
                },

                prefill: {
                    name: user.name,
                    email: user.email,
                    contact: user.contact,
                },
                theme: { color: "#FACC15" },
            };

            const rzp = new window.Razorpay(options);

            rzp.on("payment.failed", function (response: any) {
                alert("Payment Failed");
                setLoading(false);
            });

            rzp.open();
        } catch (error: any) {
            console.error("Payment init error:", error);
            alert("Payment failed to start");
            setLoading(false);
        }
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1️⃣ Send data to admin email
        await sendLeadEmail();

        // 2️⃣ Insert data into Google Sheet
        try {
            await fetch("/api/add-to-sheet", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: user.name,
                    email: user.email,
                    contact: user.contact,
                    courseName,
                    price,
                }),
            });
            console.log("Data added to Google Sheet successfully");
        } catch (err) {
            console.error("Failed to insert data into Google Sheet", err);
        }

        // 3️⃣ Then proceed to Razorpay payment
        handleBuyNow();
    };


    // FORM SUBMIT = email → payment
    // const handleFormSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();

    //     // 1️⃣ Send email through Next.js route
    //     await sendLeadEmail();

    //     // 2️⃣ Then start Razorpay
    //     handleBuyNow();
    // };

    return (
        <>
            {/* Buy Now Button */}
            <div className="text-center">
                <button
                    onClick={() => setShowForm(true)}
                    disabled={loading}
                    className="relative overflow-hidden bg-gradient-to-r 
          from-black via-gray-900 to-black text-white
          px-6 py-3 sm:px-8 sm:py-4 
          text-xl sm:text-4xl font-semibold border border-yellow-400 shadow-xl mb-4
          hover:scale-[1.03] active:scale-95 transition-all duration-300
          shine-btn"
                >
                    {loading ? "Processing..." : "Buy Now"}
                </button>
            </div>

            {/* Modal */}
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

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-yellow-500 text-black py-3 rounded-lg font-semibold"
                            >
                                {loading ? "Processing..." : `Proceed to Pay ₹${price}`}
                            </button>

                            <button
                                type="button"
                                onClick={() => setShowForm(false)}
                                className="w-full bg-gray-300 py-2 rounded-lg"
                            >
                                Cancel
                            </button>
                        </form>

                        {!razorpayLoaded && (
                            <p className="mt-4 text-center text-sm text-yellow-700">
                                Loading payment gateway...
                            </p>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}

export default QuickPayment;



// import React, { useState, useEffect } from 'react'
// import { useRouter } from "next/navigation";

// declare global {
//   interface Window {
//     Razorpay: any;
//   }
// }

// interface QuickPaymentProps {
//   price: string;
//   courseName: string;
// }

// interface UserDetails {
//   name: string;
//   email: string;
//   contact: string;
// }

// function QuickPayment({ price, courseName }: QuickPaymentProps) {
//     const router = useRouter();

//     const sendLeadEmail = async () => {
//   try {
//     const res = await fetch("/api/send-payment-intent-email", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         name,
//         email,
//         contact,
//         price,
//         courseName,
//       }),
//     });

//     const data = await res.json();
//     console.log("Email Status:", data);
//   } catch (err) {
//     console.log("Email Error", err);
//   }
// };


//     const [showForm, setShowForm] = useState(false);
//     const [user, setUser] = useState<UserDetails>({
//         name: "",
//         email: "",
//         contact: "",
//     });

//     const [loading, setLoading] = useState(false);
//     const [razorpayLoaded, setRazorpayLoaded] = useState(false);

//     // Check if Razorpay is loaded
//     useEffect(() => {
//         if (typeof window !== 'undefined' && window.Razorpay) {
//             setRazorpayLoaded(true);
//             return;
//         }

//         // Load Razorpay script dynamically
//         const loadRazorpay = () => {
//             const script = document.createElement('script');
//             script.src = 'https://checkout.razorpay.com/v1/checkout.js';
//             script.async = true;
//             script.onload = () => setRazorpayLoaded(true);
//             script.onerror = () => {
//                 console.error('Failed to load Razorpay script');
//                 alert('Payment gateway failed to load. Please refresh the page.');
//             };
//             document.body.appendChild(script);
//         };

//         loadRazorpay();

//         return () => {
//             // Cleanup if needed
//         };
//     }, []);

//     const validateForm = () => {
//         if (!user.name.trim()) {
//             alert("Please enter your full name");
//             return false;
//         }

//         if (!user.email.trim()) {
//             alert("Please enter your email");
//             return false;
//         }

//         // Basic email validation
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(user.email)) {
//             alert("Please enter a valid email address");
//             return false;
//         }

//         if (!user.contact.trim()) {
//             alert("Please enter your phone number");
//             return false;
//         }

//         // Basic phone number validation (10 digits)
//         const phoneRegex = /^\d{10}$/;
//         if (!phoneRegex.test(user.contact.replace(/\D/g, ''))) {
//             alert("Please enter a valid 10-digit phone number");
//             return false;
//         }

//         return true;
//     };

//     const handleBuyNow = async () => {
//         // Validate form
//         if (!validateForm()) {
//             return;
//         }

//         // Check if Razorpay is loaded
//         if (!razorpayLoaded) {
//             alert("Payment gateway is loading. Please try again in a moment.");
//             return;
//         }

//         setLoading(true);

//         try {
//             // Convert price to paisa (smallest currency unit for INR)
//             const amountInPaisa = Math.round(parseFloat(price) * 100);

//             // Validate amount
//             if (isNaN(amountInPaisa) || amountInPaisa <= 0) {
//                 throw new Error("Invalid price amount");
//             }

//             const options = {
//                 key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
//                 amount: amountInPaisa,
//                 currency: "INR",
//                 name: "Inframe College",
//                 description: "Interior Design Course Enrollment",
//                 image: "/pixelcut-export4.png",
//                 handler: function (response: any) {
//                     console.log("Payment successful:", response);
//                     alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
//                     router.push("/order-confirmation");
//                 },
//                 prefill: {
//                     name: user.name,
//                     email: user.email,
//                     contact: user.contact,
//                 },
//                 notes: {
//                     course: "Interior Design",
//                     student_name: user.name,
//                     student_email: user.email,
//                 },
//                 theme: {
//                     color: "#FACC15",
//                 },
//                 modal: {
//                     ondismiss: function () {
//                         console.log("Payment modal closed");
//                         setLoading(false);
//                     },
//                     escape: true,
//                     backdropclose: false
//                 },
//                 payment_method: {
//                     upi: true,
//                     card: true,
//                     netbanking: true,
//                     wallet: true,
//                 },
//             };

//             // Create and open Razorpay checkout
//             const rzp = new window.Razorpay(options);

//             rzp.on('payment.failed', function (response: any) {
//                 console.error("Payment failed:", response.error);
//                 alert(`Payment failed: ${response.error.description || "Unknown error"}`);
//                 setLoading(false);
//             });

//             rzp.open();

//         } catch (error: any) {
//             console.error("Payment initialization error:", error);
//             alert(`Payment failed to initialize: ${error.message || "Unknown error"}`);
//             setLoading(false);
//         }
//     };

//     const handleFormSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     console.log(user);

//     // 1️⃣ Send data to backend email API
//     await fetch("http://localhost:5500/api/v1/send-payment-intent-email", {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             name: user.name,
//             email: user.email,
//             contact: user.contact,
//             price: price,
//             courseName: courseName
//         })
//     });

//     // 2️⃣ Then proceed to Razorpay payment
//     handleBuyNow();
// };

//     return (
//         <>
//             {/* Buy Now Button */}
//             <div className="text-center">
//                 <button
//                     onClick={() => setShowForm(true)}
//                     disabled={loading}
//                     className={`relative overflow-hidden bg-gradient-to-r
//                     from-black via-gray-900 to-black text-white
//                     px-6 py-3 sm:px-8 sm:py-4
//                     text-xl sm:text-4xl font-semibold border border-yellow-400 shadow-xl mb-4
//                     hover:scale-[1.03] active:scale-95 transition-all duration-300
//                     shine-btn
//                     ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
//                 >
//                     {loading ? 'Processing...' : 'Buy Now'}
//                 </button>
//             </div>


//             {/* Fixed Modal */}
//             {showForm && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//                     {/* Backdrop */}
//                     <div
//                         className="fixed inset-0 bg-black/60 backdrop-blur-sm"
//                         onClick={() => !loading && setShowForm(false)}
//                     />

//                     {/* Modal Content */}
//                     <div className="relative bg-white p-6 rounded-xl shadow-xl w-full max-w-md animate-fadeIn">
//                         <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">
//                             Enter Your Details
//                         </h2>

//                         <form onSubmit={handleFormSubmit} className="space-y-4">
//                             <div>
//                                 <input
//                                     type="text"
//                                     placeholder="Full Name *"
//                                     required
//                                     className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition"
//                                     value={user.name}
//                                     onChange={(e) => setUser({ ...user, name: e.target.value })}
//                                     disabled={loading}
//                                 />
//                             </div>

//                             <div>
//                                 <input
//                                     type="email"
//                                     placeholder="Email *"
//                                     required
//                                     className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition"
//                                     value={user.email}
//                                     onChange={(e) => setUser({ ...user, email: e.target.value })}
//                                     disabled={loading}
//                                 />
//                             </div>

//                             <div>
//                                 <input
//                                     type="tel"
//                                     placeholder="Phone Number (10 digits) *"
//                                     required
//                                     pattern="[0-9]{10}"
//                                     className="w-full border border-gray-300 p-3 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition"
//                                     value={user.contact}
//                                     onChange={(e) => {
//                                         const value = e.target.value.replace(/\D/g, '').slice(0, 10);
//                                         setUser({ ...user, contact: value });
//                                     }}
//                                     disabled={loading}
//                                 />
//                                 <p className="text-xs text-gray-500 mt-1">Enter 10-digit number only</p>
//                             </div>

//                             <div className="pt-2 space-y-3">
//                                 <button
//                                     type="submit"
//                                     disabled={loading || !razorpayLoaded}
//                                     className={`w-full bg-yellow-500 text-black font-semibold py-3 rounded-lg
//                                         hover:bg-yellow-400 transition disabled:opacity-50 disabled:cursor-not-allowed
//                                         ${loading ? 'animate-pulse' : ''}`}
//                                 >
//                                     {loading ? 'Processing...' : `Proceed to Pay ₹${price}`}
//                                 </button>

//                                 <button
//                                     type="button"
//                                     onClick={() => setShowForm(false)}
//                                     disabled={loading}
//                                     className="w-full bg-gray-200 text-gray-800 font-medium py-3 rounded-lg
//                                         hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </form>

//                         {!razorpayLoaded && (
//                             <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
//                                 <p className="text-sm text-yellow-800 text-center">
//                                     Loading payment gateway...
//                                 </p>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             )}
//         </>
//     )
// }

// export default QuickPayment;

//         // <div className="text-center">

//         //     <button
//         //         onClick={handleBuyNow}
//         //         className="relative bg-gradient-to-r from-black via-gray-900 to-black text-white
//         //                     px-6 py-3 sm:px-8 sm:py-4 rounded-lg
//         //                     text-lg sm:text-3xl font-semibold border border-yellow-400 shadow-xl mb-4
//         //                     hover:scale-[1.03] active:scale-95 transition-all duration-300
//         //                     hover:shadow-yellow-400/40 overflow-hidden group"
//         //     >
//         //         {/* Text + Icon */}
//         //         <span className="relative z-20 flex items-center justify-center">
//         //             Buy Now
//         //             <svg
//         //                 className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300"
//         //                 fill="none"
//         //                 stroke="currentColor"
//         //                 viewBox="0 0 24 24"
//         //             >
//         //                 <path
//         //                     strokeLinecap="round"
//         //                     strokeLinejoin="round"
//         //                     strokeWidth="2"
//         //                     d="M13 7l5 5m0 0l-5 5m5-5H6"
//         //                 ></path>
//         //             </svg>
//         //         </span>

//         //         {/* Shine Effect */}
//         //         <div className="absolute inset-0 z-10 overflow-hidden pointer-events-none rounded-lg">
//         //             <div
//         //                 className="absolute top-0 left-[-120%] h-full w-1/3
//         //     bg-gradient-to-r from-transparent via-white/30 to-transparent
//         //     transform -skew-x-12 animate-shine"
//         //             ></div>
//         //         </div>

//         //         {/* Soft Glow */}
//         //         <div className="absolute inset-0 rounded-lg bg-yellow-400/10 opacity-10
//         // group-hover:opacity-25 transition duration-300 z-0">
//         //         </div>
//         //     </button>

//         // </div>