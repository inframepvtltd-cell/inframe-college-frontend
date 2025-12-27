"use client";

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
}

export default function TermsAndConditionsForm({
    data,
    onChange,
    onBack,
    onSubmit,
}: TermsFormProps) {
    return (
        <div className="flex justify-center">
            <div className="w-full max-w-5xl bg-white rounded-xl shadow-xl border">

                {/* Header */}
                <div className="px-6 py-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Terms and Conditions
                    </h3>
                </div>

                {/* Scrollable Terms */}
                <div className="px-6 py-4 h-80 overflow-y-auto text-sm text-gray-700 space-y-3">
                    {termsAndConditions.map((term, index) => (
                        <p key={index} className="leading-relaxed">
                            <span className="font-medium mr-2">{index + 1}.</span>
                            {term}
                        </p>
                    ))}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t space-y-4">
                    <label className="flex items-center gap-2 text-sm text-gray-700">
                        <input
                            type="checkbox"
                            checked={data.termsAccepted}
                            onChange={(e) => onChange("termsAccepted", e.target.checked)}
                            className="w-4 h-4"
                        />
                        I have read and agree to the Terms & Conditions
                    </label>

                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={onBack}
                            className="px-4 py-2 border rounded-md text-sm hover:bg-gray-100"
                        >
                            Previous
                        </button>

                        <button
                            type="button"
                            disabled={!data.termsAccepted}
                            onClick={onSubmit}
                            className={`px-6 py-2 rounded-md text-sm font-medium text-white
                ${data.termsAccepted
                                    ? "bg-black hover:bg-gray-800"
                                    : "bg-gray-400 cursor-not-allowed"
                                }`}
                        >
                            Accept Terms
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
