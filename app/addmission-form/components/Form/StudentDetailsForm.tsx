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
  X,
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
  profilePhotoPreview: string | null  
  aadharNumber: string
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
    permanentAddress: data.permanentAddress || "",
    temporaryAddress: data.temporaryAddress || "",
    dateOfBirth: data.dateOfBirth || ""
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Set<string>>(new Set())
  const [showErrors, setShowErrors] = useState<Set<string>>(new Set())

  // Sync with parent data
  useEffect(() => {
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
      permanentAddress: data.permanentAddress || "",
      temporaryAddress: data.temporaryAddress || "",
      dateOfBirth: data.dateOfBirth || ""
    }

    const hasChanges = Object.keys(cleanData).some(key => {
      const cleanKey = key as keyof FormData
      return cleanData[cleanKey] !== formData[cleanKey]
    })

    if (hasChanges) {
      setFormData(cleanData)
    }
  }, [data])

  // Validate field on change
  const validateField = useCallback((field: keyof FormData, value: any): string => {
    switch (field) {
      case 'firstName':
      case 'lastName':
      case 'fatherName':
      case 'motherName':
        if (!value?.trim()) return `${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`
        if (value.length < 2) return `${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} must be at least 2 characters`
        if (!/^[a-zA-Z\s]+$/.test(value)) return `${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} can only contain letters and spaces`
        return ''

      case 'email':
        if (!value?.trim()) return 'Email is required'
        if (!/\S+@\S+\.\S+/.test(value)) return 'Please enter a valid email address'
        if (value.length > 150) return 'Email must be less than 150 characters'
        return ''

      case 'phone':
        if (!value?.trim()) return 'Phone number is required'
        const phoneDigits = value.replace(/\D/g, '')
        if (!/^\d{10}$/.test(phoneDigits)) return 'Phone number must be exactly 10 digits'
        if (!/^[6-9]\d{9}$/.test(phoneDigits)) return 'Phone number must start with 6,7,8, or 9'
        return ''

      case 'aadharNumber':
        if (!value?.trim()) return 'Aadhar number is required'
        if (!/^\d{12}$/.test(value)) return 'Aadhar number must be exactly 12 digits'
        if (!/^[2-9]\d{11}$/.test(value)) return 'Aadhar number must be valid (starting with 2-9)'
        return ''

      case 'permanentAddress':
        if (!value?.trim()) return 'Permanent address is required'
        if (value.length < 10) return 'Address must be at least 10 characters'
        return ''

      case 'dateOfBirth':
        if (!value) return 'Date of birth is required'
        const dob = new Date(value)
        const today = new Date()
        const minAge = new Date(today.getFullYear() - 100, today.getMonth(), today.getDate())
        const maxAge = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate())
        
        if (dob < minAge) return 'Age must be less than 100 years'
        if (dob > maxAge) return 'You must be at least 16 years old'
        return ''

      case 'gender':
      case 'category':
      case 'religion':
        return !value ? `${field.charAt(0).toUpperCase() + field.slice(1)} is required` : ''

      case 'profilePhoto':
        if (!value) return 'Profile photo is required'
        return ''

      default:
        return ''
    }
  }, [])

  // Handle field change with validation
  const handleChange = useCallback((field: keyof FormData, value: string) => {
    // For phone field, allow only numbers and format
    if (field === 'phone') {
      value = value.replace(/\D/g, '').slice(0, 10)
    }
    
    // For aadhar number, allow only numbers
    if (field === 'aadharNumber') {
      value = value.replace(/\D/g, '').slice(0, 12)
    }
    
    // For name fields, allow only letters and spaces
    if (['firstName', 'lastName', 'fatherName', 'motherName'].includes(field)) {
      value = value.replace(/[^a-zA-Z\s]/g, '')
    }
    
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    
    onChange(field, value)
    setTouched(prev => new Set(prev.add(field)))
    
    // Validate and set error
    const error = validateField(field, value)
    if (error) {
      setErrors(prev => ({ ...prev, [field]: error }))
      setShowErrors(prev => new Set(prev.add(field)))
    } else {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[field]
        return newErrors
      })
      setShowErrors(prev => {
        const newSet = new Set(prev)
        newSet.delete(field)
        return newSet
      })
    }
  }, [onChange, validateField])

  const handleFileChange = useCallback(
    (field: "profilePhoto", file: File | null) => {
      if (field === "profilePhoto" && file === null) {
        setFormData(prev => {
          if (prev.profilePhotoPreview) {
            URL.revokeObjectURL(prev.profilePhotoPreview)
          }
          return {
            ...prev,
            profilePhoto: null,
            profilePhotoPreview: null
          }
        })

        onChange("profilePhoto", null)
        onChange("profilePhotoPreview", null)
        
        // Validate profile photo removal
        const error = validateField("profilePhoto", null)
        if (error) {
          setErrors(prev => ({ ...prev, ["profilePhoto"]: error }))
          setShowErrors(prev => new Set(prev.add("profilePhoto")))
        }
        return
      }

      if (field === "profilePhoto" && file) {
        // Validate file type and size
        const validTypes = ['image/jpeg', 'image/png', 'image/jpg']
        const maxSize = 2 * 1024 * 1024 // 2MB
        
        if (!validTypes.includes(file.type)) {
          const error = 'Profile photo must be JPG or PNG format'
          setErrors(prev => ({ ...prev, ["profilePhoto"]: error }))
          setShowErrors(prev => new Set(prev.add("profilePhoto")))
          return
        }
        
        if (file.size > maxSize) {
          const error = 'Profile photo must be less than 2MB'
          setErrors(prev => ({ ...prev, ["profilePhoto"]: error }))
          setShowErrors(prev => new Set(prev.add("profilePhoto")))
          return
        }

        const previewUrl = URL.createObjectURL(file)
        setFormData(prev => ({
          ...prev,
          profilePhoto: file,
          profilePhotoPreview: previewUrl
        }))

        onChange("profilePhoto", file)
        onChange("profilePhotoPreview", previewUrl)
        
        // Clear error if validation passes
        setErrors(prev => {
          const newErrors = { ...prev }
          delete newErrors["profilePhoto"]
          return newErrors
        })
        setShowErrors(prev => {
          const newSet = new Set(prev)
          newSet.delete("profilePhoto")
          return newSet
        })
      }
    },
    [onChange, validateField]
  )

  // Close error message
  const closeError = (field: string) => {
    setShowErrors(prev => {
      const newSet = new Set(prev)
      newSet.delete(field)
      return newSet
    })
  }

  // Helper functions for styling
  const getInputClass = (field: string) => {
    const baseClass = "w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
    const errorClass = errors[field] ? "border-red-300 bg-red-50 focus:ring-red-500" : "border-gray-300 hover:border-gray-400"
    const successClass = touched.has(field) && !errors[field] && formData[field as keyof FormData] ? "border-green-300" : ""
    return `${baseClass} ${errorClass} ${successClass}`
  }

  const getSelectClass = (field: string) => {
    const baseClass = "w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
    const errorClass = errors[field] ? "border-red-300 bg-red-50 focus:ring-red-500" : "border-gray-300 hover:border-gray-400"
    const successClass = touched.has(field) && !errors[field] && formData[field as keyof FormData] ? "border-green-300" : ""
    return `${baseClass} ${errorClass} ${successClass}`
  }

  const getTextareaClass = (field: string) => {
    const baseClass = "w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
    const errorClass = errors[field] ? "border-red-300 bg-red-50 focus:ring-red-500" : "border-gray-300 hover:border-gray-400"
    const successClass = touched.has(field) && !errors[field] && formData[field as keyof FormData] ? "border-green-300" : ""
    return `${baseClass} ${errorClass} ${successClass}`
  }

  // Error display component
  const ErrorMessage = ({ field }: { field: string }) => {
    if (!showErrors.has(field) || !errors[field]) return null
    
    return (
      <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 animate-in slide-in-from-top-1 duration-200">
        <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-red-600">{errors[field]}</p>
        </div>
        <button
          type="button"
          onClick={() => closeError(field)}
          className="p-1 hover:bg-red-100 rounded transition-colors flex-shrink-0"
        >
          <X className="w-3 h-3 text-red-600" />
        </button>
      </div>
    )
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
                  onBlur={() => setShowErrors(prev => new Set(prev.add("firstName")))}
                  className={getInputClass("firstName")}
                  placeholder="Enter your first name"
                  style={{ paddingLeft: '2.75rem' }}
                />
              </div>
              <ErrorMessage field="firstName" />
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
                  onBlur={() => setShowErrors(prev => new Set(prev.add("lastName")))}
                  className={getInputClass("lastName")}
                  placeholder="Enter your last name"
                  style={{ paddingLeft: '2.75rem' }}
                />
              </div>
              <ErrorMessage field="lastName" />
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
                  onBlur={() => setShowErrors(prev => new Set(prev.add("email")))}
                  className={getInputClass("email")}
                  placeholder="student@example.com"
                  style={{ paddingLeft: '2.75rem' }}
                />
              </div>
              <ErrorMessage field="email" />
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
                  onBlur={() => setShowErrors(prev => new Set(prev.add("phone")))}
                  className={getInputClass("phone")}
                  placeholder="10-digit mobile number"
                  maxLength={10}
                  style={{ paddingLeft: '2.75rem' }}
                />
              </div>
              <ErrorMessage field="phone" />
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
                onBlur={() => setShowErrors(prev => new Set(prev.add("fatherName")))}
                className={getInputClass("fatherName")}
                placeholder="Enter father's full name"
              />
              <ErrorMessage field="fatherName" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mother's Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.motherName}
                onChange={e => handleChange("motherName", e.target.value)}
                onBlur={() => setShowErrors(prev => new Set(prev.add("motherName")))}
                className={getInputClass("motherName")}
                placeholder="Enter mother's full name"
              />
              <ErrorMessage field="motherName" />
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
                  onBlur={() => setShowErrors(prev => new Set(prev.add("dateOfBirth")))}
                  className={getInputClass("dateOfBirth")}
                  style={{ paddingLeft: '2.75rem' }}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
              <ErrorMessage field="dateOfBirth" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gender <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.gender}
                onChange={e => handleChange("gender", e.target.value)}
                onBlur={() => setShowErrors(prev => new Set(prev.add("gender")))}
                className={getSelectClass("gender")}
              >
                <option value="">Select Gender</option>
                {genderOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ErrorMessage field="gender" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.category}
                onChange={e => handleChange("category", e.target.value)}
                onBlur={() => setShowErrors(prev => new Set(prev.add("category")))}
                className={getSelectClass("category")}
              >
                <option value="">Select Category</option>
                {categoryOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ErrorMessage field="category" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Religion <span className="text-red-500">*</span>
              </label>
              <select
                value={formData.religion}
                onChange={e => handleChange("religion", e.target.value)}
                onBlur={() => setShowErrors(prev => new Set(prev.add("religion")))}
                className={getSelectClass("religion")}
              >
                <option value="">Select Religion</option>
                {religionOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ErrorMessage field="religion" />
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
                onBlur={() => setShowErrors(prev => new Set(prev.add("permanentAddress")))}
                className={getTextareaClass("permanentAddress")}
                placeholder="House number, Street, Area, City, State, Pincode"
                rows={3}
              />
              <ErrorMessage field="permanentAddress" />
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

        {/* Document Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Shield className="w-5 h-5 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">Identification</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Profile Photo <span className="text-red-500">*</span>
              </label>
              <div className={`border-2 ${errors.profilePhoto ? 'border-red-300 bg-red-50' : 'border-gray-300 hover:border-blue-400'} rounded-xl p-6 text-center transition-all duration-200`}>
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
              <ErrorMessage field="profilePhoto" />
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
                  onBlur={() => setShowErrors(prev => new Set(prev.add("aadharNumber")))}
                  className={getInputClass("aadharNumber")}
                  placeholder="12-digit Aadhar number"
                  maxLength={12}
                  style={{ paddingLeft: '2.75rem' }}
                />
              </div>
              <ErrorMessage field="aadharNumber" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}