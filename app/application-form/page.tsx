"use client"

import { useState, useEffect } from 'react'
// import Button from '@/components/ui/Button'
import { AlertCircle, Loader2, CheckCircle, XCircle, Tag, Shield, CreditCard, Smartphone, Ban, Lock } from 'lucide-react'
import {
  FaExclamationCircle,
  FaSpinner,
  FaCheckCircle,
  FaTimesCircle,
  FaTag,
  FaShieldAlt,
  FaCreditCard,
  FaMobileAlt,
  FaUniversity,
  FaLock
} from "react-icons/fa";

// Define TypeScript interfaces for better type safety
interface RazorpayResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  handler: (response: RazorpayResponse) => void;
  prefill: {
    name?: string;
    email?: string;
    contact?: string;
  };
  notes?: Record<string, string>;
  theme: {
    color: string;
  };
  modal?: {
    ondismiss: () => void;
    escape: boolean;
    animation: boolean;
  };
}

interface RazorpayErrorResponse {
  error: {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: Record<string, unknown>;
  }
}

// Static data for demonstration
const STATIC_APPLICATION_DATA = {
  personalInfo: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+91 9876543210",
    dateOfBirth: "1995-05-15",
    gender: "Male",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400001",
    permanentAddress: "123 Main Street, Mumbai",
  },
  programSelection: {
    programType: "btech",
    programName: "Bachelor of Technology",
    specialization: "Computer Science and Engineering",
    campus: "mumbai-campus"
  }
}

const STATIC_FEE_STRUCTURE = {
  applicationFee: 1000,
  totalCourseFee: 50000,
  couponCodes: [
    { code: "WELCOME100", discountValue: 100, discountType: "fixed", isActive: true, description: "Get ₹100 off on your first payment" },
    { code: "EARLYBIRD500", discountValue: 500, discountType: "fixed", isActive: true, description: "Early bird discount ₹500" },
    { code: "STUDENT10", discountValue: 10, discountType: "percentage", isActive: true, description: "10% off for students" }
  ]
}

export default function PaymentForm() {
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [scriptLoaded, setScriptLoaded] = useState(false)
  const [paymentOption, setPaymentOption] = useState<'application' | 'course' | 'custom'>('application')
  const [customAmount, setCustomAmount] = useState('')
  const [customAmountError, setCustomAmountError] = useState('')
  const [couponCode, setCouponCode] = useState('')
  const [couponResult, setCouponResult] = useState<{
    isValid: boolean
    discountAmount: number
    finalAmount: number
    coupon?: any
    error?: string
  } | null>(null)
  const [isValidatingCoupon, setIsValidatingCoupon] = useState(false)
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('card')

  const personalInfo = STATIC_APPLICATION_DATA.personalInfo
  const programSelection = STATIC_APPLICATION_DATA.programSelection
  const feeStructure = STATIC_FEE_STRUCTURE

  // Calculate fees based on static data and payment option
  const getFees = () => {
    const baseAmount = paymentOption === 'course' ? 
      feeStructure.totalCourseFee + feeStructure.applicationFee : 
      paymentOption === 'custom' && customAmount ? 
        parseFloat(customAmount) : 
        feeStructure.applicationFee

    const amountAfterCoupon = couponResult?.finalAmount || baseAmount

    return {
      applicationFee: feeStructure.applicationFee,
      totalCourseFee: feeStructure.totalCourseFee,
      totalFee: baseAmount,
      actualPaymentAmount: baseAmount,
      remainingAmount: paymentOption === 'custom' && customAmount ? 
        (feeStructure.totalCourseFee + feeStructure.applicationFee) - parseFloat(customAmount) :
        paymentOption === 'course' ? 0 : feeStructure.totalCourseFee,
      courseName: programSelection.programName,
      courseDuration: "4 Years",
      paymentOption: paymentOption,
      discountAmount: couponResult?.discountAmount || 0,
      finalAmount: amountAfterCoupon
    }
  }

  const fees = getFees()

  useEffect(() => {
    if (error) setError(null);
    
    // Simulate script loading for demo
    const timer = setTimeout(() => {
      setScriptLoaded(true)
    }, 1500)

    return () => clearTimeout(timer)
  }, [error])

  const validateCustomPayment = (): boolean => {
    if (paymentOption !== 'custom') return true

    setCustomAmountError('')

    if (!customAmount.trim()) {
      setCustomAmountError('Please enter a payment amount')
      return false
    }

    const amount = parseFloat(customAmount)
    if (isNaN(amount) || amount <= 0) {
      setCustomAmountError('Please enter a valid amount')
      return false
    }

    const totalAmount = fees.totalCourseFee + fees.applicationFee
    if (amount > totalAmount) {
      setCustomAmountError(`Amount cannot exceed total amount of ₹${totalAmount.toLocaleString('en-IN')}`)
      return false
    }

    const minAmount = 100
    if (amount < minAmount) {
      setCustomAmountError(`Minimum payment amount is ₹${minAmount.toLocaleString('en-IN')}`)
      return false
    }

    return true
  }

  const handlePaymentOptionChange = (option: 'application' | 'course' | 'custom') => {
    setPaymentOption(option)
    if (option !== 'custom') {
      setCustomAmount('')
      setCustomAmountError('')
    }
  }

  const handleCouponValidation = async () => {
    if (!couponCode.trim()) {
      setCouponResult({
        isValid: false,
        discountAmount: 0,
        finalAmount: fees.actualPaymentAmount,
        error: 'Please enter a coupon code'
      })
      return
    }

    setIsValidatingCoupon(true)
    
    // Simulate API call delay
    setTimeout(() => {
      const coupon = feeStructure.couponCodes.find(c => c.code === couponCode.trim().toUpperCase())
      
      if (coupon) {
        const discountAmount = coupon.discountType === 'percentage' 
          ? (fees.actualPaymentAmount * coupon.discountValue) / 100
          : coupon.discountValue
        
        const finalAmount = Math.max(0, fees.actualPaymentAmount - discountAmount)
        
        setCouponResult({
          isValid: true,
          discountAmount,
          finalAmount,
          coupon
        })
      } else {
        setCouponResult({
          isValid: false,
          discountAmount: 0,
          finalAmount: fees.actualPaymentAmount,
          error: 'Invalid coupon code'
        })
      }
      
      setIsValidatingCoupon(false)
    }, 800)
  }

  const handleRemoveCoupon = () => {
    setCouponCode('')
    setCouponResult(null)
  }

  const handleProceedToPayment = async () => {
    if (isProcessing) return

    if (!scriptLoaded) {
      setError("Payment system is still loading. Please try again in a moment.")
      return
    }

    if (!validateCustomPayment()) {
      return
    }

    setIsProcessing(true)
    setError(null)

    // For demo purposes, simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      alert(`Demo Payment: ₹${fees.finalAmount.toLocaleString('en-IN')}\n\nThis is a demo. In a real application, Razorpay payment modal would open here.`)
    }, 1500)
  }

  const paymentInstructions = [
    paymentOption === 'custom'
      ? "Custom payment: Remaining course fee must be paid before commencement."
      : paymentOption === 'course'
        ? "Complete course fee payment including application fee."
        : "Application fee only. Course fees collected separately.",
    "All payments are non-refundable after course commencement.",
    "Ensure details are correct before proceeding.",
    "Confirmation email will be sent after successful payment.",
    "Do not refresh or close during payment processing."
  ]

  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'upi', name: 'UPI', icon: <Smartphone className="w-4 h-4" /> },
    // { id: 'netbanking', name: 'Net Banking', icon: <Bank className="w-4 h-4" /> },
    { id: 'wallet', name: 'Wallet', icon: <FaLock className="w-4 h-4" /> }
  ]

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl mb-4">
          <FaLock className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Secure Payment</h1>
        <p className="text-gray-600 text-lg">Complete your application with secure payment</p>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mt-4 rounded-full"></div>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-red-500 mr-3" />
            <p className="text-red-700 font-medium">{error}</p>
          </div>
        </div>
      )}

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Left Column - Order Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Application Summary Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">Application Summary</h2>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Details */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Personal Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Full Name</p>
                      <p className="font-medium text-gray-900">{personalInfo.firstName} {personalInfo.lastName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Email</p>
                      <p className="font-medium text-gray-900">{personalInfo.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="font-medium text-gray-900">{personalInfo.phone}</p>
                    </div>
                  </div>
                </div>

                {/* Program Details */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Program Details</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-xs text-gray-500">Program</p>
                      <p className="font-medium text-gray-900">{programSelection.programName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Specialization</p>
                      <p className="font-medium text-gray-900">{programSelection.specialization}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Duration</p>
                      <p className="font-medium text-gray-900">4 Years</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Campus</p>
                      <p className="font-medium text-gray-900">Mumbai Campus</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Options Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b">
              <h2 className="text-xl font-bold text-gray-900">Select Payment Option</h2>
            </div>
            <div className="p-6">
              <div className="grid md:grid-cols-3 gap-4 mb-6">
                <button
                  onClick={() => handlePaymentOptionChange('application')}
                  className={`p-4 rounded-lg border-2 transition-all ${paymentOption === 'application' 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${paymentOption === 'application' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      <span className={`text-lg font-bold ${paymentOption === 'application' ? 'text-blue-600' : 'text-gray-500'}`}>₹</span>
                    </div>
                    <p className="font-medium text-gray-900 mb-1">Application Fee</p>
                    <p className="text-sm text-gray-600">₹{feeStructure.applicationFee.toLocaleString('en-IN')}</p>
                  </div>
                </button>

                <button
                  onClick={() => handlePaymentOptionChange('course')}
                  className={`p-4 rounded-lg border-2 transition-all ${paymentOption === 'course' 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${paymentOption === 'course' ? 'bg-green-100' : 'bg-gray-100'}`}>
                      <span className={`text-lg font-bold ${paymentOption === 'course' ? 'text-green-600' : 'text-gray-500'}`}>₹</span>
                    </div>
                    <p className="font-medium text-gray-900 mb-1">Full Course</p>
                    <p className="text-sm text-gray-600">₹{(feeStructure.totalCourseFee + feeStructure.applicationFee).toLocaleString('en-IN')}</p>
                  </div>
                </button>

                <button
                  onClick={() => handlePaymentOptionChange('custom')}
                  className={`p-4 rounded-lg border-2 transition-all ${paymentOption === 'custom' 
                    ? 'border-purple-500 bg-purple-50' 
                    : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <div className="text-center">
                    <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center ${paymentOption === 'custom' ? 'bg-purple-100' : 'bg-gray-100'}`}>
                      <span className={`text-lg font-bold ${paymentOption === 'custom' ? 'text-purple-600' : 'text-gray-500'}`}>₹</span>
                    </div>
                    <p className="font-medium text-gray-900 mb-1">Custom Amount</p>
                    <p className="text-sm text-gray-600">Enter any amount</p>
                  </div>
                </button>
              </div>

              {paymentOption === 'custom' && (
                <div className="mb-6">
                  <label htmlFor="customAmount" className="block text-sm font-medium text-gray-700 mb-2">
                    Enter Custom Amount
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg">₹</span>
                    <input
                      type="number"
                      id="customAmount"
                      value={customAmount}
                      onChange={(e) => setCustomAmount(e.target.value)}
                      placeholder="Enter amount between ₹100 and ₹51,000"
                      min="100"
                      max={feeStructure.totalCourseFee + feeStructure.applicationFee}
                      className={`pl-10 pr-4 py-3 w-full border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${customAmountError ? 'border-red-500' : 'border-gray-300'}`}
                    />
                  </div>
                  {customAmountError && (
                    <p className="mt-2 text-sm text-red-600">{customAmountError}</p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Coupon Section */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl border border-green-200 shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-green-200">
              <div className="flex items-center">
                <Tag className="w-5 h-5 text-green-600 mr-2" />
                <h2 className="text-lg font-bold text-gray-900">Apply Coupon Code</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="flex gap-3 mb-4">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                  placeholder="Enter coupon code"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  disabled={isValidatingCoupon}
                />
                <button
                  onClick={handleCouponValidation}
                  disabled={!couponCode.trim() || isValidatingCoupon}
                  className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isValidatingCoupon ? (
                    <Loader2 className="w-4 h-4 animate-spin mx-auto" />
                  ) : (
                    'Apply'
                  )}
                </button>
              </div>

              {couponResult && (
                <div className={`p-4 rounded-lg mb-4 ${couponResult.isValid 
                  ? 'bg-green-100 border border-green-200' 
                  : 'bg-red-100 border border-red-200'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {couponResult.isValid ? (
                        <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600 mr-2" />
                      )}
                      <span className={`font-medium ${couponResult.isValid ? 'text-green-800' : 'text-red-800'}`}>
                        {couponResult.isValid ? 'Coupon Applied!' : 'Invalid Coupon'}
                      </span>
                    </div>
                    {couponResult.isValid && (
                      <button
                        onClick={handleRemoveCoupon}
                        className="text-sm text-green-600 hover:text-green-800 font-medium"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  {couponResult.isValid ? (
                    <div className="mt-2 text-green-700">
                      <p>Discount: ₹{couponResult.discountAmount.toLocaleString('en-IN')}</p>
                      <p>Final Amount: ₹{couponResult.finalAmount.toLocaleString('en-IN')}</p>
                    </div>
                  ) : (
                    <p className="mt-2 text-red-700">{couponResult.error}</p>
                  )}
                </div>
              )}

              <div className="grid grid-cols-3 gap-3">
                {feeStructure.couponCodes.slice(0, 3).map((coupon) => (
                  <div key={coupon.code} className="bg-white border border-gray-200 rounded-lg p-3">
                    <div className="text-center">
                      <p className="font-mono text-sm font-medium text-gray-900 mb-1">{coupon.code}</p>
                      <p className="text-xs text-gray-600">
                        {coupon.discountType === 'percentage' 
                          ? `${coupon.discountValue}% OFF` 
                          : `₹${coupon.discountValue} OFF`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Payment Summary */}
        <div className="lg:col-span-1 space-y-6">
          {/* Payment Summary Card */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden sticky top-6">
            <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-4">
              <h2 className="text-xl font-bold text-white">Payment Summary</h2>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Application Fee</span>
                  <span className="font-medium text-gray-900">₹{feeStructure.applicationFee.toLocaleString('en-IN')}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Course Fee</span>
                  <span className="font-medium text-gray-900">₹{feeStructure.totalCourseFee.toLocaleString('en-IN')}</span>
                </div>

                {couponResult?.isValid && (
                  <div className="flex justify-between items-center text-green-600">
                    <span>Coupon Discount</span>
                    <span className="font-medium">-₹{couponResult.discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total Amount</span>
                    <span className="text-2xl font-bold text-gray-900">₹{fees.finalAmount.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                {paymentOption === 'application' && (
                  <div className="bg-blue-50 rounded-lg p-3 mt-4">
                    <p className="text-sm text-blue-700 text-center">
                      Course fee of ₹{feeStructure.totalCourseFee.toLocaleString('en-IN')} payable later
                    </p>
                  </div>
                )}

                {paymentOption === 'custom' && customAmount && (
                  <div className="bg-purple-50 rounded-lg p-3 mt-4">
                    <p className="text-sm text-purple-700 text-center">
                      Remaining balance: ₹{fees.remainingAmount.toLocaleString('en-IN')}
                    </p>
                  </div>
                )}
              </div>

              {/* Payment Method Selection */}
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Payment Method</h3>
                <div className="grid grid-cols-2 gap-2">
                  {paymentMethods.map((method) => (
                    <button
                      key={method.id}
                      onClick={() => setSelectedPaymentMethod(method.id)}
                      className={`p-3 rounded-lg border flex items-center justify-center gap-2 transition-all ${selectedPaymentMethod === method.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      {method.icon}
                      <span className="text-sm font-medium">{method.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Proceed Button */}
              <button
                onClick={handleProceedToPayment}
                disabled={isProcessing || !scriptLoaded}
                className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-gray-900 to-black text-white font-semibold rounded-lg hover:from-gray-800 hover:to-gray-900 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing Payment...
                  </div>
                ) : !scriptLoaded ? (
                  'Loading Payment Gateway...'
                ) : (
                  `Pay ₹${fees.finalAmount.toLocaleString('en-IN')}`
                )}
              </button>

              {/* Security Badge */}
              <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-500">
                <Shield className="w-4 h-4" />
                <span>256-bit SSL Secure Payment</span>
              </div>
            </div>
          </div>

          {/* Instructions Card */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl border border-blue-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-blue-600" />
              Important Instructions
            </h3>
            <ul className="space-y-2 text-sm text-gray-700">
              {paymentInstructions.map((instruction, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-blue-600 mt-0.5">•</span>
                  <span>{instruction}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Security Info */}
          <div className="bg-gray-50 rounded-xl p-5">
            <h4 className="font-medium text-gray-800 mb-3 flex items-center gap-2">
              <FaLock className="w-4 h-4" />
              Secure Payment Info
            </h4>
            <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
              <div>
                <p className="font-medium mb-1">Payment Gateway</p>
                <p>Razorpay - Trusted by Millions</p>
              </div>
              <div>
                <p className="font-medium mb-1">Security</p>
                <p>256-bit SSL Encryption</p>
              </div>
              <div>
                <p className="font-medium mb-1">Accepted Methods</p>
                <p>Cards, UPI, Net Banking</p>
              </div>
              <div>
                <p className="font-medium mb-1">Support</p>
                <p>24/7 Payment Support</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading Overlay */}
      {!scriptLoaded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 text-center max-w-sm mx-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 mx-auto mb-4 flex items-center justify-center">
              <FaLock className="w-8 h-8 text-white animate-pulse" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Loading Secure Payment Gateway</h3>
            <p className="text-gray-600 mb-4">Initializing secure connection with Razorpay...</p>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div className="bg-blue-600 h-1 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}