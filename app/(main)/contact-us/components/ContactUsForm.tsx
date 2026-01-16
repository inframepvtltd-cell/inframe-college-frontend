// app/(main)/contact-us/components/ContactUsForm.tsx
"use client";
import { cn } from "@lib/utils";
import { Button } from "@components/ui/button";
import { Card, CardContent } from "@components/ui/card";
import { Input } from "@components/ui/input";
import { Label } from "@components/ui/label";
import { Textarea } from "@components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { Poppins } from "next/font/google";
import { Phone, Mail, MapPin, Briefcase, GraduationCap, BookOpen, ExternalLink, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { fetchContactInfo, submitContactForm, extractContactInfo, getContactValue } from "../api/api";
import ApplyNowForm from "@components/ApplyNowForm";

// Using the Poppins font
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

// Define categories for the dropdown
const CATEGORIES = [
  "Public Relations (PR) & News / Media Enquiries",
  "Tenders & Procurement",
  "Vendors & Service Providers",
  "Partnerships & Collaborations",
  "Alumni Relations",
  "General Inquiry"
];

// Define the Zod validation schema
const contactFormSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  category: z.string().min(1, "Please select a category"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export function ContactUsForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [contactData, setContactData] = useState<any>(null);
  const [contactInfoList, setContactInfoList] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitResult, setSubmitResult] = useState<any>(null);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      category: "",
    },
  });

  // Fetch contact info on component mount
  useEffect(() => {
    const loadContactInfo = async () => {
      try {
        const data = await fetchContactInfo();
        const extracted = extractContactInfo(data);
        setContactData(extracted);
        setContactInfoList(data);
      } catch (error) {
        console.error("Error loading contact info:", error);
      }
    };

    loadContactInfo();
  }, []);

  // Helper function to get contact value by title
  const getContactValueByTitle = (title: string) => {
    return getContactValue(contactInfoList, title);
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setIsSuccess(false);
    setIsError(false);
    setErrorMessage("");
    setSubmitResult(null);

    try {
      const result = await submitContactForm(data);
      setSubmitResult(result);

      if (result.status === "success") {
        setIsSuccess(true);
        setSuccessMessage("Your message has been sent successfully! We'll get back to you soon.");
        reset(); // Reset form after successful submission
      } else {
        const errorMsg = result.message || "Failed to submit form";
        setIsError(true);
        setErrorMessage(errorMsg);
      }
    } catch (err: any) {
      console.error("Form submission error:", err);
      setIsError(true);
      setErrorMessage(err.message || "Network error. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const [isFormOpen, setIsFormOpen] = useState(false);
  const handleApplyClick = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setIsFormOpen(true);
  };
  return (
    <div
      className={cn(
        "min-h-screen w-full flex flex-col gap-10 font-sans bg-gradient-to-b from-amber-50 to-orange-50",
        className
      )}
      {...props}
    >
      {/* Google Map - Dynamic */}
      {contactData?.mapLink && (
        <section className="w-full mt-24">
          <iframe
            src={contactData.mapLink}
            className="w-full h-[40vh] md:h-[50vh]"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
          />
        </section>
      )}

      <section className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 p-8 text-white">
        <h1
          className={`text-center text-5xl md:text-6xl font-bold ${poppins.className} drop-shadow-lg`}
        >
          Connect With Us
        </h1>

        <p className="text-center text-xl md:text-2xl mt-4 text-amber-100 max-w-4xl mx-auto px-4">
          Reach out for inquiries, partnerships, and collaborations
        </p>
      </section>


      {/* Contact Card */}
      <div className="w-full px-6 md:px-12 lg:px-20 pb-20">
        <Card className="w-full overflow-hidden shadow-2xl border-2 border-amber-200">
          <CardContent className="grid grid-cols-1 xl:grid-cols-3 gap-10 p-8 xl:p-12">
            {/* Column 1: Contact Information */}
            <div className="p-6 bg-gradient-to-b from-white to-amber-50 shadow-lg rounded-xl border border-amber-100">
              <h2
                className={`text-3xl font-semibold ${poppins.className} text-center md:text-left text-gray-800 mb-2`}
              >
                <MapPin className="inline mr-2 h-7 w-7 text-amber-600" />
                Visit Us
              </h2>
              <p className="text-gray-600 mt-3 text-center md:text-left text-lg mb-6">
                We are located at:
              </p>

              <div className="space-y-6">
                {/* Dynamic Address */}
                {contactData?.address && (
                  <div className="p-4 bg-amber-50 rounded-lg border-l-4 border-amber-500">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">Address</h3>
                    <p className="text-lg text-gray-700">
                      {contactData.address}
                    </p>
                  </div>
                )}

                {/* Contact Channels */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-semibold text-gray-800 border-b pb-2">
                    Contact Channels
                  </h3>

                  {/* Phone Numbers */}
                  <div className="space-y-3">
                    {contactData?.admissionPhone && (
                      <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                        <Phone className="h-5 w-5 text-blue-600 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-gray-700">Admissions:</span>
                          <a
                            href={`tel:${contactData.admissionPhone.replace(/\D/g, '')}`}
                            className="text-blue-600 hover:text-blue-800 font-semibold ml-2"
                          >
                            {contactData.admissionPhone}
                          </a>
                        </div>
                      </div>
                    )}

                    {contactData?.adminPhone && (
                      <div className="flex items-center gap-3 p-3 bg-purple-50 rounded-lg">
                        <Phone className="h-5 w-5 text-purple-600 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-gray-700">Admin:</span>
                          <a
                            href={`tel:${contactData.adminPhone.replace(/\D/g, '')}`}
                            className="text-purple-600 hover:text-purple-800 font-semibold ml-2"
                          >
                            {contactData.adminPhone}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Emails */}
                  <div className="space-y-3">
                    {contactData?.email && (
                      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                        <Mail className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-gray-700">General Email:</span>
                          <a
                            href={`mailto:${contactData.email}`}
                            className="text-green-600 hover:text-green-800 font-semibold ml-2"
                          >
                            {contactData.email}
                          </a>
                        </div>
                      </div>
                    )}

                    {contactData?.careerEmail && (
                      <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                        <Mail className="h-5 w-5 text-red-600 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-gray-700">Careers:</span>
                          <a
                            href={`mailto:${contactData.careerEmail}`}
                            className="text-red-600 hover:text-red-800 font-semibold ml-2"
                          >
                            {contactData.careerEmail}
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Examination Email (Dynamic from contact_info) */}
                    {getContactValueByTitle("examination_email") && (
                      <div className="flex items-center gap-3 p-3 bg-indigo-50 rounded-lg">
                        <BookOpen className="h-5 w-5 text-indigo-600 flex-shrink-0" />
                        <div>
                          <span className="font-medium text-gray-700">Examinations:</span>
                          <a
                            href={`mailto:${getContactValueByTitle("examination_email")}`}
                            className="text-indigo-600 hover:text-indigo-800 font-semibold ml-2"
                          >
                            {getContactValueByTitle("examination_email")}
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: QR Code & Important Links */}
            <div className="space-y-8">
              {/* QR Code */}
              {contactData?.qrCode && (
                <div className="p-6 bg-gradient-to-b from-white to-amber-50 flex flex-col items-center justify-center shadow-lg rounded-xl border border-amber-100">
                  <h2
                    className={`text-2xl font-semibold ${poppins.className} text-center text-gray-800 mb-3`}
                  >
                    Scan to Navigate
                  </h2>
                  <p className="text-gray-600 text-center mb-6">
                    Scan the QR code below to get directions on Google Maps:
                  </p>
                  <div className="bg-white p-4 rounded-lg shadow-inner">
                    <Image
                      src={contactData.qrCode}
                      alt="QR Code for Google Maps directions"
                      width={200}
                      height={200}
                      className="rounded-md"
                    />
                  </div>
                </div>
              )}

              {/* Important Links Card */}
              <div className="p-6 bg-gradient-to-b from-white to-blue-50 shadow-lg rounded-xl border border-blue-100">
                <h2
                  className={`text-2xl font-semibold ${poppins.className} text-center text-gray-800 mb-4`}
                >
                  Important Links
                </h2>


                <div className="space-y-4">
                  {/* Career Link */}
                  <Link href="/career" className="block">
                    <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg border border-red-200 hover:border-red-300 hover:shadow-md transition-all cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Briefcase className="h-6 w-6 text-red-600" />
                          <div>
                            <h3 className="font-bold text-red-700">Career Opportunities</h3>
                            <p className="text-sm text-red-600">Apply for jobs and internships</p>
                          </div>
                        </div>
                        <ExternalLink className="h-5 w-5 text-red-500" />
                      </div>
                    </div>
                  </Link>

                  {/* Student Admissions - BUTTON ONLY */}
                  <button
                    type="button"
                    onClick={handleApplyClick}
                    className="w-full text-left p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200 hover:border-blue-300 hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <GraduationCap className="h-6 w-6 text-blue-600" />
                        <div>
                          <h3 className="font-bold text-blue-700">Student Admissions</h3>
                          <p className="text-sm text-blue-600">Apply for courses & admissions</p>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 text-blue-500" />
                    </div>
                  </button>

                  {/* Examination Info */}
                  {getContactValueByTitle("examination_email") && (
                    <div className="p-4 bg-gradient-to-r from-indigo-50 to-indigo-100 rounded-lg border border-indigo-200">
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-6 w-6 text-indigo-600" />
                        <div>
                          <h3 className="font-bold text-indigo-700">Examinations</h3>
                          <p className="text-sm text-indigo-600">
                            Email: {getContactValueByTitle("examination_email")}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {isFormOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
                      <ApplyNowForm
                        isFormOpen={isFormOpen}
                        setIsFormOpen={setIsFormOpen}
                        isScrolled={false}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Column 3: Contact Us Form */}
            <div className="p-6 bg-gradient-to-b from-white to-amber-50 shadow-lg rounded-xl border border-amber-100 max-w-xl mx-auto">
              <h2
                className={`text-3xl font-semibold ${poppins.className} text-center text-gray-800 mb-2`}
              >
                Contact Us Form
              </h2>

              {/* Important Notice */}
              <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <div className="bg-yellow-100 p-2 rounded-lg">
                    <svg className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-yellow-800">Important Information</h3>
                    <p className="text-yellow-700 text-sm mt-1">
                      <strong>This form is for:</strong> {CATEGORIES.slice(0, 5).join(", ")}
                    </p>
                    <p className="text-yellow-700 text-sm mt-2 font-semibold">
                      ⚠️ This form is NOT for career opportunities, job applications, or student admissions.
                      Please use the links provided for those purposes.
                    </p>
                  </div>
                </div>
              </div>

              <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first_name" className="text-gray-700 font-medium">
                      First Name *
                    </Label>
                    <Controller
                      name="first_name"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="first_name"
                          placeholder="John"
                          className={`h-12 ${errors.first_name ? "border-red-500" : "border-gray-300"}`}
                        />
                      )}
                    />
                    {errors.first_name && (
                      <p className="text-red-500 text-sm">{errors.first_name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="last_name" className="text-gray-700 font-medium">
                      Last Name *
                    </Label>
                    <Controller
                      name="last_name"
                      control={control}
                      render={({ field }) => (
                        <Input
                          {...field}
                          id="last_name"
                          placeholder="Doe"
                          className={`h-12 ${errors.last_name ? "border-red-500" : "border-gray-300"}`}
                        />
                      )}
                    />
                    {errors.last_name && (
                      <p className="text-red-500 text-sm">{errors.last_name.message}</p>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700 font-medium">
                    Email Address *
                  </Label>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                      <Input
                        {...field}
                        id="email"
                        type="email"
                        placeholder="john.doe@example.com"
                        className={`h-12 ${errors.email ? "border-red-500" : "border-gray-300"}`}
                      />
                    )}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">{errors.email.message}</p>
                  )}
                </div>

                {/* Category Dropdown */}
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-gray-700 font-medium">
                    Select Category *
                  </Label>
                  <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger className={`h-12 ${errors.category ? "border-red-500" : "border-gray-300"}`}>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORIES.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.category && (
                    <p className="text-red-500 text-sm">{errors.category.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-gray-700 font-medium">
                    Your Message *
                  </Label>
                  <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                      <Textarea
                        {...field}
                        id="message"
                        placeholder="Please provide details about your inquiry..."
                        className={`min-h-[150px] resize-y ${errors.message ? "border-red-500" : "border-gray-300"}`}
                      />
                    )}
                  />
                  {errors.message && (
                    <p className="text-red-500 text-sm">{errors.message.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    "Send Message"
                  )}
                </Button>

                {/* Success Message */}
                {isSuccess && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-green-800 font-semibold">Message Sent Successfully!</p>
                        <p className="text-green-600 text-sm mt-1">{successMessage}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Error Message */}
                {isError && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="bg-red-100 p-2 rounded-full">
                        <svg className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.998-.833-2.732 0L4.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-red-800 font-semibold">Error Sending Message</p>
                        <p className="text-red-600 text-sm mt-1">{errorMessage}</p>
                      </div>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </CardContent>
        </Card>
      </div>
    </div >
  );
}