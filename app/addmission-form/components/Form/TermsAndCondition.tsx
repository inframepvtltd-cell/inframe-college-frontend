"use client";

import { useState, useEffect } from "react";
import { AlertCircle, CheckCircle, ArrowLeft, ArrowRight } from "lucide-react";

const termsAndConditions = [
    "The applicant must fulfill the eligibility criteria as specified in the admission guidelines for the program.",
    "Admission is subject to verification of all original documents during the admission process.",
    "If 12th results awaited and student doesn't qualified that school will not be liable for it.",
    "The applicant must provide accurate, current, and complete information in the admission form.",
    "Any misinformation or false documents will result in immediate disqualification and cancellation of admission.",
    "The submission of the admission form does not guarantee admission.",
    "Failure to provide the required documents within the stipulated time frame may result in rejection of the application.",
    "Admission is confirmed only after the payment of the full admission fee, as mentioned in the fee structure.",
    "The fee is non-refundable in any circumstances.",
    "Failure to make timely payments may result in suspension or termination of enrollment. ₹50 per day penalty would be taken for late fees payment.",
    "The admission will be confirmed after verification of all documents and payment of fees.",
    "The institution reserves the right to revoke admission at any stage if any discrepancies are found.",
    "Upon admission, the student agrees to abide by the rules and regulations of the institution.",
    "Any violation of the code of conduct or disciplinary guidelines may lead to expulsion.",
    "The information provided in the admission form will be used solely for the admission process and will remain confidential.",
    "The institution may use the data for internal purposes like communication, announcements, or records maintenance.",
    "The institution reserves the right to deny admission to any applicant without providing specific reasons.",
    "The institution reserves the right to modify the terms and conditions of admission at any time without prior notice.",
    "Regular attendance and participation are mandatory for successful course completion.",
    "Course is non transferable and fees is not refundable in any case.",
    "Students wishing to withdraw from the course must notify the institution in writing.",
    "Exams would be held in different centre if approved by University & main centre.",
    "School reserves the right to change or cancel any test center/city at its discretion, if required."
];

interface TermsFormProps {
    data: {
        termsAccepted: boolean;
    };
    onChange: (field: any, value: any) => void;
    onBack: () => void;
    onSubmit: () => void;
    onAccept?: () => void;
}

export default function TermsAndConditionsForm({
    data,
    onChange,
    onBack,
    onSubmit,
    onAccept,
}: TermsFormProps) {
    const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
    const [isScrollable, setIsScrollable] = useState(false);
    const [attemptedToCheckWithoutScrolling, setAttemptedToCheckWithoutScrolling] = useState(false);

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const element = e.currentTarget;
        const isAtBottom = Math.abs(element.scrollHeight - element.scrollTop - element.clientHeight) < 10;
        
        if (isAtBottom) {
            setHasScrolledToBottom(true);
            setAttemptedToCheckWithoutScrolling(false);
        }
    };

    // Check if content is scrollable
    useEffect(() => {
        const termsContainer = document.getElementById('terms-container');
        if (termsContainer) {
            const isContentScrollable = termsContainer.scrollHeight > termsContainer.clientHeight;
            setIsScrollable(isContentScrollable);
            
            // If content is not scrollable (all visible), automatically set hasScrolledToBottom
            if (!isContentScrollable) {
                setHasScrolledToBottom(true);
            }
        }
    }, []);

    const canProceed = data.termsAccepted && (!isScrollable || hasScrolledToBottom);

    const handleCheckboxClick = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!hasScrolledToBottom && isScrollable) {
            e.preventDefault();
            setAttemptedToCheckWithoutScrolling(true);
            return;
        }
        onChange("termsAccepted", e.target.checked);
    };

    const handleSubmit = () => {
        if (!canProceed) {
            if (!hasScrolledToBottom && isScrollable) {
                setAttemptedToCheckWithoutScrolling(true);
            }
            return;
        }
        onSubmit();
    };

    return (
        <div className="py-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-2 bg-yellow-100 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-yellow-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900">
                            Terms & Conditions
                        </h1>
                    </div>
                    <p className="text-gray-600">
                        Please read and accept the following terms and conditions to proceed
                    </p>
                </div>

                {/* Terms Container */}
                <div className="bg-white rounded-xl shadow-lg border overflow-hidden">
                    {/* Terms Header */}
                    <div className="bg-gray-50 border-b px-6 py-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                            Inframe College Admission Terms
                        </h3>
                        <p className="text-sm text-gray-600 mt-1">
                            Last updated: {new Date().toLocaleDateString('en-IN')}
                        </p>
                    </div>

                    {/* Scrollable Terms with Indicator */}
                    <div className="relative">
                        <div
                            id="terms-container"
                            className="px-6 py-4 h-96 overflow-y-auto text-gray-700 space-y-4"
                            onScroll={handleScroll}
                        >
                            <div className="space-y-4">
                                {termsAndConditions.map((term, index) => (
                                    <div key={index} className="flex gap-3">
                                        <div className="flex-shrink-0 w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                                            <span className="text-sm font-medium text-blue-600">
                                                {index + 1}
                                            </span>
                                        </div>
                                        <p className="text-sm leading-relaxed">
                                            {term}
                                        </p>
                                    </div>
                                ))}
                            </div>

                            {/* End of terms marker */}
                            <div className="text-center py-4 border-t mt-4">
                                <div className="flex items-center justify-center gap-2 text-green-600">
                                    <CheckCircle className="w-5 h-5" />
                                    <span className="font-medium">End of Terms & Conditions</span>
                                </div>
                                <p className="text-sm text-gray-500 mt-2">
                                    You have reached the end of the terms
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Acceptance Section */}
                    <div className="border-t bg-gray-50 px-6 py-6">
                        <div className="space-y-4">
                            {/* Warning message when trying to check without scrolling */}
                            {attemptedToCheckWithoutScrolling && !hasScrolledToBottom && (
                                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                                    <div className="flex items-center gap-2 text-red-700">
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                        <p className="text-sm font-medium">
                                            Please scroll through all terms before accepting
                                        </p>
                                    </div>
                                    <p className="text-sm text-red-600 mt-1 ml-6">
                                        You must read all terms by scrolling to the bottom first
                                    </p>
                                </div>
                            )}

                            {/* Scroll Requirement */}
                            {isScrollable && !hasScrolledToBottom && !attemptedToCheckWithoutScrolling && (
                                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                                    <div className="flex items-center gap-2 text-blue-700">
                                        <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                        <p className="text-sm">
                                            Please scroll through all the terms before accepting
                                        </p>
                                    </div>
                                </div>
                            )}

                            {/* Checkbox */}
                            <label className={`flex items-start gap-3 p-4 rounded-lg border transition-all duration-200 ${canProceed
                                    ? 'bg-green-50 border-green-200'
                                    : 'bg-white border-gray-300'
                                }`}>
                                <input
                                    type="checkbox"
                                    checked={data.termsAccepted}
                                    onChange={handleCheckboxClick}
                                    className={`w-5 h-5 mt-0.5 rounded focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${canProceed
                                        ? 'text-green-600 border-green-300'
                                        : 'text-gray-400 border-gray-300'
                                        }`}
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className={`font-medium ${canProceed ? 'text-green-800' : 'text-gray-700'}`}>
                                            I accept all Terms & Conditions
                                        </span>
                                        {canProceed && (
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                        )}
                                    </div>
                                    <p className="text-sm text-gray-600 mt-1">
                                        By checking this box, you acknowledge that you have read,
                                        understood, and agree to be bound by all the terms and conditions
                                        listed above.
                                    </p>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}