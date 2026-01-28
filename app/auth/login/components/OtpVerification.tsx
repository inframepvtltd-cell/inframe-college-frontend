'use client';

import { useState, useEffect, useRef } from 'react';
interface OTPVerificationProps {
  email: string;
  onVerifyOtp: (otp: string) => Promise<void>;
  onResendOtp: () => Promise<void>;
  loading: boolean;
  onBack: () => void;
}

export default function OTPVerification({
  email,
  onVerifyOtp,
  onResendOtp,
  loading,
  onBack,
}: OTPVerificationProps) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [resendLoading, setResendLoading] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Auto-submit when all digits are entered
    if (otp.every(digit => digit !== '')) {
      handleSubmit();
    }
  }, [otp]);

  useEffect(() => {
    // Focus first input on mount
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }

    // Start countdown timer
    const countdown = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(countdown);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(countdown);
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    // Move to next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const otpString = otp.join('');
    if (otpString.length === 6) {
      await onVerifyOtp(otpString);
    }
  };

  const handleResend = async () => {
    setResendLoading(true);
    await onResendOtp();
    setTimer(300);
    setResendLoading(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-sm text-gray-600 mb-2">
          Enter the 6-digit code sent to
        </p>
        <p className="font-medium text-gray-900">{email}</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-center space-x-2">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(el) => {
  inputRefs.current[index] = el;
}}

              {/* ref={(el) => (inputRefs.current[index] = el)} */}
              type="text"
              inputMode="numeric"
              pattern="\d*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              disabled={loading}
              className="w-12 h-14 text-center text-2xl font-bold border-2 rounded-lg bg-gray-50 focus:bg-white focus:border-blue-500 focus:outline-none transition-all duration-200"
            />
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-600">
            Code expires in:{' '}
            <span className={`font-semibold ${timer < 60 ? 'text-red-500' : 'text-gray-900'}`}>
              {formatTime(timer)}
            </span>
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <button
          type="button"
          onClick={handleSubmit}
          disabled={loading || otp.some(digit => digit === '')}
          className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:-translate-y-0.5"
        >
          {loading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Verifying...
            </>
          ) : (
            'Verify OTP'
          )}
        </button>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={onBack}
            disabled={loading}
            className="text-sm font-medium text-gray-600 hover:text-gray-900 disabled:opacity-50"
          >
            ← Back to email
          </button>

          <button
            type="button"
            onClick={handleResend}
            disabled={timer > 0 || resendLoading || loading}
            className={`text-sm font-medium ${
              timer > 0 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-blue-600 hover:text-blue-800'
            }`}
          >
            {resendLoading ? 'Resending...' : 'Resend OTP'}
          </button>
        </div>
      </div>
    </div>
  );
}
