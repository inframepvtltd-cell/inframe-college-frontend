"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  Shield,
  GraduationCap,
  BookOpen,
  Loader2,
  XCircle,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { signupApi } from "../api";

interface SignupForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  password?: string;
}

export default function SignupPage() {
  const [form, setForm] = useState<SignupForm>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [errors, setErrors] = useState<FormErrors>({});

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!form.firstName.trim()) newErrors.firstName = "First name is required";
    if (!form.lastName.trim()) newErrors.lastName = "Last name is required";

    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!form.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(form.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid phone number";
    }

    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(form.password)) {
      newErrors.password = "Include uppercase, lowercase & number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    // Clear error for this field when user types
    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: undefined });
    }
    setError(null);
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    const formatted =
      value.length > 10
        ? `+${value.slice(0, 2)} ${value.slice(2, 7)} ${value.slice(7, 12)}`
        : value.length > 5
          ? `${value.slice(0, 5)} ${value.slice(5)}`
          : value;

    setForm({ ...form, phone: formatted });
    if (errors.phone) {
      setErrors({ ...errors, phone: undefined });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setError("Please fix the errors below");
      return;
    }

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await signupApi(form);

      if (res.success) {
        setSuccess("Account created successfully! Redirecting to login...");
        setForm({
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          password: "",
        });

        setTimeout(() => {
          window.location.href = "/auth/login";
        }, 1500);
      }
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        setError(
          err.response?.data?.message || "Signup failed. Please try again.",
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const passwordStrength = () => {
    if (!form.password) return 0;
    let strength = 0;
    if (form.password.length >= 8) strength += 25;
    if (/[a-z]/.test(form.password)) strength += 25;
    if (/[A-Z]/.test(form.password)) strength += 25;
    if (/\d/.test(form.password)) strength += 25;
    return strength;
  };

  const getStrengthColor = (strength: number) => {
    if (strength < 50) return "bg-red-500";
    if (strength < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  INFRAME SCHOOL
                </h1>
                <p className="text-sm text-gray-500">
                  Admission Registration Portal
                </p>
              </div>
            </div>
            <h2 className="text-xl font-semibold text-gray-800">
              Create Your Student Account
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Join our community of future innovators
            </p>
          </div>

          {/* Main Form Card */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 lg:p-8">
            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl">
                <div className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <div>
                    <p className="font-medium text-green-800">{success}</p>
                    <p className="text-sm text-green-600 mt-1">
                      Welcome to Inframe School community
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* First Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    First Name
                  </label>
                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <User className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500" />
                    </div>
                    <input
                      name="firstName"
                      value={form.firstName}
                      onChange={handleChange}
                      placeholder="Enter your first name"
                      className={`w-full pl-11 pr-4 py-3 rounded-lg border ${
                        errors.firstName
                          ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                          : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      } focus:outline-none transition-all duration-200`}
                      disabled={loading}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-sm text-red-600">{errors.firstName}</p>
                  )}
                </div>

                {/* Last Name */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700">
                    Last Name
                  </label>
                  <div className="relative group">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2">
                      <User className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500" />
                    </div>
                    <input
                      name="lastName"
                      value={form.lastName}
                      onChange={handleChange}
                      placeholder="Enter your last name"
                      className={`w-full pl-11 pr-4 py-3 rounded-lg border ${
                        errors.lastName
                          ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                          : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                      } focus:outline-none transition-all duration-200`}
                      disabled={loading}
                    />
                  </div>
                  {errors.lastName && (
                    <p className="text-sm text-red-600">{errors.lastName}</p>
                  )}
                </div>
              </div>

             
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Mail className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500" />
                  </div>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="student@inframe.edu"
                    className={`w-full pl-11 pr-4 py-3 rounded-lg border ${
                      errors.email
                        ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                        : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    } focus:outline-none transition-all duration-200`}
                    disabled={loading}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Phone className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500" />
                  </div>
                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handlePhoneChange}
                    placeholder="+91 "
                    className={`w-full pl-11 pr-4 py-3 rounded-lg border ${
                      errors.phone
                        ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                        : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    } focus:outline-none transition-all duration-200`}
                    disabled={loading}
                  />
                </div>
                {errors.phone && (
                  <p className="text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Lock className="w-5 h-5 text-gray-400 group-focus-within:text-blue-500" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Create a strong password"
                    className={`w-full pl-11 pr-11 py-3 rounded-lg border ${
                      errors.password
                        ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20"
                        : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    } focus:outline-none transition-all duration-200`}
                    disabled={loading}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    disabled={loading}
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>

                {/* Password Strength Meter */}
                {form.password && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-500">Password strength</span>
                      <span
                        className={`font-medium ${
                          passwordStrength() < 50
                            ? "text-red-500"
                            : passwordStrength() < 75
                              ? "text-yellow-500"
                              : "text-green-500"
                        }`}
                      >
                        {passwordStrength() < 50
                          ? "Weak"
                          : passwordStrength() < 75
                            ? "Medium"
                            : "Strong"}
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getStrengthColor(passwordStrength())} transition-all duration-300`}
                        style={{ width: `${passwordStrength()}%` }}
                      />
                    </div>
                  </div>
                )}

                {/* Password Requirements */}
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-500 mt-2">
                  <div className="flex items-center gap-1">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        form.password.length >= 8
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    />
                    <span>At least 8 characters</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        /[a-z]/.test(form.password)
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    />
                    <span>Lowercase letter</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        /[A-Z]/.test(form.password)
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    />
                    <span>Uppercase letter</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div
                      className={`w-1.5 h-1.5 rounded-full ${
                        /\d/.test(form.password)
                          ? "bg-green-500"
                          : "bg-gray-300"
                      }`}
                    />
                    <span>Number (0-9)</span>
                  </div>
                </div>

                {errors.password && (
                  <p className="text-sm text-red-600 mt-1">{errors.password}</p>
                )}
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                  <div className="flex items-center gap-2">
                    <XCircle className="w-5 h-5 text-red-500" />
                    <p className="text-red-600">{error}</p>
                  </div>
                </div>
              )}

              {/* Terms and Conditions */}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 active:scale-[0.99] transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Creating Your Account...
                  </>
                ) : (
                  <>
                    Create Student Account
                    <ChevronRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Login Link */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/auth/login"
                  className="font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                >
                  Sign in to your account
                </Link>
              </p>
            </div>
          </div>

          {/* Security Info */}
          <div className="mt-6 flex items-center justify-center gap-3 text-xs text-gray-500">
            <Shield className="w-4 h-4 text-green-500" />
            <span>256-bit SSL Encryption</span>
            <span className="text-gray-300">•</span>
            <span>GDPR Compliant</span>
            <span className="text-gray-300">•</span>
            <span>Secure Data Storage</span>
          </div>
        </div>
      </div>

      {/* Right Side - Info Panel */}
    </div>
  );
}
