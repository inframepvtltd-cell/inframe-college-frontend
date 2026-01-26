// "use client";

// import { useState } from "react";
// import { createFranchiseLead, FranchiseLead } from "../api";

// const STATES = [
//   "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa",
//   "Gujarat","Haryana","Himachal Pradesh","Jharkhand","Karnataka","Kerala",
//   "Madhya Pradesh","Maharashtra","Punjab","Rajasthan","Tamil Nadu",
//   "Telangana","Uttar Pradesh","Uttarakhand","West Bengal","Delhi",
// ];

// const CITIES = [
//   "Delhi","Mumbai","Pune","Jaipur","Ahmedabad","Surat","Bengaluru",
//   "Chennai","Hyderabad","Kolkata","Indore","Bhopal","Lucknow","Noida",
// ];

// const investmentBudgets = ["₹5-10 Lakhs", "₹10-20 Lakhs", "₹20 Lakhs+"];
// const franchiseModels = ["Training Center", "School Campus", "Studio Model"];

// interface FormData {
//   name: string;
//   phone: string;
//   email: string;
//   city: string;
//   state: string;
//   budget: string;
//   model: string;
//   profession: string;
// }
// type StateItem = {
//   id: string;
//   name: string;
// };

// type CityItem = {
//   id: string;
//   name: string;
// };


// type Errors = Partial<Record<keyof FormData, string>>;

// const INITIAL_FORM: FormData = {
//   name: "",
//   phone: "",
//   email: "",
//   city: "",
//   state: "",
//   budget: "",
//   model: "",
//   profession: "",
// };
// interface Props {
//   pdfUrl?: string | null; 
//   onClose?: () => void;
// }
// export default function FranchiseEnquiryFormOnly({pdfUrl,onClose}:Props) {
//   const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
//   const [errors, setErrors] = useState<Errors>({});
//   const [loading, setLoading] = useState(false);
//   const [states, setStates] = useState<StateItem[]>([]);
// const [cities, setCities] = useState<CityItem[]>([]);


//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
//   ) => {
//     let { name, value } = e.target;

//     if (name === "email") value = value.toLowerCase().replace(/\s+/g, "");
//     if (name === "phone") value = value.replace(/\D/g, "");
//     if (name === "name" || name === "profession") value = value.replace(/\s+/g, " ");

//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const validate = () => {
//     const e: Errors = {};
//     if (formData.name.trim().length < 3) e.name = "Enter full name";
//     if (!/^\d{10}$/.test(formData.phone)) e.phone = "Enter valid 10-digit number";
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
//       e.email = "Enter valid email";
//     if (!formData.state) e.state = "Select state";
//     if (!formData.city) e.city = "Select city";
//     if (!formData.budget) e.budget = "Select budget";
//     if (!formData.model) e.model = "Select model";
//     if (formData.profession.trim().length < 3)
//       e.profession = "Enter profession";

//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validate()) return;

//     setLoading(true);

//     try {
//       // ✅ Submit lead API
//       const leadData: FranchiseLead = {
//         name: formData.name,
//         phone_number: formData.phone,
//         email: formData.email,
//         state: formData.state,
//         city: formData.city,
//         investment_budget: formData.budget,
//         franchise_model: formData.model,
//         current_profession: formData.profession,
//       };

//       const result = await createFranchiseLead(leadData);

//       if (result) {
//         console.log("Lead created:", result);

//         // ✅ Download PDF after successful lead creation
//         if (pdfUrl) {
//           const link = document.createElement("a");
//           link.href = pdfUrl;
//           link.download = pdfUrl.split("/").pop() || "document.pdf";
//           document.body.appendChild(link);
//           link.click();
//           document.body.removeChild(link);
//         }

//         // ✅ Reset form and close modal
//         setFormData(INITIAL_FORM);
//         if (onClose) onClose();
//       } else {
//         alert("Failed to submit lead");
//       }
//     } catch (err) {
//       console.error("Lead submission error:", err);
//       alert("Something went wrong. Try again!");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const inputClass =
//     "h-[52px] w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-yellow-400";
//   const errorText = "text-sm text-red-500 mt-1";

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6"
//     >
//       {/* Name */}
//       <div>
//         <input
//           name="name"
//           placeholder="Full Name"
//           value={formData.name}
//           onChange={handleChange}
//           className={inputClass}
//         />
//         {errors.name && <p className={errorText}>{errors.name}</p>}
//       </div>

//       {/* Phone */}
//       <div>
//         <input
//           name="phone"
//           placeholder="Phone Number"
//           maxLength={10}
//           value={formData.phone}
//           onChange={handleChange}
//           className={inputClass}
//         />
//         {errors.phone && <p className={errorText}>{errors.phone}</p>}
//       </div>

//       {/* Email */}
//       <div>
//         <input
//           name="email"
//           placeholder="Email Address"
//           value={formData.email}
//           onChange={handleChange}
//           className={inputClass}
//         />
//         {errors.email && <p className={errorText}>{errors.email}</p>}
//       </div>

//       {/* State */}
//       <select
//         name="state"
//         value={formData.state}
//         onChange={handleChange}
//         className={inputClass}
//       >
//         <option value="">Select State</option>
//         {STATES.map((s) => (
//           <option key={s}>{s}</option>
//         ))}
//       </select>

//       {/* City */}
//       <select
//         name="city"
//         value={formData.city}
//         onChange={handleChange}
//         className={inputClass}
//       >
//         <option value="">Select City</option>
//         {CITIES.map((c) => (
//           <option key={c}>{c}</option>
//         ))}
//       </select>

//       {/* Budget */}
//       <select
//         name="budget"
//         value={formData.budget}
//         onChange={handleChange}
//         className={inputClass}
//       >
//         <option value="">Investment Budget</option>
//         {investmentBudgets.map((b) => (
//           <option key={b}>{b}</option>
//         ))}
//       </select>

//       {/* Model */}
//       <select
//         name="model"
//         value={formData.model}
//         onChange={handleChange}
//         className={inputClass}
//       >
//         <option value="">Franchise Model</option>
//         {franchiseModels.map((m) => (
//           <option key={m}>{m}</option>
//         ))}
//       </select>

//       {/* Profession */}
//       <div className="md:col-span-2">
//         <input
//           name="profession"
//           placeholder="Current Profession"
//           value={formData.profession}
//           onChange={handleChange}
//           className={inputClass}
//         />
//         {errors.profession && <p className={errorText}>{errors.profession}</p>}
//       </div>

//       <button
//         type="submit"
//         disabled={loading}
//         className="md:col-span-2 bg-yellow-400 text-white py-3 rounded-xl font-semibold"
//       >
//         {loading ? "Downloading Pdf..." : "Download PDF"}
//       </button>
//     </form>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import {
    createFranchiseLead,
  fetchCities,
  fetchStates,
  FranchiseLead,
 
} from "../api";
import { toast } from "sonner";

const investmentBudgets = ["₹5-10 Lakhs", "₹10-20 Lakhs", "₹20 Lakhs+"];
const franchiseModels = ["Training Center", "School Campus", "Studio Model"];

interface FormData {
  name: string;
  phone: string;
  email: string;
  city: string;   // city_id
  state: string;  // state_id
  budget: string;
  model: string;
  profession: string;
}

type StateItem = { id: string; name: string };
type CityItem = { id: string; name: string };

type Errors = Partial<Record<keyof FormData, string>>;

const INITIAL_FORM: FormData = {
  name: "",
  phone: "",
  email: "",
  city: "",
  state: "",
  budget: "",
  model: "",
  profession: "",
};

interface Props {
  pdfUrl?: string | null;
  onClose?: () => void;
}

export default function FranchiseEnquiryFormOnly({ pdfUrl, onClose }: Props) {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const [states, setStates] = useState<StateItem[]>([]);
  const [cities, setCities] = useState<CityItem[]>([]);

  
 useEffect(() => {
  fetchStates().then((data) => {
    console.log("States fetched:", data);
    setStates(data);
  });
}, []);



  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let { name, value } = e.target;

    if (name === "email") value = value.toLowerCase().replace(/\s+/g, "");
    if (name === "phone") value = value.replace(/\D/g, "");
    if (name === "name" || name === "profession")
      value = value.replace(/\s+/g, " ");

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };


  const handleStateChange = async (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const stateId = e.target.value;

    setFormData((prev) => ({
      ...prev,
      state: stateId,
      city: "",
    }));

    setCities([]);

    if (stateId) {
      const cityList = await fetchCities(stateId);
      setCities(cityList);
    }
  };

  
  const validate = () => {
    const e: Errors = {};
    if (formData.name.trim().length < 3) e.name = "Enter full name";
    if (!/^\d{10}$/.test(formData.phone)) e.phone = "Enter valid 10-digit number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Enter valid email";
    if (!formData.state) e.state = "Select state";
    if (!formData.city) e.city = "Select city";
    if (!formData.budget) e.budget = "Select budget";
    if (!formData.model) e.model = "Select model";
    if (formData.profession.trim().length < 3)
      e.profession = "Enter profession";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

const handleSubmit = async (e: React.FormEvent) => {
  console.log("Submit");
  e.preventDefault();
  if (!validate()) return;

  setLoading(true);

  try {
    const leadData: FranchiseLead = {
      name: formData.name,
      phone_number: formData.phone,
      email: formData.email,
      state: formData.state,
      city: formData.city,
      investment_budget: formData.budget,
      franchise_model: formData.model,
      current_profession: formData.profession,
    };

    const result = await createFranchiseLead(leadData);
    console.log("Lead Result:", result);

    if (result) {
      toast.success("Lead created successfully!");  

      if (pdfUrl) {
        // Open PDF in a new browser tab
        window.open(pdfUrl, "_blank");
      }

      setFormData(INITIAL_FORM);
      if (onClose) onClose();
    } else {
      toast.error("Failed to submit lead");
    }
  } catch (err) {
    console.error(err);
    toast.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};

//   const handleSubmit = async (e: React.FormEvent) => {
//     console.log("Sumbit")
//   e.preventDefault();
//   if (!validate()) return;

//   setLoading(true);

//   try {
//     const leadData: FranchiseLead = {
//       name: formData.name,
//       phone_number: formData.phone,
//       email: formData.email,
//       state: formData.state,
//       city: formData.city,
//       investment_budget: formData.budget,
//       franchise_model: formData.model,
//       current_profession: formData.profession,
//     };

//     const result = await createFranchiseLead(leadData);
//     console.log("Lead Result:", result);

//     if (result) {
//       toast.success("Lead created successfully!");  

//       if (pdfUrl) {
//         const link = document.createElement("a");
//         link.href = pdfUrl;
//         link.download = pdfUrl.split("/").pop() || "document.pdf";
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);
        
//       }

//       setFormData(INITIAL_FORM);
//       if (onClose) onClose();
//     } else {
//       toast.error("Failed to submit lead");
//     }
//   } catch (err) {
//     console.error(err);
//     toast.error("Something went wrong");
//   } finally {
//     setLoading(false);
//   }
// };

  const inputClass =
    "h-[52px] w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-yellow-400";
  const errorText = "text-sm text-red-500 mt-1";

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
      <input name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} className={inputClass} />
      <input name="phone" placeholder="Phone Number" maxLength={10} value={formData.phone} onChange={handleChange} className={inputClass} />
      <input name="email" placeholder="Email Address" value={formData.email} onChange={handleChange} className={inputClass} />

      {/* STATE */}
      <select name="state" value={formData.state} onChange={handleStateChange} className={inputClass}>
        <option value="">Select State</option>
        {states.map((s) => (
          <option key={s.id} value={s.id}>{s.name}</option>
        ))}
      </select>

      {/* CITY */}
      <select name="city" value={formData.city} onChange={handleChange} className={inputClass} disabled={!formData.state}>
        <option value="">Select City</option>
        {cities.map((c) => (
          <option key={c.id} value={c.id}>{c.name}</option>
        ))}
      </select>

      <select name="budget" value={formData.budget} onChange={handleChange} className={inputClass}>
        <option value="">Investment Budget</option>
        {investmentBudgets.map((b) => <option key={b}>{b}</option>)}
      </select>

      <select name="model" value={formData.model} onChange={handleChange} className={inputClass}>
        <option value="">Franchise Model</option>
        {franchiseModels.map((m) => <option key={m}>{m}</option>)}
      </select>

      <input name="profession" placeholder="Current Profession" value={formData.profession} onChange={handleChange} className={`${inputClass} md:col-span-2`} />

      <button type="submit" disabled={loading} className="md:col-span-2 bg-yellow-400 text-white py-3 rounded-xl font-semibold">
        {loading ? "Submitting..." : "Download PDF"}
      </button>
    </form>
  );
}
