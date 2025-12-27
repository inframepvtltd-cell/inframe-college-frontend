"use client";
import { useState } from "react";

export default function CheckoutForm({ onSubmit }: any) {
    const [form, setForm] = useState({
        name: "",
        email: "",
        contact: "",
    });

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl w-full max-w-md shadow-xl">
                <h2 className="text-2xl font-bold mb-4 text-center">Enter Your Details</h2>

                <input
                    name="name"
                    placeholder="Full Name"
                    className="w-full p-3 border rounded mb-3"
                    value={form.name}
                    onChange={handleChange}
                />

                <input
                    name="email"
                    placeholder="Email"
                    className="w-full p-3 border rounded mb-3"
                    value={form.email}
                    onChange={handleChange}
                />

                <input
                    name="contact"
                    placeholder="Phone Number"
                    className="w-full p-3 border rounded mb-3"
                    value={form.contact}
                    onChange={handleChange}
                />

                <button
                    onClick={() => onSubmit(form)}
                    className="w-full bg-yellow-500 text-black py-3 rounded font-bold hover:bg-yellow-400 transition"
                >
                    Continue to Payment
                </button>
            </div>
        </div>
    );
}
