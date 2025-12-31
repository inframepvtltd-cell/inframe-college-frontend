"use client"

import { useState, useEffect, useCallback } from "react"
import {
  User,
  Phone,
  Mail,
  Calendar,
  MapPin,
  Shield,
  Users,
  Camera,
  FileText,
  AlertCircle,
  CheckCircle,
  Loader2,
  ChevronRight
} from "lucide-react"

const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" }
]

const categoryOptions = [
  { value: "general", label: "General" },
  { value: "obc", label: "OBC" },
  { value: "sc", label: "SC" },
  { value: "st", label: "ST" },
  { value: "other", label: "Other" }
]

const religionOptions = [
  { value: "hinduism", label: "Hinduism" },
  { value: "islam", label: "Islam" },
  { value: "christianity", label: "Christianity" },
  { value: "sikhism", label: "Sikhism" },
  { value: "buddhism", label: "Buddhism" },
  { value: "jainism", label: "Jainism" },
  { value: "judaism", label: "Judaism" },
  { value: "other", label: "Other" }
]

interface FormData {
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
}

interface FormErrors {
  [key: string]: string
}

interface PersonalDetailsFormProps {
  data: Partial<FormData>;
  onChange: (field: any, value: any) => void;
}

export default function PersonalDetailsForm({ data, onChange }: PersonalDetailsFormProps) {
  // Initialize formData with data from props
  const [formData, setFormData] = useState<FormData>({
    firstName: data.firstName || "",
    lastName: data.lastName || "",
    email: data.email || "",
    phone: data.phone || "",
    fatherName: data.fatherName || "",
    motherName: data.motherName || "",
    gender: data.gender || "",
    category: data.category || "",
    religion: data.religion || "",
    profilePhoto: data.profilePhoto || null,
    profilePhotoPreview: data.profilePhotoPreview || "",
    aadharNumber: data.aadharNumber || "",
    aadharFile: data.aadharFile || null,
    permanentAddress: data.permanentAddress || "",
    temporaryAddress: data.temporaryAddress || "",
    dateOfBirth: data.dateOfBirth || ""
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Set<string>>(new Set())

  // Update local formData when parent data changes (only when data actually changes)
  useEffect(() => {
    // Create a clean copy of the data without functions
    const cleanData = {
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      email: data.email || "",
      phone: data.phone || "",
      fatherName: data.fatherName || "",
      motherName: data.motherName || "",
      gender: data.gender || "",
      category: data.category || "",
      religion: data.religion || "",
      profilePhoto: data.profilePhoto || null,
      profilePhotoPreview: data.profilePhotoPreview || "",
      aadharNumber: data.aadharNumber || "",
      aadharFile: data.aadharFile || null,
      permanentAddress: data.permanentAddress || "",
      temporaryAddress: data.temporaryAddress || "",
      dateOfBirth: data.dateOfBirth || ""
    }

    // Only update if there are actual differences
    const hasChanges = Object.keys(cleanData).some(key => {
      const cleanKey = key as keyof FormData
      return cleanData[cleanKey] !== formData[cleanKey]
    })

    if (hasChanges) {
      setFormData(cleanData)
    }
  }, [data]) // Only run when data prop changes

  const handleChange = useCallback((field: keyof FormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Immediately notify parent of change
    onChange(field, value)
    // setErrors(prev => ({ ...prev, [field]: undefined }))
    setTouched(prev => new Set(prev.add(field)))
  }, [onChange])

  const handleFileChange = useCallback((field: "profilePhoto" | "aadharFile", file: File | null) => {
    
    if (field === "profilePhoto" && file) {
      const previewUrl = URL.createObjectURL(file)
      setFormData(prev => ({
        ...prev,
        [field]: file,
        profilePhotoPreview: previewUrl
      }))
      onChange(field, file)
      onChange("profilePhotoPreview", previewUrl)
    } else {
      setFormData(prev => ({ ...prev, [field]: file }))
      onChange(field, file)
    }
    // setErrors(prev => ({ ...prev, [field]: undefined }))
  }, [onChange])

  const validateField = (field: keyof FormData, value: any): string => {
    switch (field) {
      case 'firstName':
      case 'lastName':
      case 'fatherName':
      case 'motherName':
        return !value?.trim() ? `${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required` : ''

      case 'email':
        if (!value?.trim()) return 'Email is required'
        if (!/\S+@\S+\.\S+/.test(value)) return 'Please enter a valid email address'
        return ''

      case 'phone':
        if (!value?.trim()) return 'Phone number is required'
        if (!/^\d{10}$/.test(value.replace(/\D/g, ''))) return 'Phone number must be 10 digits'
        return ''

      case 'aadharNumber':
        if (!value?.trim()) return 'Aadhar number is required'
        if (!/^\d{12}$/.test(value)) return 'Aadhar number must be 12 digits'
        return ''

      case 'permanentAddress':
        return !value?.trim() ? 'Permanent address is required' : ''

      case 'dateOfBirth':
        return !value ? 'Date of birth is required' : ''

      case 'gender':
      case 'category':
      case 'religion':
        return !value ? `${field.charAt(0).toUpperCase() + field.slice(1)} is required` : ''

      case 'profilePhoto':
        return !value ? 'Profile photo is required' : ''

      default:
        return ''
    }
  }

  const getInputClass = (field: string) => {
    const baseClass = "w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
    const errorClass = errors[field] ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
    const successClass = touched.has(field) && !errors[field] && formData[field as keyof FormData] ? "border-green-300" : ""
    return `${baseClass} ${errorClass} ${successClass}`
  }

  const getSelectClass = (field: string) => {
    const baseClass = "w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
    const errorClass = errors[field] ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
    const successClass = touched.has(field) && !errors[field] && formData[field as keyof FormData] ? "border-green-300" : ""
    return `${baseClass} ${errorClass} ${successClass}`
  }

  const getTextareaClass = (field: string) => {
    const baseClass = "w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
    const errorClass = errors[field] ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
    const successClass = touched.has(field) && !errors[field] && formData[field as keyof FormData] ? "border-green-300" : ""
    return `${baseClass} ${errorClass} ${successClass}`
  }

  return (
    <div className="py-8">
      <div className="space-y-8">
        {/* Personal Information Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <User className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Personal Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={e => handleChange("firstName", e.target.value)}
                  className={getInputClass("firstName")}
                  placeholder="Enter your first name"
                  style={{ paddingLeft: '2.75rem' }}
                />
              </div>
              {errors.firstName && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.firstName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={e => handleChange("lastName", e.target.value)}
                  className={getInputClass("lastName")}
                  placeholder="Enter your last name"
                  style={{ paddingLeft: '2.75rem' }}
                />
              </div>
              {errors.lastName && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.lastName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={e => handleChange("email", e.target.value)}
                  className={getInputClass("email")}
                  placeholder="student@example.com"
                  style={{ paddingLeft: '2.75rem' }}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.email}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={e => handleChange("phone", e.target.value)}
                  className={getInputClass("phone")}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  style={{ paddingLeft: '2.75rem' }}
                />
              </div>
              {errors.phone && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.phone}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Family Information Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <Users className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Family Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Father's Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.fatherName}
                onChange={e => handleChange("fatherName", e.target.value)}
                className={getInputClass("fatherName")}
                placeholder="Enter father's full name"
              />
              {errors.fatherName && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.fatherName}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mother's Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.motherName}
                onChange={e => handleChange("motherName", e.target.value)}
                className={getInputClass("motherName")}
                placeholder="Enter mother's full name"
              />
              {errors.motherName && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.motherName}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Demographic Information Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calendar className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Demographic Information</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={e => handleChange("dateOfBirth", e.target.value)}
                  className={getInputClass("dateOfBirth")}
                  style={{ paddingLeft: '2.75rem' }}
                />
              </div>
              {errors.dateOfBirth && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.dateOfBirth}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.gender}
                onChange={e => handleChange("gender", e.target.value)}
                className={getSelectClass("gender")}
              >
                <option value="">Select Gender</option>
                {genderOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.gender && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.gender}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={e => handleChange("category", e.target.value)}
                className={getSelectClass("category")}
              >
                <option value="">Select Category</option>
                {categoryOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.category}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Religion <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.religion}
                onChange={e => handleChange("religion", e.target.value)}
                className={getSelectClass("religion")}
              >
                <option value="">Select Religion</option>
                {religionOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {errors.religion && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.religion}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Address Information Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <MapPin className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Address Information</h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Permanent Address <span className="text-red-500">*</span>
              </label>
              <textarea
                value={formData.permanentAddress}
                onChange={e => handleChange("permanentAddress", e.target.value)}
                className={getTextareaClass("permanentAddress")}
                placeholder="House number, Street, Area, City, State, Pincode"
                rows={3}
              />
              {errors.permanentAddress && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.permanentAddress}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Temporary Address
              </label>
              <textarea
                value={formData.temporaryAddress}
                onChange={e => handleChange("temporaryAddress", e.target.value)}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none hover:border-gray-400"
                placeholder="If different from permanent address"
                rows={2}
              />
            </div>
          </div>
        </div>

        {/* Document Upload Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <FileText className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Document Upload</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Photo <span className="text-red-500">*</span>
              </label>
              <div className={`border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 ${errors.profilePhoto ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-blue-400'
                }`}>
                {formData.profilePhotoPreview ? (
                  <div className="space-y-4">
                    <div className="relative w-32 h-32 mx-auto">
                      <img
                        src={formData.profilePhotoPreview}
                        alt="Profile preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleFileChange("profilePhoto", null)}
                      className="text-sm text-red-600 hover:text-red-800"
                    >
                      Remove Photo
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                      <Camera className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <label className="cursor-pointer">
                        <span className="text-blue-600 font-medium">Click to upload</span>
                        <span className="text-gray-600"> or drag and drop</span>
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={e => handleFileChange("profilePhoto", e.target.files?.[0] || null)}
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-2">PNG, JPG up to 2MB</p>
                    </div>
                  </div>
                )}
              </div>
              {errors.profilePhoto && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.profilePhoto}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aadhar Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.aadharNumber}
                  onChange={e => handleChange("aadharNumber", e.target.value)}
                  className={getInputClass("aadharNumber")}
                  placeholder="12-digit Aadhar number"
                  maxLength={12}
                  style={{ paddingLeft: '2.75rem' }}
                />
              </div>
              {errors.aadharNumber && (
                <p className="mt-2 text-sm text-red-600 flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.aadharNumber}
                </p>
              )}

              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Aadhar Card Upload
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-4 text-center hover:border-blue-400 transition-colors">
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      className="hidden"
                      accept=".jpg,.jpeg,.png,.pdf"
                      onChange={e => handleFileChange("aadharFile", e.target.files?.[0] || null)}
                    />
                    <span className="text-blue-600 font-medium">Upload Aadhar Card</span>
                    <p className="text-xs text-gray-500 mt-1">JPG, PNG or PDF up to 5MB</p>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}