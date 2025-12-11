"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "../components/ui/button";
import { X } from "lucide-react";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Input } from "../components/ui/input";
import {
  states,
  cities as citiesData,
  programLevels,
  allLevels,
  BFAPrograms,
} from "../utils/constant";
import { Poppins } from "next/font/google";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { CheckCircle, Loader2, ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";
// import { cn } from "@/lib/utils";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const cities: { [key: string]: string[] } = citiesData;

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().regex(/^\d{10}$/, "Phone number must be 10 digits"),
  state: z.string().min(1, "Please select a state"),
  city: z.string().min(1, "Please select a city"),
  level: z.string().min(1, "Please select a level"),
  program: z.string().min(1, "Please select a program"),
});

interface ApplyNowFormProps {
  isFormOpen: boolean;
  setIsFormOpen: (value: boolean) => void;
  isScrolled: boolean;
}

const ApplyNowForm = ({
  isFormOpen,
  setIsFormOpen,
  isScrolled,
}: ApplyNowFormProps) => {
  const router = useRouter();
  const [selectedState, setSelectedState] = useState<string>("");
  const [selectedLevel, setSelectedLevel] = useState<string>("");
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "success" | "error">("idle");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phoneNumber: "",
      state: "",
      city: "",
      level: "",
      program: "",
    },
  });

  const allPrograms = Object.keys(programLevels);

  const getAvailableProgramsForLevel = (level: string) => {
    return allPrograms.filter((program) =>
      Object.keys(programLevels[program]).includes(level)
    );
  };

  // Reset form when sheet closes
  useEffect(() => {
    if (!isFormOpen) {
      setTimeout(() => {
        form.reset();
        setSelectedState("");
        setSelectedLevel("");
        setSubmissionStatus("idle");
      }, 300);
    }
  }, [isFormOpen, form]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setSubmissionStatus("idle");

    try {
      const response = await fetch("https://formspree.io/f/myzrbywp", {
      // const response = await fetch("https://formspree.io/f/mvgzrnyl", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        setSubmissionStatus("success");

        // Show success message for 2 seconds then redirect
        setTimeout(() => {
          setIsRedirecting(true);
          setIsFormOpen(false); // Close the sheet
          router.push("/thank-you");
        }, 2000);
      } else {
        setSubmissionStatus("error");
        setTimeout(() => {
          setSubmissionStatus("idle");
        }, 3000);
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      setSubmissionStatus("error");
      setTimeout(() => {
        setSubmissionStatus("idle");
      }, 3000);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderFormFields = () => (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <div className="space-y-1">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    placeholder="Full Name"
                    className="h-12 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-1">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Email Address"
                    className="h-12 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-1">
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    type="tel"
                    placeholder="Phone Number (10 digits)"
                    className="h-12 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <FormField
              control={form.control}
              name="state"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                      setSelectedState(value);
                      form.setValue("city", "");
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400">
                        <SelectValue placeholder="State" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>

          <div className="space-y-1">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    value={field.value}
                    disabled={!selectedState}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400">
                        <SelectValue placeholder="City" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectedState &&
                        cities[selectedState]?.map((city) => (
                          <SelectItem key={city} value={city}>
                            {city}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="space-y-1">
          <FormField
            control={form.control}
            name="level"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setSelectedLevel(value);
                    form.setValue("program", "");
                  }}
                  value={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="h-12 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400">
                      <SelectValue placeholder="Education Level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {allLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage className="text-xs" />
              </FormItem>
            )}
          />
        </div>

        {selectedLevel === "BFA" ? (
          <div className="space-y-1">
            <FormField
              control={form.control}
              name="program"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400">
                        <SelectValue placeholder="BFA Program" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {BFAPrograms.map((program) => (
                        <SelectItem key={program} value={program}>
                          {program}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
        ) : (
          <div className="space-y-1">
            <FormField
              control={form.control}
              name="program"
              render={({ field }) => (
                <FormItem>
                  <Select
                    onValueChange={(value) => {
                      field.onChange(value);
                    }}
                    value={field.value}
                    disabled={!selectedLevel}
                  >
                    <FormControl>
                      <SelectTrigger className="h-12 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400">
                        <SelectValue placeholder="Select Program" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {selectedLevel &&
                        getAvailableProgramsForLevel(selectedLevel).map(
                          (prog) => (
                            <SelectItem key={prog} value={prog}>
                              {prog}
                            </SelectItem>
                          )
                        )}
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-xs" />
                </FormItem>
              )}
            />
          </div>
        )}

        <Button
          type="submit"
          disabled={isSubmitting || isRedirecting}
          className={cn(
            "w-full h-12 mt-2 bg-gradient-to-r from-yellow-400 to-yellow-500",
            "hover:from-yellow-500 hover:to-yellow-600",
            "text-black font-semibold text-lg",
            "shadow-lg hover:shadow-xl",
            "transition-all duration-300",
            "flex items-center justify-center gap-2"
          )}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              Apply Now
              <ArrowRight className="h-5 w-5" />
            </>
          )}
        </Button>
      </form>
    </Form>
  );

  return (
    <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
      {isScrolled && (
        <SheetTrigger asChild>
          <Button
            className={cn(
              "fixed right-0 top-1/2 -translate-y-1/2 rotate-[-90deg] origin-right z-50",
              "bg-gradient-to-r from-yellow-400 to-yellow-500",
              "hover:from-yellow-500 hover:to-yellow-600",
              "text-black h-14 px-8 font-bold text-lg",
              "shadow-xl hover:shadow-2xl",
              "border-2 border-yellow-600",
              "transition-all duration-300",
              "select-none touch-manipulation"
            )}
            style={{
              transformOrigin: "right bottom",
              borderRadius: "8px 8px 0 0",
              transform: "rotate(-90deg) translateX(50%) translateY(-50%)",
              willChange: "transform",
            }}
          >
            Apply Now
          </Button>
        </SheetTrigger>
      )}

      <SheetContent
        side="right"
        className={cn(
          "w-[95vw] sm:w-[450px] h-screen font-sans p-0",
          "border-l-2 border-yellow-400",
          "bg-white overflow-hidden",
          "select-none"
        )}
      >
        {/* Header - Fixed with close button */}
        <div className="sticky top-0 z-20 bg-white border-b border-gray-200 p-6 pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h2 className={`text-2xl font-bold ${poppins.className} mb-2`}>
                <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
                  Start Your Journey
                </span>
              </h2>
              <p className="text-sm text-gray-600">
                Fill out the form below and our team will get in touch with you
              </p>
            </div>
            <SheetClose className="ml-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
              <X className="h-5 w-5 text-gray-500 hover:text-gray-700 transition-colors" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </div>
        </div>

        {/* Form Container - Scrollable */}
        <div className="h-[calc(100vh-120px)] overflow-y-auto overscroll-contain p-6 pb-24">
          {submissionStatus === "success" ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-6 p-4">
              <div className="relative">
                <div className="absolute inset-0 bg-yellow-400 rounded-full opacity-20 animate-ping"></div>
                <CheckCircle className="h-20 w-20 text-green-500" />
              </div>
              <div className="space-y-3">
                <h3 className="text-xl font-bold text-gray-800">
                  Application Submitted!
                </h3>
                <p className="text-gray-600">
                  Thank you for your interest. Our admissions team will contact you shortly.
                </p>
                <p className="text-sm text-gray-500">
                  Redirecting to thank you page...
                </p>
              </div>
              <div className="w-full max-w-xs">
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-400 animate-[loading_2s_ease-in-out]"></div>
                </div>
              </div>
            </div>
          ) : submissionStatus === "error" ? (
            <div className="text-center p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-3">
                <span className="text-xl">⚠️</span>
              </div>
              <h3 className="text-base font-semibold text-red-700 mb-2">
                Submission Failed
              </h3>
              <p className="text-red-600 text-sm">
                Please try again or contact support if the problem persists.
              </p>
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                onClick={() => setSubmissionStatus("idle")}
              >
                Try Again
              </Button>
            </div>
          ) : (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-5"
                id="apply-form"
              >
                {/* Form Fields - All visible without scrolling within form */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Full Name"
                          className="h-12 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="Email Address"
                          className="h-12 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="Phone Number (10 digits)"
                          className="h-12 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                            setSelectedState(value);
                            form.setValue("city", "");
                          }}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400">
                              <SelectValue placeholder="State" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-60">
                            {states.map((state) => (
                              <SelectItem key={state} value={state}>
                                {state}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                          disabled={!selectedState}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400">
                              <SelectValue placeholder="City" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-60">
                            {selectedState &&
                              cities[selectedState]?.map((city) => (
                                <SelectItem key={city} value={city}>
                                  {city}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="level"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedLevel(value);
                          form.setValue("program", "");
                        }}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="h-12 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400">
                            <SelectValue placeholder="Education Level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="max-h-60">
                          {allLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />

                {selectedLevel === "BFA" ? (
                  <FormField
                    control={form.control}
                    name="program"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400">
                              <SelectValue placeholder="BFA Program" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-60">
                            {BFAPrograms.map((program) => (
                              <SelectItem key={program} value={program}>
                                {program}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                ) : (
                  <FormField
                    control={form.control}
                    name="program"
                    render={({ field }) => (
                      <FormItem>
                        <Select
                          onValueChange={(value) => {
                            field.onChange(value);
                          }}
                          value={field.value}
                          disabled={!selectedLevel}
                        >
                          <FormControl>
                            <SelectTrigger className="h-12 border-gray-300 focus:border-yellow-400 focus:ring-yellow-400">
                              <SelectValue placeholder="Select Program" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="max-h-60">
                            {selectedLevel &&
                              getAvailableProgramsForLevel(selectedLevel).map(
                                (prog) => (
                                  <SelectItem key={prog} value={prog}>
                                    {prog}
                                  </SelectItem>
                                )
                              )}
                          </SelectContent>
                        </Select>
                        <FormMessage className="text-xs" />
                      </FormItem>
                    )}
                  />
                )}

                {/* Submit Button - Sticky at bottom */}
              </form>
            </Form>
          )}
        </div>

        {/* Submit Button - Fixed at bottom */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-white/95 border-t border-gray-200">
          <Button
            type="submit"
            form="apply-form"
            disabled={isSubmitting || isRedirecting}
            className={cn(
              "w-full h-12 bg-gradient-to-r from-yellow-400 to-yellow-500",
              "hover:from-yellow-500 hover:to-yellow-600",
              "text-black font-semibold text-base",
              "shadow-md hover:shadow-lg",
              "transition-all duration-200",
              "flex items-center justify-center gap-2"
            )}
          >
            {isSubmitting ? (
              <>
                <div className="h-5 w-5 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
                Submitting...
              </>
            ) : (
              <>
                Apply Now
                <ArrowRight className="h-5 w-5" />
              </>
            )}
          </Button>

          <p className="text-xs text-gray-500 text-center mt-3">
            By submitting, you agree to our{" "}
            <a href="/privacy" className="text-yellow-600 hover:underline">
              Privacy Policy
            </a>
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ApplyNowForm;




// ==============================


// const onSubmit = async (values: z.infer<typeof formSchema>) => {
//   if (isSubmitting) return;

//   setIsSubmitting(true);
//   setSubmissionMessage(null);

//   try {
//     console.log("Form values:", values);

//     // Transform form data to match enquiry API structure
//     const enquiryData = {
//       name: values.name,
//       phoneNumber: values.phoneNumber,
//       email: values.email,
//       city: values.city,
//       course: values.program, // Use program as course
//       source: 'apply-now-form',
//       message: `State: ${values.state}, Level: ${values.level}`, // Include additional info in message
//     };

//     console.log("Enquiry data to submit:", enquiryData);

//     // Submit to backend API
//     const response = await apiHelpers.submitEnquiry(enquiryData);

//     console.log("API response:", response);

//     if (response && response.success) {
//       setSubmissionMessage("Thank you! Your application has been submitted successfully.");
//       setTimeout(() => {
//         router.push("/thank-you");
//       }, 2000);
//     } else {
//       setSubmissionMessage(
//         "Failed to submit the form. Please try again later."
//       );
//     }
//   } catch (error: unknown) {
//     console.error("Error submitting the form:", error);

//     // Provide more specific error messages
//     if (error && typeof error === 'object' && 'response' in error) {
//       const apiError = error as { response?: { status?: number } };
//       if (apiError.response?.status === 400) {
//         setSubmissionMessage("Please check your form data and try again.");
//       } else if (apiError.response?.status === 404) {
//         setSubmissionMessage("Service temporarily unavailable. Please try again later.");
//       } else if (apiError.response?.status && apiError.response.status >= 500) {
//         setSubmissionMessage("Server error. Please try again later.");
//       } else {
//         setSubmissionMessage("An error occurred. Please try again later.");
//       }
//     } else {
//       setSubmissionMessage("An error occurred. Please try again later.");
//     }
//   } finally {
//     setIsSubmitting(false);
//   }
// };
