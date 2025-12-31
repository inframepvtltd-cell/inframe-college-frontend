import axios from "axios";
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

interface SubmitApplicationData {
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
    aadharNumber: string;
    permanentAddress: string;
    temporaryAddress: string;
    dateOfBirth: string;
    profilePhoto?: File;
    aadharFile?: File;

    // Education Details
    education: {
        classLevel: string;
        institutionName: string;
        stream: string;
        yearOfPassing: string;
        grade: string;
        duration: string;
    };
    educationDocument?: File;

    // Program Details
    courseType: string;
    programType: string;
    campus: string;

    // Terms
    termsAccepted: boolean;
}


const API_BASE = `${process.env.NEXT_PUBLIC_BASE_URL}`

export const submitApplication = async (data: SubmitApplicationData) => {
    const formData = new FormData();
    console.log(`${API_BASE}/student/add`);

    // Personal details
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
    formData.append("fatherName", data.fatherName);
    formData.append("motherName", data.motherName);
    formData.append("gender", data.gender);
    formData.append("category", data.category);
    formData.append("religion", data.religion);
    formData.append("aadharNumber", data.aadharNumber);
    formData.append("permanentAddress", data.permanentAddress);
    formData.append("temporaryAddress", data.temporaryAddress);
    formData.append("dateOfBirth", data.dateOfBirth);

    // Education
    formData.append("education", JSON.stringify(data.education));

    // Program
    formData.append("courseType", data.courseType);
    formData.append("programType", data.programType);
    formData.append("campus", data.campus);

    // Terms
    formData.append("termsAccepted", String(data.termsAccepted));

    // Files
    if (data.profilePhoto) {
        formData.append("profilePhoto", data.profilePhoto);
    }
    if (data.aadharFile) {
        formData.append("aadharFile", data.aadharFile);
    }
    if (data.educationDocument) {
        formData.append("educationDocument", data.educationDocument);
    }

    try {

        const response = await axios.post(
            `${API_BASE_URL}/student/add`,
            formData
        );

        return response.data;
    } catch (error: any) {
        const message =
            error?.response?.data?.message ||
            error.message ||
            "Failed to submit application";

        throw new Error(message);
    }
};


export const createPaymentOrder = async (amount: number) => {
    const response = await fetch(`${API_BASE_URL}/payment/create-order`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amount * 100 }), // Convert to paise
    });

    if (!response.ok) {
        throw new Error('Failed to create payment order');
    }

    return await response.json();
};