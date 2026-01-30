"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LoginForm from "./LoginForm";
import OTPVerification from "./OtpVerification";
import { sendLoginOtp, verifyLoginOtp } from "../api";
import {
  Shield,
  Lock,
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Mail,
  KeyRound,
} from "lucide-react";

export default function LoginPage() {
  const [step, setStep] = useState<"email" | "otp">("email");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSendOtp = async (email: string) => {
    try {
      setLoading(true);
      setError("");
      await sendLoginOtp({ email });
      setEmail(email);
      setStep("otp");
      setSuccess("OTP sent successfully! Check your email.");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err.message || "Failed to send OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (otp: string) => {
    try {
      setLoading(true);
      setError("");
      const response: any = await verifyLoginOtp({ email, otp });

      // Store token and user data
      localStorage.setItem("token", response.token);
      document.cookie = `token=${response.token}; path=/; max-age=86400;`;
      localStorage.setItem("user", JSON.stringify(response.user));

      // Show success message before redirect
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        router.push("/addmission-form");
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Invalid OTP. Please try again.");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    await handleSendOtp(email);
  };

  return (
    <div className="max-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-0">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Card Container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-2xl border border-gray-100 overflow-hidden">
          {/* Header Gradient Bar */}
          <div className="h-2 bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600"></div>

          <div className="p-8">
            {/* Brand Header */}
            <div className="text-center mb-8">
              <div className="flex flex-col items-center justify-center gap-3 mb-4">
                <div className="relative">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-800 rounded-xl flex items-center justify-center shadow-lg">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center border-2 border-white">
                    <Lock className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 bg-gradient-to-r from-blue-700 to-blue-900 bg-clip-text text-transparent">
                    INFRAME SCHOOL
                  </h1>
                  <p className="text-sm text-gray-500 mt-1 font-medium">
                    Admissions Portal
                  </p>
                </div>
              </div>

              {/* Step Indicator */}
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${step === "email" ? "bg-blue-600 text-white" : "bg-green-500 text-white"}`}
                  >
                    {step === "email" ? (
                      <Mail className="w-4 h-4" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5" />
                    )}
                  </div>
                  <div
                    className={`w-16 h-1 ${step === "email" ? "bg-gray-200" : "bg-green-500"}`}
                  ></div>
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full ${step === "email" ? "bg-gray-100 text-gray-400" : "bg-blue-600 text-white"}`}
                  >
                    {step === "otp" ? (
                      <KeyRound className="w-4 h-4" />
                    ) : (
                      <KeyRound className="w-4 h-4 text-gray-400" />
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-gray-800">
                  {step === "email" ? "Welcome Back" : "Verify Your Identity"}
                </h2>
                <p className="text-gray-600 text-sm">
                  {step === "email"
                    ? "Enter your registered email to continue"
                    : `Enter the 6-digit code sent to ${email}`}
                </p>
              </div>
            </div>

            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl animate-fadeIn">
                <p className="text-green-700 text-sm flex items-center">
                  <CheckCircle2 className="w-4 h-4 mr-2 flex-shrink-0" />
                  {success}
                </p>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl animate-fadeIn">
                <p className="text-red-700 text-sm flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 flex-shrink-0" />
                  {error}
                </p>
              </div>
            )}

            {/* Back Button for OTP Step */}
            {step === "otp" && (
              <button
                onClick={() => {
                  setStep("email");
                  setError("");
                }}
                className="mb-6 flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors group"
              >
                <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
                Back to email entry
              </button>
            )}

            {/* Form Components */}
            <div className="mb-8">
              {step === "email" ? (
                <LoginForm onSendOtp={handleSendOtp} loading={loading} />
              ) : (
                <OTPVerification
                  email={email}
                  onVerifyOtp={handleVerifyOtp}
                  onResendOtp={handleResendOtp}
                  loading={loading}
                  onBack={() => setStep("email")}
                />
              )}
            </div>

            {/* Security Note */}
            <div className="mb-2 p-2 bg-blue-50 border border-blue-100 rounded-xl">
              <div className="flex items-start">
                <Shield className="w-5 h-5 text-blue-600 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-blue-800 mb-1">
                    Secure Login
                  </p>
                  <p className="text-xs text-blue-600">
                    Your information is protected with bank-level encryption.
                    OTP codes expire in 10 minutes.
                  </p>
                </div>
              </div>
            </div>

            {/* Signup Link */}
            <div className="text-center mb-2">
              <p className="text-sm text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  href="/auth/signup"
                  className="font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                >
                  Create admission account
                </Link>
              </p>
            </div>

            {/* Help Text */}
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Need help?{" "}
                <a
                  href="/contact-us"
                  className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
                >
                  Contact Support
                </a>
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 bg-gray-50/80 p-2">
            <div className="text-center space-y-3">
              {/* <div className="flex items-center justify-center gap-4">  
                <span className="text-gray-300">•</span>
              </div> */}
              <p className="text-xs text-gray-500">
                © {new Date().getFullYear()} INFRAME SCHOOL. All rights
                reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Loading Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white/80 backdrop-blur-sm rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-700 font-medium">
                {step === "email" ? "Sending OTP..." : "Verifying..."}
              </p>
              <p className="text-gray-500 text-sm mt-2">Please wait a moment</p>
            </div>
          </div>
        )}
      </div>

      {/* Add these animations to your globals.css */}
      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
