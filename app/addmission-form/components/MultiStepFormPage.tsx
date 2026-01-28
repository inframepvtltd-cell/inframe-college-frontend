"use client";
import { LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import PersonalDetailsForm from "./Form/StudentDetailsForm";
import EducationDetailsForm from "./Form/EducationalForm";
import {
  User,
  GraduationCap,
  FileText,
  CheckCircle,
  Circle,
  ArrowLeft,
  ArrowRight,
  Save,
  AlertCircle,
} from "lucide-react";
import ProgramSelectionForm from "./Form/ProgramSelectionForm";
import TermsAndConditionsForm from "./Form/TermsAndCondition";
import { fetchAllPaidCourse, submitApplication } from "../api";
import StudentDocumentsForm from "./Form/DocumentForm";
import ThankYouStep from "./ThankYou";
import { useRouter } from "next/navigation";
import ProgramAndPaymentForm from "./Form/ProgramSelectionForm";

interface EducationFormData {
  classLevel: string;
  institutionName: string;
  stream: string;
  yearOfPassing: string;
  grade: string;
  duration: string;
  document: File | null;
}

interface DocumentData {
  fileType: string;
  file: File | null;
  fileName?: string;
  fileSize?: number;
}

interface FormData {
  // Personal Details
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  fatherName: string;
  motherName: string;
  gender: string;
  category: string;
  religion: string;
  profilePhoto: File | null;
  profilePhotoPreview: string;
  aadharNumber: string;
  permanentAddress: string;
  temporaryAddress: string;
  dateOfBirth: string;

  // Education Details (array)
  educationDetails: EducationFormData[];

  // Documents (array)
  documents: DocumentData[];

  // Program Selection
  courseId: string;

  // Terms
  termsAccepted: boolean;

  // Payment
  paymentAmount?: number;
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
  paymentStatus?: boolean;
}

// Default Education Rows (10th, 12th, Graduation)
const DEFAULT_EDUCATION_ROWS: EducationFormData[] = [
  {
    classLevel: "10th",
    institutionName: "",
    stream: "",
    yearOfPassing: "",
    grade: "",
    duration: "2",
    document: null,
  },
  {
    classLevel: "12th",
    institutionName: "",
    stream: "",
    yearOfPassing: "",
    grade: "",
    duration: "2",
    document: null,
  },
  {
    classLevel: "Graduation",
    institutionName: "",
    stream: "",
    yearOfPassing: "",
    grade: "",
    duration: "3",
    document: null,
  },
];

// Default Document Rows (Aadhar, Signature)
const DEFAULT_DOCUMENT_ROWS: DocumentData[] = [
  {
    fileType: "aadhar",
    file: null,
  },
  {
    fileType: "signature",
    file: null,
  },
];

// Step configuration
const steps = [
  {
    id: 1,
    name: "Personal Details",
    description: "Basic information & documents",
    icon: User,
    color: "bg-blue-500",
  },
  {
    id: 2,
    name: "Education Details",
    description: "Academic background",
    icon: GraduationCap,
    color: "bg-green-500",
  },
  {
    id: 3,
    name: "Documents",
    description: "Upload required documents",
    icon: FileText,
    color: "bg-purple-500",
  },
  {
    id: 4,
    name: "Terms & Conditions",
    description: "Review and accept policies",
    icon: CheckCircle,
    color: "bg-yellow-500",
  },
  {
    id: 5,
    name: "Course Selection",
    description: "Select your course and submit",
    icon: GraduationCap,
    color: "bg-red-500",
  },
];

export default function MultiStepFormPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [stepErrors, setStepErrors] = useState<{ [key: number]: string[] }>({});

  const [formData, setFormData] = useState<FormData>({
    // Personal Details
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    fatherName: "",
    motherName: "",
    gender: "",
    category: "",
    religion: "",
    profilePhoto: null,
    profilePhotoPreview: "",
    aadharNumber: "",
    permanentAddress: "",
    temporaryAddress: "",
    dateOfBirth: "",

    // Education Details with DEFAULT rows
    educationDetails: [...DEFAULT_EDUCATION_ROWS],

    // Documents with DEFAULT rows
    documents: [...DEFAULT_DOCUMENT_ROWS],

    courseId: "",

    // Terms
    termsAccepted: false,

    // Payment
    paymentAmount: 0,
    razorpayOrderId: "",
    razorpayPaymentId: "",
    razorpaySignature: "",
    paymentStatus: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveStatus, setSaveStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [showThankYou, setShowThankYou] = useState(false);
  const [applicationId, setApplicationId] = useState<string>("");

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    // Optional: clear form draft
    localStorage.removeItem("multistepFormData");
    localStorage.removeItem("multistepFormStep");
    localStorage.removeItem("multistepFormCompleted");

    // Clear cookie
    document.cookie = "token=; path=/; max-age=0";

    router.push("/auth/login");
  };

  // Check if user already submitted application
  useEffect(() => {
    const checkExistingApplication = () => {
      const email = localStorage.getItem("userEmail");
      if (email) {
        // Check if application exists for this email
        const savedData = localStorage.getItem(`application_${email}`);
        if (savedData) {
          const data = JSON.parse(savedData);
          if (data.submitted) {
            setShowThankYou(true);
            setApplicationId(data.applicationId || "APP-001");
          }
        }
      }
    };

    checkExistingApplication();
  }, []);

  // Load saved data from localStorage
  useEffect(() => {
    if (showThankYou) return;

    const savedData = localStorage.getItem("multistepFormData");
    const savedStep = localStorage.getItem("multistepFormStep");
    const savedCompleted = localStorage.getItem("multistepFormCompleted");

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // Merge with default rows
      const processedData = {
        ...formData,
        ...parsedData,
        educationDetails: parsedData.educationDetails || [
          ...DEFAULT_EDUCATION_ROWS,
        ],
        documents: parsedData.documents || [...DEFAULT_DOCUMENT_ROWS],
        profilePhoto: null,
        profilePhotoPreview: parsedData.profilePhotoPreview || "",
      };
      setFormData(processedData);
    }

    if (savedStep) {
      setCurrentStep(parseInt(savedStep));
    }

    if (savedCompleted) {
      setCompletedSteps(JSON.parse(savedCompleted));
    }
  }, [showThankYou]);

  // Auto-save to localStorage
  useEffect(() => {
    if (currentStep > 1 && !showThankYou) {
      setSaveStatus("saving");
      const saveData = {
        ...formData,
        profilePhoto: null,
        documents: formData.documents.map((doc) => ({
          ...doc,
          file: null, // Don't save file objects in localStorage
        })),
        educationDetails: formData.educationDetails.map((edu) => ({
          ...edu,
          document: null, // Don't save file objects in localStorage
        })),
      };

      localStorage.setItem("multistepFormData", JSON.stringify(saveData));
      localStorage.setItem("multistepFormStep", currentStep.toString());
      localStorage.setItem(
        "multistepFormCompleted",
        JSON.stringify(completedSteps),
      );

      setTimeout(() => {
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2000);
      }, 500);
    }
  }, [formData, currentStep, completedSteps, showThankYou]);

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear errors for this step when user makes changes
    if (stepErrors[currentStep]) {
      const newErrors = { ...stepErrors };
      delete newErrors[currentStep];
      setStepErrors(newErrors);
    }
  };

  // Validate specific step
  const validateStep = (step: number): boolean => {
    const errors: string[] = [];

    switch (step) {
      case 1: // Personal Details
        if (!formData.firstName?.trim()) errors.push("First name is required");
        if (!formData.lastName?.trim()) errors.push("Last name is required");
        if (!formData.email?.trim()) errors.push("Email is required");
        if (!formData.phone?.trim() || !/^\d{10}$/.test(formData.phone))
          errors.push("Valid phone number (10 digits) is required");
        if (!formData.gender) errors.push("Gender is required");
        if (!formData.dateOfBirth) errors.push("Date of birth is required");
        if (!formData.permanentAddress?.trim())
          errors.push("Permanent address is required");
        if (
          !formData.aadharNumber?.trim() ||
          !/^\d{12}$/.test(formData.aadharNumber)
        )
          errors.push("Valid Aadhar number (12 digits) is required");
        if (!formData.profilePhoto) errors.push("Profile photo is required");
        break;

      case 2: // Education Details
        const importantEducation = formData.educationDetails.filter((edu) =>
          ["10th", "12th", "10", "12"].includes(
            edu.classLevel.toLowerCase().replace("th", "").replace("nd", ""),
          ),
        );

        // Check 10th and 12th are present
        const has10th = importantEducation.some((edu) =>
          ["10th", "10"].includes(
            edu.classLevel.toLowerCase().replace("th", ""),
          ),
        );
        const has12th = importantEducation.some((edu) =>
          ["12th", "12"].includes(
            edu.classLevel.toLowerCase().replace("th", "").replace("nd", ""),
          ),
        );

        if (!has10th) errors.push("10th standard details are required");
        if (!has12th) errors.push("12th standard details are required");

        // Validate each education record
        formData.educationDetails.forEach((edu, index) => {
          if (
            ["10th", "12th", "10", "12"].includes(
              edu.classLevel.toLowerCase().replace("th", "").replace("nd", ""),
            )
          ) {
            if (!edu.institutionName?.trim())
              errors.push(
                `Education ${index + 1}: Institution name is required for ${edu.classLevel}`,
              );
            if (!edu.stream?.trim())
              errors.push(
                `Education ${index + 1}: Stream is required for ${edu.classLevel}`,
              );
            if (!edu.yearOfPassing?.trim())
              errors.push(
                `Education ${index + 1}: Year of passing is required for ${edu.classLevel}`,
              );
            if (!edu.grade?.trim())
              errors.push(
                `Education ${index + 1}: Grade is required for ${edu.classLevel}`,
              );
            if (!edu.document)
              errors.push(
                `Education ${index + 1}: Document upload is required for ${edu.classLevel}`,
              );
          }
        });
        break;

      case 3: // Documents
        // Check mandatory documents
        const hasAadhar = formData.documents.some(
          (doc) => doc.fileType === "aadhar" && doc.file,
        );
        const hasSignature = formData.documents.some(
          (doc) => doc.fileType === "signature" && doc.file,
        );

        if (!hasAadhar) errors.push("Aadhar Card upload is required");
        if (!hasSignature) errors.push("Signature upload is required");

        // Validate other documents if uploaded
        formData.documents.forEach((doc, index) => {
          if (doc.fileType && !doc.file) {
            errors.push(
              `Document ${index + 1}: ${doc.fileType} file is required`,
            );
          }
        });
        break;

      case 4: // Terms & Conditions
        if (!formData.termsAccepted)
          errors.push("You must accept terms and conditions");
        break;

      case 5: // Program & Payment
        if (!formData.courseId) errors.push("Course selection is required");
        break;
    }

    if (errors.length > 0) {
      setStepErrors((prev) => ({ ...prev, [step]: errors }));
      return false;
    }

    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps((prev) => [...prev, currentStep]);
      }
      setCurrentStep((prev) => Math.min(prev + 1, steps.length));
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Scroll to top to show errors
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const jumpToStep = (step: number) => {
    // Only allow jumping to completed steps
    if (step <= currentStep || completedSteps.includes(step - 1)) {
      // Validate current step before leaving
      if (validateStep(currentStep)) {
        setCurrentStep(step);
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    }
  };

  const handlePaymentSuccess = (paymentData: any) => {
    console.log("Payment completed with data:", paymentData);

    // Update form data with payment details
    setFormData((prev) => ({
      ...prev,
      paymentAmount: paymentData.payment_amount,
      razorpayOrderId: paymentData.razorpay_order_id || "",
      razorpayPaymentId: paymentData.razorpay_payment_id || "",
      razorpaySignature: paymentData.razorpay_signature || "",
      paymentStatus: paymentData.payment_status || true,
    }));

    // Show success message
    alert("Payment successful! You can now submit your application.");
  };

  const handleSubmit = async () => {
    // Validate current step first
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);

    try {
      // Validate ALL steps before submission
      let allValid = true;
      for (let i = 1; i <= steps.length; i++) {
        if (!validateStep(i)) {
          allValid = false;
          break;
        }
      }

      if (!allValid) {
        alert("Please complete all required fields in all steps");
        setIsSubmitting(false);
        return;
      }

      // Final validations
      if (!formData.courseId) {
        alert("Please select a course");
        setIsSubmitting(false);
        return;
      }

      if (!formData.termsAccepted) {
        alert("Please accept terms and conditions");
        setIsSubmitting(false);
        return;
      }

      // Fetch course details for payment amount
      const courses = await fetchAllPaidCourse();
      const selectedCourse = courses.find(
        (c: any) => c.id === formData.courseId,
      );

      // Prepare payment data
      const paymentStatus = formData.paymentStatus ?? false;
      const paymentAmount = paymentStatus
        ? formData.paymentAmount || 0
        : selectedCourse
          ? parseFloat(selectedCourse.price)
          : 0;

      // Prepare data for API submission
      const submissionData = {
        ...formData,
        paymentAmount,
        paymentStatus,
      };

      console.log("Submitting data to API:", submissionData);

      // CALL THE API - This is what you're missing!
      const response = await submitApplication(submissionData);

      console.log("API Response:", response);

      if (response.success) {
        // Generate application ID
        const applicationId =
          response.data?.studentId || `APP-${Date.now().toString().slice(-6)}`;
        setApplicationId(applicationId);

        // Save submission status to localStorage
        localStorage.setItem(
          `application_${formData.email}`,
          JSON.stringify({
            submitted: true,
            applicationId,
            submittedAt: new Date().toISOString(),
            courseId: formData.courseId,
            courseName: selectedCourse?.course_name,
            paymentStatus,
            paymentAmount,
            studentId: response.data?.studentId,
          }),
        );

        // Cleanup form data
        localStorage.removeItem("multistepFormData");
        localStorage.removeItem("multistepFormStep");
        localStorage.removeItem("multistepFormCompleted");

        // Show thank you page
        setShowThankYou(true);
      } else {
        throw new Error(response.message || "Failed to submit application");
      }
    } catch (error: any) {
      console.error("Submission error:", error);

      // Show specific error message
      const errorMessage =
        error.message || "Failed to submit form. Please try again.";
      alert(`Error: ${errorMessage}`);

      // Check if it's a network error
      if (
        error.message?.includes("Network Error") ||
        error.message?.includes("Failed to fetch")
      ) {
        alert(
          "Network error. Please check your internet connection and try again.",
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const getStepIcon = (stepId: number) => {
    const StepIcon = steps[stepId - 1]?.icon || Circle;
    if (completedSteps.includes(stepId)) {
      return CheckCircle;
    }
    if (stepId === currentStep) {
      return StepIcon;
    }
    return StepIcon;
  };

  if (showThankYou) {
    return (
      <ThankYouStep
        studentName={`${formData.firstName} ${formData.lastName}`}
        email={formData.email}
        applicationId={applicationId}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        {/* <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Student Application Form
          </h1>
          <p className="text-gray-600">
            Complete all steps to submit your application
          </p>
        </div> */}

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Student Application Form
            </h1>
            <p className="text-gray-600">
              Complete all steps to submit your application
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 border border-red-200 rounded-lg hover:bg-red-50 transition"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar - Steps */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Application Progress
                </h2>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-600">
                    Step {currentStep} of {steps.length}
                  </div>
                  {saveStatus === "saving" && (
                    <div className="flex items-center gap-1 text-sm text-blue-600">
                      <div className="w-3 h-3 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                      Saving...
                    </div>
                  )}
                  {saveStatus === "saved" && (
                    <div className="flex items-center gap-1 text-sm text-green-600">
                      <CheckCircle className="w-4 h-4" />
                      Saved
                    </div>
                  )}
                </div>
                <div className="mt-4 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
                    style={{
                      width: `${((completedSteps.length + (currentStep > completedSteps.length ? 0.5 : 0)) / steps.length) * 100}%`,
                    }}
                  ></div>
                </div>
              </div>

              {/* Error Alert for Current Step */}
              {stepErrors[currentStep] && (
                <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-red-800">
                        Please fix these errors:
                      </p>
                      <ul className="text-xs text-red-700 mt-1 space-y-1">
                        {stepErrors[currentStep]
                          .slice(0, 3)
                          .map((error, idx) => (
                            <li key={idx}>• {error}</li>
                          ))}
                        {stepErrors[currentStep].length > 3 && (
                          <li>
                            • ...and {stepErrors[currentStep].length - 3} more
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {/* Steps List */}
              <div className="space-y-4">
                {steps.map((step, index) => {
                  const Icon = getStepIcon(step.id);
                  const isCompleted = completedSteps.includes(step.id);
                  const isCurrent = currentStep === step.id;
                  const isAccessible =
                    step.id <= currentStep ||
                    completedSteps.includes(step.id - 1);
                  const hasErrors = stepErrors[step.id]?.length > 0;

                  return (
                    <button
                      key={step.id}
                      onClick={() => isAccessible && jumpToStep(step.id)}
                      disabled={!isAccessible}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
                        isCurrent
                          ? "bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 shadow-sm"
                          : isCompleted
                            ? "bg-green-50 border border-green-100"
                            : hasErrors
                              ? "bg-red-50 border border-red-100"
                              : "bg-gray-50 hover:bg-gray-100"
                      } ${!isAccessible ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                      <div
                        className={`p-3 rounded-lg ${
                          isCurrent
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                            : isCompleted
                              ? "bg-green-500 text-white"
                              : hasErrors
                                ? "bg-red-500 text-white"
                                : "bg-gray-200 text-gray-600"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <h3
                            className={`font-medium ${
                              isCurrent
                                ? "text-gray-900"
                                : isCompleted
                                  ? "text-gray-900"
                                  : hasErrors
                                    ? "text-red-800"
                                    : "text-gray-700"
                            }`}
                          >
                            Step {step.id}: {step.name}
                          </h3>
                          {isCompleted && !hasErrors && (
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          )}
                          {hasErrors && (
                            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                          )}
                        </div>
                        <p
                          className={`text-sm ${
                            isCurrent
                              ? "text-blue-600"
                              : isCompleted
                                ? "text-green-600"
                                : hasErrors
                                  ? "text-red-600"
                                  : "text-gray-500"
                          }`}
                        >
                          {step.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Main Form Area */}
          <div className="lg:w-3/4">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Form Header */}
              <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">
                      {steps[currentStep - 1]?.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      {steps[currentStep - 1]?.description}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="hidden sm:inline">Auto-save:</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        saveStatus === "saved"
                          ? "bg-green-100 text-green-800"
                          : saveStatus === "saving"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {saveStatus === "saved"
                        ? "Saved"
                        : saveStatus === "saving"
                          ? "Saving..."
                          : "Ready"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Error Summary */}
              {stepErrors[currentStep] && (
                <div className="bg-red-50 border-b border-red-200 px-6 py-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-red-800">
                        Please complete all required fields before proceeding
                      </p>
                      <p className="text-xs text-red-600 mt-1">
                        {stepErrors[currentStep].length} issue
                        {stepErrors[currentStep].length > 1 ? "s" : ""} need
                        {stepErrors[currentStep].length > 1 ? "" : "s"}{" "}
                        attention
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Content */}
              <div className="p-2 md:p-2">
                {currentStep === 1 && (
                  <PersonalDetailsForm
                    data={formData}
                    onChange={handleChange}
                  />
                )}

                {currentStep === 2 && (
                  <EducationDetailsForm
                    data={formData.educationDetails}
                    onChange={(data: EducationFormData[]) =>
                      handleChange("educationDetails", data)
                    }
                  />
                )}

                {currentStep === 3 && (
                  <StudentDocumentsForm
                    data={formData.documents}
                    onChange={(data: DocumentData[]) =>
                      handleChange("documents", data)
                    }
                  />
                )}

                {currentStep === 4 && (
                  <TermsAndConditionsForm
                    data={formData}
                    onChange={(field: string, value: any) =>
                      handleChange(field as keyof FormData, value)
                    }
                    onBack={handlePrev}
                    onSubmit={() => {
                      // Terms accept karne ke baad directly course selection par jaye
                      handleNext();
                    }}
                  />
                )}

                {currentStep === 5 && (
                  <div className="space-y-6">
                    <ProgramAndPaymentForm
                      data={{
                        courseId: formData.courseId,
                        email: formData.email,
                        phone: formData.phone,
                      }}
                      onChange={(field: string, value: any) =>
                        handleChange(field as keyof FormData, value)
                      }
                      onPaymentComplete={handlePaymentSuccess}
                    />
                  </div>
                )}

                {/* Navigation Buttons - Step 5 me submit button show */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div>
                      {currentStep > 1 && (
                        <button
                          type="button"
                          onClick={handlePrev}
                          className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          Previous Step
                        </button>
                      )}
                    </div>

                    <div className="flex items-center gap-4">
                      {currentStep < steps.length ? (
                        <button
                          type="button"
                          onClick={handleNext}
                          disabled={stepErrors[currentStep]?.length > 0}
                          className={`px-6 py-3 font-semibold rounded-xl shadow-lg transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2 ${
                            stepErrors[currentStep]?.length > 0
                              ? "bg-gray-400 text-white"
                              : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl hover:-translate-y-0.5"
                          }`}
                        >
                          Next Step
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        // Step 5 (last step) par Submit Application button
                        <button
                          type="button"
                          onClick={handleSubmit}
                          disabled={
                            isSubmitting || stepErrors[currentStep]?.length > 0
                          }
                          className={`px-8 py-3 font-semibold rounded-xl shadow-lg transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2 ${
                            stepErrors[currentStep]?.length > 0
                              ? "bg-gray-400 text-white"
                              : "bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-xl hover:-translate-y-0.5"
                          }`}
                        >
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Save className="w-5 h-5" />
                              Submit Application
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
