import { useState, useEffect } from "react";

import { toast } from "sonner";
import { createFranchiseLead, fetchCities, fetchStates, FranchiseLead } from "../api";

const investmentBudgets = ["₹5-10 Lakhs", "₹10-20 Lakhs", "₹20 Lakhs+"];

interface FormData {
  name: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  budget: string;
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
  profession: "",
};

interface Props {
  pdfUrl?: string | null;
  enableDownload?: boolean;
  submitLabel?: string;
  onClose?: () => void;
}

export default function FranchiseEnquiryFormOnly({
  pdfUrl,
  enableDownload = false,
  submitLabel,
  onClose,
}: Props) {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM);
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const [states, setStates] = useState<StateItem[]>([]);
  const [cities, setCities] = useState<CityItem[]>([]);

  /* ================= FETCH STATES ================= */
  useEffect(() => {
    fetchStates().then(setStates);
  }, []);

  /* ================= HANDLERS ================= */
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

  /* ================= VALIDATION ================= */
  const validate = () => {
    const e: Errors = {};

    if (formData.name.trim().length < 3) e.name = "Enter full name";
    if (!/^\d{10}$/.test(formData.phone))
      e.phone = "Enter valid 10-digit number";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      e.email = "Enter valid email";
    if (!formData.state) e.state = "Select state";
    if (!formData.city) e.city = "Select city";
    if (!formData.budget) e.budget = "Select budget";
    if (formData.profession.trim().length < 3)
      e.profession = "Enter profession";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

if (!validate()) {
  return;
}

    setLoading(true);

    try {
      const leadData: FranchiseLead = {
        name: formData.name,
        phone_number: formData.phone,
        email: formData.email,
        state: formData.state,
        city: formData.city,
        investment_budget: formData.budget,
        current_profession: formData.profession,
      };

      const result = await createFranchiseLead(leadData);

      if (!result) {
        toast.error("Failed to submit lead");
        return;
      }

      console.clear();
      console.log(pdfUrl)
      if (enableDownload && pdfUrl) {
        window.open(pdfUrl, "_blank");
        toast.success("PDF downloaded successfully");
      } else {
        toast.success("Form submitted successfully");
      }

      setFormData(INITIAL_FORM);
      onClose?.();
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "h-[52px] w-full rounded-xl border border-gray-300 px-4 outline-none focus:border-yellow-400";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6"
    >
      <input
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        className={inputClass}
      />

      <input
        name="phone"
        placeholder="Phone Number"
        maxLength={10}
        value={formData.phone}
        onChange={handleChange}
        className={inputClass}
      />

      <input
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        className={inputClass}
      />

      {/* STATE */}
      <select
        name="state"
        value={formData.state}
        onChange={handleStateChange}
        className={inputClass}
      >
        <option value="">Select State</option>
        {states.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>

      {/* CITY */}
      <select
        name="city"
        value={formData.city}
        onChange={handleChange}
        className={inputClass}
        disabled={!formData.state}
      >
        <option value="">Select City</option>
        {cities.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* BUDGET */}
      <select
        name="budget"
        value={formData.budget}
        onChange={handleChange}
        className={inputClass}
      >
        <option value="">Investment Budget</option>
        {investmentBudgets.map((b) => (
          <option key={b}>{b}</option>
        ))}
      </select>

      <input
        name="profession"
        placeholder="Current Profession"
        value={formData.profession}
        onChange={handleChange}
        className={`${inputClass} md:col-span-2`}
      />

      <button
        type="submit"
        disabled={loading}
        className="md:col-span-2 bg-yellow-400 text-white py-3 rounded-xl font-semibold"
      >
        {loading
          ? "Submitting..."
          : submitLabel
          ? submitLabel
          : enableDownload
          ? "Download PDF"
          : "Submit Form"}
      </button>
    </form>
  );
}

