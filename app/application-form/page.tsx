"use client";

import { useState, useEffect } from "react";
import PersonalDetailsForm from "./components/Form/StudentDetailsForm";
import EducationDetailsForm from "./components/Form/EducationalForm";
import {
  User,
  GraduationCap,
  FileText,
  CheckCircle,
  Circle,
  ArrowLeft,
  ArrowRight,
  Save
} from "lucide-react";
import ProgramSelectionForm from "./components/Form/ProgramSelectionForm";
import TermsAndConditionsForm from "./components/Form/TermsAndCondition";
import PaymentStep from "./components/Payment.component";
import { submitApplication } from "./api";

// Define form data types
interface FormData {
  // Personal Details
  firstName: string
  lastName: string
  email: string
  phone: string
  fatherName: string
  motherName: string
  gender: string
  category: string
  religion: string
  profilePhoto: File | null
  profilePhotoPreview: string
  aadharNumber: string
  aadharFile: File | null
  permanentAddress: string
  temporaryAddress: string
  dateOfBirth: string

  // Education Details
  classLevel: string
  institutionName: string
  stream: string
  yearOfPassing: string
  grade: string
  duration: string
  document: File | null

  // Additional steps
  additionalInfo: string
  termsAccepted: boolean
}

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
    name: "Program Selection",
    description: "Choose your course, campus, and study mode",
    icon: GraduationCap,
    color: "bg-green-500",
  },
  {
    id: 4,
    name: "Terms & Conditions",
    description: "Review and accept admission policies",
    icon: FileText,
    color: "bg-purple-500",
  },
  {
    id: 5,
    name: "Payment",
    description: "Review and accept admission policies",
    icon: FileText,
    color: "bg-purple-500",
  }

];

export default function MultiStepFormPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
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
    aadharFile: null,
    permanentAddress: "",
    temporaryAddress: "",
    dateOfBirth: "",

    // Education Details
    classLevel: "",
    institutionName: "",
    stream: "",
    yearOfPassing: "",
    grade: "",
    duration: "",
    document: null,

    // Additional
    additionalInfo: "",
    termsAccepted: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");

  // Load saved data from localStorage
  useEffect(() => {
    const savedData = localStorage.getItem('multistepFormData');
    const savedStep = localStorage.getItem('multistepFormStep');
    const savedCompleted = localStorage.getItem('multistepFormCompleted');

    if (savedData) {
      const parsedData = JSON.parse(savedData);
      // Convert string dates back to objects
      const processedData = {
        ...parsedData,
        profilePhoto: null,
        aadharFile: null,
        document: null
      };
      setFormData(prev => ({ ...prev, ...processedData }));
    }

    if (savedStep) {
      setCurrentStep(parseInt(savedStep));
    }

    if (savedCompleted) {
      setCompletedSteps(JSON.parse(savedCompleted));
    }
  }, []);

  // Auto-save to localStorage
  useEffect(() => {
    if (currentStep > 1) { // Don't save immediately on step 1
      setSaveStatus("saving");
      const saveData = {
        ...formData,
        profilePhoto: null,
        aadharFile: null,
        document: null
      };

      localStorage.setItem('multistepFormData', JSON.stringify(saveData));
      localStorage.setItem('multistepFormStep', currentStep.toString());
      localStorage.setItem('multistepFormCompleted', JSON.stringify(completedSteps));

      setTimeout(() => {
        setSaveStatus("saved");
        setTimeout(() => setSaveStatus("idle"), 2000);
      }, 500);
    }
  }, [formData, currentStep, completedSteps]);

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    // Validate current step before proceeding
    if (validateCurrentStep()) {
      if (!completedSteps.includes(currentStep)) {
        setCompletedSteps(prev => [...prev, currentStep]);
      }
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const validateCurrentStep = (): boolean => {
    switch (currentStep) {
      case 1: // Personal Details
        const personalErrors = [];
        if (!formData.firstName.trim()) personalErrors.push("First name");
        if (!formData.lastName.trim()) personalErrors.push("Last name");
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) personalErrors.push("Email");
        if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone)) personalErrors.push("Phone");
        if (!formData.gender) personalErrors.push("Gender");
        if (!formData.dateOfBirth) personalErrors.push("Date of birth");
        if (!formData.permanentAddress.trim()) personalErrors.push("Permanent address");
        if (personalErrors.length > 0) {
          alert(`Please fill in: ${personalErrors.join(", ")}`);
          return false;
        }
        return true;

      case 2: // Education Details
        const educationErrors = [];
        if (!formData.classLevel.trim()) educationErrors.push("Class/Level");
        if (!formData.institutionName.trim()) educationErrors.push("Institution name");
        if (!formData.stream.trim()) educationErrors.push("Stream");
        if (!formData.yearOfPassing.trim()) educationErrors.push("Year of passing");
        if (!formData.grade.trim()) educationErrors.push("Grade");
        if (!formData.duration.trim()) educationErrors.push("Duration");
        if (educationErrors.length > 0) {
          alert(`Please fill in: ${educationErrors.join(", ")}`);
          return false;
        }
        return true;

      default:
        return true;
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Final validation
      if (validateCurrentStep()) {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        const res = await submitApplication(formData);

        if (res.status !== "success") {
          throw new Error(res.message);
        }
        console.log("Form submitted:", formData);

        // Clear saved data
        localStorage.removeItem('multistepFormData');
        localStorage.removeItem('multistepFormStep');
        localStorage.removeItem('multistepFormCompleted');

        // Show success and reset
        alert("Form submitted successfully!");
        setFormData({
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
          aadharFile: null,
          permanentAddress: "",
          temporaryAddress: "",
          dateOfBirth: "",
          classLevel: "",
          institutionName: "",
          stream: "",
          yearOfPassing: "",
          grade: "",
          duration: "",
          document: null,
          additionalInfo: "",
          termsAccepted: false,
        });
        setCurrentStep(1);
        setCompletedSteps([]);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to submit form. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const jumpToStep = (step: number) => {
    // Only allow jumping to completed steps or next step
    if (step <= currentStep || completedSteps.includes(step - 1)) {
      setCurrentStep(step);
      window.scrollTo({ top: 0, behavior: 'smooth' });
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Student Application Form
          </h1>
          <p className="text-gray-600">
            Complete all steps to submit your application
          </p>
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
                    style={{ width: `${((completedSteps.length + (currentStep > completedSteps.length ? 0.5 : 0)) / steps.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Steps List */}
              <div className="space-y-4">
                {steps.map((step, index) => {
                  const Icon = getStepIcon(step.id);
                  const isCompleted = completedSteps.includes(step.id);
                  const isCurrent = currentStep === step.id;
                  const isAccessible = step.id <= currentStep || completedSteps.includes(step.id - 1);

                  return (
                    <button
                      key={step.id}
                      onClick={() => isAccessible && jumpToStep(step.id)}
                      disabled={!isAccessible}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${isCurrent
                        ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 shadow-sm'
                        : isCompleted
                          ? 'bg-green-50 border border-green-100'
                          : 'bg-gray-50 hover:bg-gray-100'
                        } ${!isAccessible ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <div className={`p-3 rounded-lg ${isCurrent
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                        : isCompleted
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-200 text-gray-600'
                        }`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="flex items-center gap-2">
                          <h3 className={`font-medium ${isCurrent
                            ? 'text-gray-900'
                            : isCompleted
                              ? 'text-gray-900'
                              : 'text-gray-700'
                            }`}>
                            Step {step.id}: {step.name}
                          </h3>
                          {isCompleted && (
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          )}
                        </div>
                        <p className={`text-sm ${isCurrent
                          ? 'text-blue-600'
                          : isCompleted
                            ? 'text-green-600'
                            : 'text-gray-500'
                          }`}>
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
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${saveStatus === "saved" ? "bg-green-100 text-green-800" :
                      saveStatus === "saving" ? "bg-blue-100 text-blue-800" :
                        "bg-gray-100 text-gray-800"
                      }`}>
                      {saveStatus === "saved" ? "Saved" :
                        saveStatus === "saving" ? "Saving..." :
                          "Ready"}
                    </span>
                  </div>
                </div>
              </div>

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
                    data={formData}
                    onChange={handleChange}
                  />
                )}

                {currentStep === 3 && (
                  <ProgramSelectionForm
                    data={formData}
                    onChange={handleChange}
                  />
                )}

                {currentStep === 4 && (
                  <TermsAndConditionsForm
                    data={formData}
                    onChange={handleChange}
                    onBack={handlePrev}
                    onSubmit={handleSubmit}
                  />
                )}

                {currentStep === 5 && (
                  <PaymentStep
                    registrationFee={1800}
                    processingFee={250}
                    courseName="Diploma in Interior Design"
                  />
                )}

                {/* Navigation Buttons */}
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
                          className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
                        >
                          Next Step
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSubmit}
                          disabled={isSubmitting}
                          className="px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center gap-2"
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