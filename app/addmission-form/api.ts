import axios from "axios";
const API_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const submitApplication = async (data: any) => {
  const formData = new FormData();
  
  // Personal details
  formData.append("first_name", data.firstName);
  formData.append("last_name", data.lastName);
  formData.append("email", data.email);
  formData.append("phone", data.phone);
  formData.append("father_name", data.fatherName);
  formData.append("mother_name", data.motherName);
  formData.append("gender", data.gender);
  formData.append("category", data.category);
  formData.append("religion", data.religion);
  formData.append("date_of_birth", data.dateOfBirth);
  formData.append("permanent_address", data.permanentAddress);
  formData.append("temporary_address", data.temporaryAddress || "");
  formData.append("aadhar_number", data.aadharNumber || "");
  
  // Program details
  formData.append("course_id", data.courseId);
  
  // Payment details (optional)
  if (data.paymentAmount !== undefined) {
    formData.append("payment_amount", data.paymentAmount.toString());
  }
  if (data.paymentStatus !== undefined) {
    formData.append("payment_status", data.paymentStatus.toString());
  }
  if (data.razorpayOrderId) {
    formData.append("razorpay_order_id", data.razorpayOrderId);
  }
  if (data.razorpayPaymentId) {
    formData.append("razorpay_payment_id", data.razorpayPaymentId);
  }
  if (data.razorpaySignature) {
    formData.append("razorpay_signature", data.razorpaySignature);
  }
  
  // Terms
  formData.append("termsAccepted", String(data.termsAccepted));
  
  // Convert education array to match backend format
  if (data.educationDetails && Array.isArray(data.educationDetails)) {
    const educationArray = data.educationDetails.map((edu: any) => ({
      class_level: edu.classLevel,
      institution_name: edu.institutionName,
      stream: edu.stream,
      year_of_passing: edu.yearOfPassing,
      grade: edu.grade,
      duration: edu.duration
    }));
    formData.append("education", JSON.stringify(educationArray));
  }
  
  // Files
  // 1. Profile Photo (single file)
  if (data.profilePhoto) {
    formData.append("profilePhoto", data.profilePhoto);
  }
  
  // 2. Education Documents (one per education record)
  if (data.educationDetails && Array.isArray(data.educationDetails)) {
    data.educationDetails.forEach((edu: any) => {
      if (edu.document) {
        formData.append("educationDocuments", edu.document);
      }
    });
  }
  
  // 3. Other Documents (Aadhar, PAN, etc.)
  if (data.documents && Array.isArray(data.documents)) {
    data.documents.forEach((doc: any) => {
      if (doc.file) {
        const blob = new Blob([doc.file], { type: doc.file.type });
        const renamedFile = new File([blob], `${doc.fileType}_${doc.file.name}`, { type: doc.file.type });
        formData.append("otherDocuments", renamedFile);
      }
    });
  }
  
  try {
    const response = await axios.post(
      `${API_BASE_URL}/student/add`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
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

export const submitPayment = async (studentId: string, paymentData: any) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/student/${studentId}/payment`,
      paymentData
    );
    return response.data;
  } catch (error: any) {
    const message =
      error?.response?.data?.message ||
      error.message ||
      "Failed to submit payment";
    throw new Error(message);
  }
};

export const createPaymentOrder = async ({
  courseId,
}: {
  courseId: string;
}) => {
  const response = await fetch(
    `${API_BASE_URL}/payment/create-order`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ courseId }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to create payment order");
  }

  return await response.json();
};

export const fetchAllPaidCourse = async () => {
  try {
    const res = await axios.get(`${API_BASE_URL}/courses/fetchAllPaidCourse`);
    return res.data;
  } catch (error) {
    console.error("Failed to fetch course types", error);
    throw error;
  }
};