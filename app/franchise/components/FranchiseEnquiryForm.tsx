// "use client";
// import { useEffect, useState, useRef } from "react";

// const STATES = [
//   "Andhra Pradesh",
//   "Arunachal Pradesh",
//   "Assam",
//   "Bihar",
//   "Chhattisgarh",
//   "Goa",
//   "Gujarat",
//   "Haryana",
//   "Himachal Pradesh",
//   "Jharkhand",
//   "Karnataka",
//   "Kerala",
//   "Madhya Pradesh",
//   "Maharashtra",
//   "Manipur",
//   "Meghalaya",
//   "Mizoram",
//   "Nagaland",
//   "Odisha",
//   "Punjab",
//   "Rajasthan",
//   "Sikkim",
//   "Tamil Nadu",
//   "Telangana",
//   "Tripura",
//   "Uttar Pradesh",
//   "Uttarakhand",
//   "West Bengal",
//   "Andaman and Nicobar Islands",
//   "Chandigarh",
//   "Dadra and Nagar Haveli and Daman and Diu",
//   "Delhi",
//   "Jammu and Kashmir",
//   "Ladakh",
//   "Lakshadweep",
//   "Puducherry",
// ];

// const CITIES = [
//   "Agra",
//   "Ahmedabad",
//   "Ajmer",
//   "Alwar",
//   "Amritsar",
//   "Anand",
//   "Aurangabad",
//   "Bengaluru",
//   "Bhopal",
//   "Bhubaneswar",
//   "Bikaner",
//   "Bilaspur",
//   "Bhilwara",
//   "Bhavnagar",
//   "Chandigarh",
//   "Chennai",
//   "Coimbatore",
//   "Cuttack",
//   "Calicut",
//   "Delhi",
//   "Dehradun",
//   "Dhanbad",
//   "Durg",
//   "Faridabad",
//   "Gandhinagar",
//   "Ghaziabad",
//   "Gorakhpur",
//   "Gurugram",
//   "Guwahati",
//   "Gwalior",
//   "Hyderabad",
//   "Hisar",
//   "Hubballi",
//   "Haridwar",
//   "Indore",
//   "Jaipur",
//   "Jaisalmer",
//   "Jalandhar",
//   "Jammu",
//   "Jamnagar",
//   "Jodhpur",
//   "Junagadh",
//   "Jabalpur",
//   "Kanpur",
//   "Kalyan",
//   "Karnal",
//   "Kochi",
//   "Kolkata",
//   "Kolhapur",
//   "Kota",
//   "Lucknow",
//   "Ludhiana",
//   "Mumbai",
//   "Mysuru",
//   "Madurai",
//   "Mangaluru",
//   "Meerut",
//   "Morbi",
//   "Nagpur",
//   "Nashik",
//   "Noida",
//   "Pune",
//   "Patna",
//   "Panipat",
//   "Prayagraj",
//   "Patiala",
//   "Rajkot",
//   "Raipur",
//   "Ranchi",
//   "Rourkela",
//   "Surat",
//   "Sikar",
//   "Srinagar",
//   "Shimla",
//   "Salem",
//   "Solapur",
//   "Thane",
//   "Trichy",
//   "Trivandrum",
//   "Tiruppur",
//   "Udaipur",
//   "Ujjain",
//   "Vadodara",
//   "Varanasi",
//   "Vellore",
// ];

// const investmentBudgets = [
//   "₹5-10 Lakhs",
//   "₹10-20 Lakhs",
//   "₹20 Lakhs+",
// ];

// const franchiseModels = [
//   "Training Center",
//   "School Campus",
//   "Studio Model",
// ];

// const INITIAL_FORM = {
//   name: "",
//   phone: "",
//   email: "",
//   city: "",
//   state: "",
//   budget: "",
//   model: "",
//   profession: "",
// };


// export default function FranchiseEnquiryForm() {
//   const [formData, setFormData] = useState(INITIAL_FORM);
//   const [errors, setErrors] = useState({});
//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);

//   const triggerRef = useRef(null);

//   useEffect(() => {
//     if (success)
//       alert("Enquiry submitted successfully! Our team will contact you soon.");
//   }, [success]);

//   useEffect(() => {
//     const btn = document.getElementById("enrollBtn");
//     if (!btn) return;

//     const showAfter = 400; // hero approx height (px)

//     const handleScroll = () => {
//       if (window.scrollY > showAfter) {
//         btn.classList.remove("opacity-0", "pointer-events-none");
//         btn.classList.add("opacity-100");
//       } else {
//         btn.classList.add("opacity-0", "pointer-events-none");
//         btn.classList.remove("opacity-100");
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     handleScroll();

//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const handleChange = ({ target: { name, value } }) => {
//     let v = value;
//     if (name === "email") v = v.toLowerCase().replace(/\s+/g, "");
//     if (name === "phone") v = v.replace(/\D/g, "");
//     if (name === "name" || name === "profession") v = v.replace(/\s+/g, " ");
//     setFormData((p) => ({ ...p, [name]: v }));
//     setErrors((e) => ({ ...e, [name]: "" }));
//   };

//   const handleBlur = ({ target: { name, value } }) =>
//     setFormData((p) => ({ ...p, [name]: value.trim() }));

//   const validate = () => {
//     const e = {};
//     if (formData.name.trim().length < 3)
//       e.name = "Please enter a valid full name";
//     if (!/^\d{10}$/.test(formData.phone))
//       e.phone = "Enter a valid 10-digit phone number";
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
//       e.email = "Enter a valid email address";
//     if (!formData.city) e.city = "Select your city";
//     if (!formData.state) e.state = "Select your state";
//     if (!formData.budget) e.budget = "Select budget range";
//     if (!formData.model) e.model = "Select franchise model";
//     if (formData.profession.trim().length < 3)
//       e.profession = "Enter your profession";
//     setErrors(e);
//     return !Object.keys(e).length;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!validate()) return;
//     setLoading(true);
//     setTimeout(() => {
//       setLoading(false);
//       setSuccess(true);
//       setFormData(INITIAL_FORM);
//       setTimeout(() => setSuccess(false), 4000);
//     }, 1500);
//   };

//   const inputClass =
//     "box-border h-[52px] w-full rounded-xl border border-gray-300 bg-white/90 px-4 text-gray-800 outline-none transition-all duration-300 focus:border-red-500 focus:ring-2 focus:ring-red-400/40";

//   const errorText = "text-sm text-red-500 mt-1";

//   return (
//     <section id="enquiry-form" className="bg-yellow-50 py-16 sm:py-20 md:py-24">
//       <div
//         ref={triggerRef}
//         className="group mb-12 sm:mb-16 md:mb-20 text-center text-5xl w-full py-12 bg-linear-to-r from-yellow-400 via-orange-500 to-yellow-400 text-black font-bold border-4 border-yellow-400 transition-all duration-300 ease-in-out hover:bg-linear-to-l hover:from-yellow-500 hover:via-orange-600 hover:to-yellow-500 hover:text-white poppins_2f5dafbd-module__T0Ek7a__className"
//       >
//         <h1 className="text-5xl w-full sm:text-4xl md:text-5xl font-bold tracking-widest text-gray-800 transition-all duration-500 ease-in-out group-hover:text-white hover:scale-105">
//           FRANCHISE ENQUIRY
//         </h1>
//         <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-base sm:text-lg">
//           Explore franchise opportunities with Inframe Design Institute
//         </p>
//       </div>

//       <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12">
//         <div className="grid grid-cols-1 lg:grid-cols-8 gap-8 lg:gap-10 items-stretch">
//           {/* LEFT SIDE */}
//           <div className="lg:col-span-4">
//             <div className="h-full rounded-3xl overflow-hidden bg-white/70 backdrop-blur-lg shadow-xl border border-white/40 flex flex-col">
//               <iframe
//                 title="Institute Map"
//                 src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4402.294141288112!2d72.98366907607904!3d26.270182887406257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x67b93f41c21a1b33%3A0x75c39459005a6414!2sInframe%20School%20of%20Art%2C%20Design%20%26%20Business!5e1!3m2!1sen!2sin!4v1740730217159!5m2!1sen!2sin"
//                 className="w-full h-60 sm:h-80 md:h-96 flex-1"
//                 loading="lazy"
//               />

//               <div className="p-4 sm:p-6 bg-white">
//                 <h3 className="text-lg sm:text-xl font-bold text-gray-800">
//                   Inframe Design Institute
//                 </h3>
//                 <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
//                   Visit our institute & be part of our growing network.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* RIGHT SIDE FORM (UNCHANGED) */}
//           <div className="lg:col-span-4">
//             <form
//               onSubmit={handleSubmit}
//               className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-6 sm:p-8 md:p-10 bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/40"
//             >
//               {["name", "phone", "email"].map((f) => (
//                 <div key={f}>
//                   <input
//                     name={f}
//                     placeholder={
//                       f === "name"
//                         ? "Full Name"
//                         : f === "phone"
//                         ? "Phone Number"
//                         : "Email Address"
//                     }
//                     maxLength={f === "phone" ? 10 : undefined}
//                     value={formData[f]}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     className={inputClass}
//                   />
//                   {errors[f] && <p className={errorText}>{errors[f]}</p>}
//                 </div>
//               ))}

//               <select
//                 name="state"
//                 value={formData.state}
//                 onChange={handleChange}
//                 className={inputClass}
//                 required
//               >
//                 <option value="" disabled>
//                   Select State
//                 </option>

//                 {STATES.map((s) => (
//                   <option key={s} value={s}>
//                     {s}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 name="city"
//                 value={formData.city}
//                 onChange={handleChange}
//                 className={inputClass}
//                 required
//               >
//                 <option value="" disabled>
//                   Select City
//                 </option>
//                 {CITIES.map((c, i) => (
//                   <option key={i} value={c}>
//                     {c}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 name="budget"
//                 value={formData.budget}
//                 onChange={handleChange}
//                 className={inputClass}
//                 required
//               >
//                 <option value="" disabled>
//                   Investment Budget
//                 </option>
//                 {investmentBudgets.map((b, i) => (
//                   <option key={i} value={b}>
//                     {b}
//                   </option>
//                 ))}
//               </select>

//               <select
//                 name="model"
//                 value={formData.model}
//                 onChange={handleChange}
//                 className={inputClass}
//                 required
//               >
//                 <option value="" disabled>
//                   Franchise Model
//                 </option>
//                 {franchiseModels.map((m, i) => (
//                   <option key={i} value={m}>
//                     {m}
//                   </option>
//                 ))}
//               </select>

//               <div className="md:col-span-2">
//                 <input
//                   name="profession"
//                   placeholder="Current Profession"
//                   value={formData.profession}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className={inputClass}
//                 />
//                 {errors.profession && (
//                   <p className={errorText}>{errors.profession}</p>
//                 )}
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="md:col-span-2 mt-2 sm:mt-4 bg-yellow-400 text-white py-3 sm:py-4 rounded-xl font-semibold tracking-wide hover:bg-yellow-500 transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-60 cursor-pointer"
//               >
//                 {loading ? "Submitting..." : "Submit Enquiry"}
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";

import { useEffect, useState, useRef } from "react";

const STATES = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

const CITIES = [
  "Agra",
  "Ahmedabad",
  "Ajmer",
  "Alwar",
  "Amritsar",
  "Anand",
  "Aurangabad",
  "Bengaluru",
  "Bhopal",
  "Bhubaneswar",
  "Bikaner",
  "Bilaspur",
  "Bhilwara",
  "Bhavnagar",
  "Chandigarh",
  "Chennai",
  "Coimbatore",
  "Cuttack",
  "Calicut",
  "Delhi",
  "Dehradun",
  "Dhanbad",
  "Durg",
  "Faridabad",
  "Gandhinagar",
  "Ghaziabad",
  "Gorakhpur",
  "Gurugram",
  "Guwahati",
  "Gwalior",
  "Hyderabad",
  "Hisar",
  "Hubballi",
  "Haridwar",
  "Indore",
  "Jaipur",
  "Jaisalmer",
  "Jalandhar",
  "Jammu",
  "Jamnagar",
  "Jodhpur",
  "Junagadh",
  "Jabalpur",
  "Kanpur",
  "Kalyan",
  "Karnal",
  "Kochi",
  "Kolkata",
  "Kolhapur",
  "Kota",
  "Lucknow",
  "Ludhiana",
  "Mumbai",
  "Mysuru",
  "Madurai",
  "Mangaluru",
  "Meerut",
  "Morbi",
  "Nagpur",
  "Nashik",
  "Noida",
  "Pune",
  "Patna",
  "Panipat",
  "Prayagraj",
  "Patiala",
  "Rajkot",
  "Raipur",
  "Ranchi",
  "Rourkela",
  "Surat",
  "Sikar",
  "Srinagar",
  "Shimla",
  "Salem",
  "Solapur",
  "Thane",
  "Trichy",
  "Trivandrum",
  "Tiruppur",
  "Udaipur",
  "Ujjain",
  "Vadodara",
  "Varanasi",
  "Vellore",
];

const investmentBudgets = ["₹5-10 Lakhs", "₹10-20 Lakhs", "₹20 Lakhs+"];
const franchiseModels = ["Training Center", "School Campus", "Studio Model"];

interface FormData {
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  budget: string;
  model: string;
  profession: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

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

export default function FranchiseEnquiryForm() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const triggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (success) alert("Enquiry submitted successfully! Our team will contact you soon.");
  }, [success]);

  useEffect(() => {
    const btn = document.getElementById("enrollBtn");
    if (!btn) return;

    const showAfter = 400; // hero approx height (px)

    const handleScroll = () => {
      if (window.scrollY > showAfter) {
        btn.classList.remove("opacity-0", "pointer-events-none");
        btn.classList.add("opacity-100");
      } else {
        btn.classList.add("opacity-0", "pointer-events-none");
        btn.classList.remove("opacity-100");
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let { name, value } = e.target;

    if (name === "email") value = value.toLowerCase().replace(/\s+/g, "");
    if (name === "phone") value = value.replace(/\D/g, "");
    if (name === "name" || name === "profession") value = value.replace(/\s+/g, " ");

    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value.trim() }));
  };

  const validate = (): boolean => {
    const e: FormErrors = {};

    if (formData.name.trim().length < 3) e.name = "Please enter a valid full name";
    if (!/^\d{10}$/.test(formData.phone)) e.phone = "Enter a valid 10-digit phone number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Enter a valid email address";
    if (!formData.city) e.city = "Select your city";
    if (!formData.state) e.state = "Select your state";
    if (!formData.budget) e.budget = "Select budget range";
    if (!formData.model) e.model = "Select franchise model";
    if (formData.profession.trim().length < 3) e.profession = "Enter your profession";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setFormData(INITIAL_FORM);
      setTimeout(() => setSuccess(false), 4000);
    }, 1500);
  };

  const inputClass =
    "box-border h-[52px] w-full rounded-xl border border-gray-300 bg-white/90 px-4 text-gray-800 outline-none transition-all duration-300 focus:border-red-500 focus:ring-2 focus:ring-red-400/40";
  const errorText = "text-sm text-red-500 mt-1";

  return (
    <section id="enquiry-form" className="bg-yellow-50 py-16 sm:py-20 md:py-24">
      <div
        ref={triggerRef}
        className="group mb-12 sm:mb-16 md:mb-20 text-center text-5xl w-full py-12 bg-linear-to-r from-yellow-400 via-orange-500 to-yellow-400 text-black font-bold border-4 border-yellow-400 transition-all duration-300 ease-in-out hover:bg-linear-to-l hover:from-yellow-500 hover:via-orange-600 hover:to-yellow-500 hover:text-white"
      >
        <h1 className="text-5xl w-full sm:text-4xl md:text-5xl font-bold tracking-widest text-gray-800 transition-all duration-500 ease-in-out group-hover:text-white hover:scale-105">
          FRANCHISE ENQUIRY
        </h1>
        <p className="mt-4 text-gray-600 max-w-3xl mx-auto text-base sm:text-lg">
          Explore franchise opportunities with Inframe Design Institute
        </p>
      </div>

      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-8 gap-8 lg:gap-10 items-stretch">
          {/* LEFT SIDE MAP */}
          <div className="lg:col-span-4">
            <div className="h-full rounded-3xl overflow-hidden bg-white/70 backdrop-blur-lg shadow-xl border border-white/40 flex flex-col">
              <iframe
                title="Institute Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4402.294141288112!2d72.98366907607904!3d26.270182887406257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x67b93f41c21a1b33%3A0x75c39459005a6414!2sInframe%20School%20of%20Art%2C%20Design%20%26%20Business!5e1!3m2!1sen!2sin!4v1740730217159!5m2!1sen!2sin"
                className="w-full h-60 sm:h-80 md:h-96 flex-1"
                loading="lazy"
              />
              <div className="p-4 sm:p-6 bg-white">
                <h3 className="text-lg sm:text-xl font-bold text-gray-800">
                  Inframe Design Institute
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
                  Visit our institute & be part of our growing network.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE FORM */}
          <div className="lg:col-span-4">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 p-6 sm:p-8 md:p-10 bg-white/70 backdrop-blur-lg rounded-3xl shadow-xl border border-white/40"
            >
              {["name", "phone", "email"].map((f) => (
                <div key={f}>
                  <input
                    name={f}
                    placeholder={
                      f === "name" ? "Full Name" : f === "phone" ? "Phone Number" : "Email Address"
                    }
                    maxLength={f === "phone" ? 10 : undefined}
                    value={formData[f as keyof FormData]}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass}
                  />
                  {errors[f as keyof FormData] && (
                    <p className={errorText}>{errors[f as keyof FormData]}</p>
                  )}
                </div>
              ))}

              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="" disabled>
                  Select State
                </option>
                {STATES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>

              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="" disabled>
                  Select City
                </option>
                {CITIES.map((c, i) => (
                  <option key={i} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <select
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="" disabled>
                  Investment Budget
                </option>
                {investmentBudgets.map((b, i) => (
                  <option key={i} value={b}>
                    {b}
                  </option>
                ))}
              </select>

              <select
                name="model"
                value={formData.model}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="" disabled>
                  Franchise Model
                </option>
                {franchiseModels.map((m, i) => (
                  <option key={i} value={m}>
                    {m}
                  </option>
                ))}
              </select>

              <div className="md:col-span-2">
                <input
                  name="profession"
                  placeholder="Current Profession"
                  value={formData.profession}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={inputClass}
                />
                {errors.profession && <p className={errorText}>{errors.profession}</p>}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="md:col-span-2 mt-2 sm:mt-4 bg-yellow-400 text-white py-3 sm:py-4 rounded-xl font-semibold tracking-wide hover:bg-yellow-500 transition-all duration-300 hover:scale-[1.02] active:scale-95 disabled:opacity-60 cursor-pointer"
              >
                {loading ? "Submitting..." : "Submit Enquiry"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
