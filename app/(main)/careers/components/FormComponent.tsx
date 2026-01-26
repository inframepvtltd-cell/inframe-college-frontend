// FormComponent.tsx
"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "../../../../components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../../../components/ui/select";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Upload, AlertCircle } from "lucide-react";

import { applyForCareer } from "../api.ts/api";

/* -------------------- schema -------------------- */

const MAX_FILE_SIZE = 1024 * 1024;
const ACCEPTED_FILE_TYPES = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const CareerFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    phone: z.string().min(10, "Phone number must be at least 10 digits"),
    position: z.string().min(1, "Please select a position"),
    resume: z
        .instanceof(FileList)
        .refine((files) => files?.length > 0, "Resume is required")
        .refine((files) => files[0]?.size <= MAX_FILE_SIZE, "Max file size is 1MB")
        .refine(
            (files) => ACCEPTED_FILE_TYPES.includes(files[0]?.type),
            "Only .pdf, .doc, and .docx files are accepted"
        ),
    coverLetter: z.string().optional(),
});

type FormValues = z.infer<typeof CareerFormSchema>;

/* -------------------- props -------------------- */

interface Props {
    positions: { id: string; label: string }[];
}

/* -------------------- component -------------------- */

export default function CareerApplicationForm({ positions }: Props) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formStatus, setFormStatus] = useState<{
        success: boolean;
        message: string;
    } | null>(null);

    const form = useForm<FormValues>({
        resolver: zodResolver(CareerFormSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            position: "",
            coverLetter: "",
        },
    });

    const onSubmit = async (data: FormValues) => {
        setIsSubmitting(true);
        setFormStatus(null);

        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("email", data.email);
            formData.append("phone", data.phone);
            formData.append("position", data.position);
            formData.append("file", data.resume[0]);

            if (data.coverLetter) {
                formData.append("coverLetter", data.coverLetter);
            }

            const res = await applyForCareer(formData);

            if (res.status !== "success") {
                throw new Error(res.message || "Submission failed");
            }

            setFormStatus({
                success: true,
                message: "Application submitted successfully! We'll be in touch soon.",
            });

            form.reset();
        } catch (err: any) {
            setFormStatus({
                success: false,
                message: err?.message || "Failed to submit application. Please try again.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            {formStatus && (
                <Alert 
                    className={`mb-6 ${formStatus.success 
                        ? "bg-green-50 text-green-800 border-green-200" 
                        : "bg-red-50 text-red-800 border-red-200"}`}
                >
                    <AlertTitle className="font-semibold">
                        {formStatus.success ? "Success!" : "Error"}
                    </AlertTitle>
                    <AlertDescription>{formStatus.message}</AlertDescription>
                </Alert>
            )}

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your full name"
                                            {...field}
                                            className="focus-visible:ring-yellow-500"
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email *</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            placeholder="your.email@example.com"
                                            {...field}
                                            className="focus-visible:ring-yellow-500"
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone Number *</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="+91 9876543210"
                                            {...field}
                                            className="focus-visible:ring-yellow-500"
                                            disabled={isSubmitting}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="position"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Position *</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                        disabled={isSubmitting}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="focus-visible:ring-yellow-500">
                                                <SelectValue placeholder="Select a position" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {positions.length === 0 ? (
                                                <SelectItem value="no-positions" disabled>
                                                    No positions available
                                                </SelectItem>
                                            ) : (
                                                positions.map((position) => (
                                                    <SelectItem
                                                        key={position.id}
                                                        value={position.label}
                                                    >
                                                        {position.label}
                                                    </SelectItem>
                                                ))
                                            )}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="resume"
                        render={({ field: { value, onChange, ...field } }) => (
                            <FormItem>
                                <FormLabel>Resume *</FormLabel>
                                <FormControl>
                                    <div className="flex flex-col items-center justify-center w-full">
                                        <label
                                            htmlFor="resume-upload"
                                            className={`flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-md cursor-pointer transition-colors
                                                ${form.formState.errors.resume 
                                                    ? "border-red-300 bg-red-50 hover:bg-red-100" 
                                                    : "border-gray-200 bg-gray-50 hover:bg-gray-100"}`}
                                        >
                                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                                <Upload className="w-8 h-8 mb-3 text-yellow-500" />
                                                <p className="mb-2 text-sm text-gray-500">
                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500">DOC, DOCX or PDF (MAX. 1MB)</p>
                                            </div>
                                            <input
                                                id="resume-upload"
                                                type="file"
                                                className="hidden"
                                                accept=".doc,.docx,.pdf"
                                                disabled={isSubmitting}
                                                onChange={(e) => {
                                                    const files = e.target.files;
                                                    if (files?.length) {
                                                        onChange(files);
                                                    }
                                                }}
                                                {...field}
                                            />
                                        </label>
                                        {value && value[0] && (
                                            <p className="mt-2 text-sm text-gray-700">
                                                <span className="font-semibold">Uploaded:</span> {value[0].name}
                                            </p>
                                        )}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="coverLetter"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Cover Letter (Optional)</FormLabel>
                                <FormControl>
                                    <textarea
                                        placeholder="Tell us why you're interested in this position..."
                                        className="flex min-h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-y"
                                        {...field}
                                        disabled={isSubmitting}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-6 text-base"
                        disabled={isSubmitting || positions.length === 0}
                    >
                        {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                    
                    {positions.length === 0 && (
                        <p className="text-sm text-gray-500 text-center">
                            No positions are currently available for application.
                        </p>
                    )}
                </form>
            </Form>
        </>
    );
}


















// "use client";

// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

// import {
//     Form,
//     FormControl,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form";
// import { Input } from "../../../../components/ui/input";
// import {
//     Select,
//     SelectContent,
//     SelectItem,
//     SelectTrigger,
//     //   SelectValue,
// } from "../../../../components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { Upload, AlertCircle } from "lucide-react";

// import { applyForCareer } from "../api.ts/api";
// import { SelectValue } from "../../../../components/ui/select";

// /* -------------------- schema -------------------- */

// const MAX_FILE_SIZE = 1024 * 1024;
// const ACCEPTED_FILE_TYPES = [
//     "application/pdf",
//     "application/msword",
//     "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
// ];

// const CareerFormSchema = z.object({
//     name: z.string().min(2),
//     email: z.string().email(),
//     phone: z.string().min(10),
//     position: z.string(),
//     resume: z
//         .any()
//         .refine((files) => files?.length > 0, "Resume is required")
//         .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, "Max 1MB")
//         .refine(
//             (files) => ACCEPTED_FILE_TYPES.includes(files?.[0]?.type),
//             "Invalid file type"
//         ),
//     coverLetter: z.string().optional(),
// });

// type FormValues = z.infer<typeof CareerFormSchema>;

// /* -------------------- props -------------------- */

// interface Props {
//     positions: { id: string; label: string }[];
// }

// /* -------------------- component -------------------- */

// export default function CareerApplicationForm({ positions }: Props) {
//     const [isSubmitting, setIsSubmitting] = useState(false);
//     const [formStatus, setFormStatus] = useState<{
//         success: boolean;
//         message: string;
//     } | null>(null);

//     const form = useForm<FormValues>({
//         resolver: zodResolver(CareerFormSchema),
//     });

//     const onSubmit = async (data: FormValues) => {
//         setIsSubmitting(true);

//         try {
//             const formData = new FormData();
//             formData.append("name", data.name);
//             formData.append("email", data.email);
//             formData.append("phone", data.phone);
//             formData.append("position", data.position);
//             formData.append("file", data.resume[0]);

//             if (data.coverLetter) {
//                 formData.append("coverLetter", data.coverLetter);
//             }

//             const res = await applyForCareer(formData);

//             if (res.status !== "success") {
//                 throw new Error(res.message);
//             }

//             setFormStatus({
//                 success: true,
//                 message: "Application submitted successfully!",
//             });

//             form.reset();
//         } catch (err: any) {
//             setFormStatus({
//                 success: false,
//                 message:
//                     err?.response?.data?.message || "Failed to submit application",
//             });
//         } finally {
//             setIsSubmitting(false);
//         }
//     };

//     return (
//         <>
//             {formStatus && (
//                 <Alert className={`mb-6 ${formStatus.success ? "bg-green-50 text-green-800 border-green-200" : "bg-red-50 text-red-800 border-red-200"}`}>
//                     <AlertCircle className={formStatus.success ? "text-green-600" : "text-red-600"} />
//                     <AlertTitle>{formStatus.success ? "Success!" : "Error"}</AlertTitle>
//                     <AlertDescription>{formStatus.message}</AlertDescription>
//                 </Alert>
//             )}

//             <Form {...form}>
//                 <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <FormField
//                             control={form.control}
//                             name="name"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Full Name</FormLabel>
//                                     <FormControl>
//                                         <Input
//                                             placeholder="Enter your full name"
//                                             {...field}
//                                             className="focus-visible:ring-yellow-500"
//                                         />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         <FormField
//                             control={form.control}
//                             name="email"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Email</FormLabel>
//                                     <FormControl>
//                                         <Input
//                                             type="email"
//                                             placeholder="your.email@example.com"
//                                             {...field}
//                                             className="focus-visible:ring-yellow-500"
//                                         />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                     </div>

//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                         <FormField
//                             control={form.control}
//                             name="phone"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Phone Number</FormLabel>
//                                     <FormControl>
//                                         <Input
//                                             placeholder="+91 9876543210"
//                                             {...field}
//                                             className="focus-visible:ring-yellow-500"
//                                         />
//                                     </FormControl>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />

//                         <FormField
//                             control={form.control}
//                             name="position"
//                             render={({ field }) => (
//                                 <FormItem>
//                                     <FormLabel>Position</FormLabel>
//                                     <Select
//                                         onValueChange={field.onChange}
//                                         defaultValue={field.value}
//                                     >
//                                         <FormControl>
//                                             <SelectTrigger className="focus-visible:ring-yellow-500">
//                                                 <SelectValue placeholder="Select a position" />
//                                             </SelectTrigger>
//                                         </FormControl>
//                                         <SelectContent>
//                                             {positions.map((position) => (
//                                                 <SelectItem
//                                                     key={position.id}
//                                                     value={position.label}
//                                                 >
//                                                     {position.label}
//                                                 </SelectItem>
//                                             ))}
//                                         </SelectContent>

//                                     </Select>
//                                     <FormMessage />
//                                 </FormItem>
//                             )}
//                         />
//                     </div>

//                     <FormField
//                         control={form.control}
//                         name="resume"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>Resume</FormLabel>
//                                 <FormControl>
//                                     <div className="flex flex-col items-center justify-center w-full">
//                                         <label
//                                             htmlFor="resume-upload"
//                                             className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-200 border-dashed rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100"
//                                         >
//                                             <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                                                 <Upload className="w-8 h-8 mb-3 text-yellow-500" />
//                                                 <p className="mb-2 text-sm text-gray-500">
//                                                     <span className="font-semibold">Click to upload</span> or drag and drop
//                                                 </p>
//                                                 <p className="text-xs text-gray-500">DOC, DOCX or PDF (MAX. 1MB)</p>
//                                             </div>
//                                             <input
//                                                 id="resume-upload"
//                                                 type="file"
//                                                 className="hidden"
//                                                 accept=".doc,.docx,.pdf"
//                                                 onChange={(e) => {
//                                                     const files = e.target.files;
//                                                     if (files?.length) {
//                                                         field.onChange(files);
//                                                     }
//                                                 }}
//                                             />
//                                         </label>
//                                         {field.value && field.value[0] && (
//                                             <p className="mt-2 text-sm text-gray-700">
//                                                 <span className="font-semibold">Uploaded:</span> {field.value[0].name}
//                                             </p>
//                                         )}
//                                     </div>
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />

//                     <FormField
//                         control={form.control}
//                         name="coverLetter"
//                         render={({ field }) => (
//                             <FormItem>
//                                 <FormLabel>Cover Letter (Optional)</FormLabel>
//                                 <FormControl>
//                                     <textarea
//                                         placeholder="Tell us why you're interested in this position"
//                                         className="flex min-h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
//                                         {...field}
//                                     />
//                                 </FormControl>
//                                 <FormMessage />
//                             </FormItem>
//                         )}
//                     />

//                     <Button
//                         type="submit"
//                         className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
//                         disabled={isSubmitting}
//                     >
//                         {isSubmitting ? "Submitting..." : "Submit Application"}
//                     </Button>
//                 </form>
//             </Form>

//         </>
//     );
// }
