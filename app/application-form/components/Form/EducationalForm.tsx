"use client"

import { useState, useEffect } from "react"

interface EducationFormData {
  classLevel: string
  institutionName: string
  stream: string
  yearOfPassing: string
  grade: string
  duration: string
  document: File | null
}

interface EducationFormErrors {
  classLevel?: string
  institutionName?: string
  stream?: string
  yearOfPassing?: string
  grade?: string
  duration?: string
  document?: string
}

interface EducationDetailsFormProps {
  data: EducationFormData;
  onChange: (field: any, value: any) => void;
}

export default function EducationDetailsForm({ data, onChange }: EducationDetailsFormProps) {
  const [formData, setFormData] = useState<EducationFormData>(data)
  const [errors, setErrors] = useState<EducationFormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Update local formData when parent data changes
  useEffect(() => {
    setFormData(data)
  }, [data])

  const handleChange = (field: keyof EducationFormData, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    onChange(field, value)
    setErrors(prev => ({ ...prev, [field]: undefined }))
  }

  const validate = (): EducationFormErrors => {
    const newErrors: EducationFormErrors = {}
    if (!formData.classLevel.trim()) newErrors.classLevel = "Class / Level is required"
    if (!formData.institutionName.trim()) newErrors.institutionName = "Institution name is required"
    if (!formData.stream.trim()) newErrors.stream = "Stream / Subject is required"
    if (!formData.yearOfPassing.trim() || !/^\d{4}$/.test(formData.yearOfPassing)) newErrors.yearOfPassing = "Valid year is required"
    if (!formData.grade.trim()) newErrors.grade = "Grade / CGPA is required"
    if (!formData.duration.trim()) newErrors.duration = "Duration is required"
    if (!formData.document) newErrors.document = "Document upload is required"
    return newErrors
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const validationErrors = validate()
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }
    setIsSubmitting(true)
    console.log("Educational Details Submitted:", formData)
    setTimeout(() => setIsSubmitting(false), 1000)
  }

  return (
    <div className="py-8">
      <form onSubmit={handleSubmit} className="space-y-6">

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">Class / Level*</label>
            <input
              type="text"
              value={formData.classLevel}
              onChange={e => handleChange("classLevel", e.target.value)}
              className="w-full border px-3 py-2 rounded shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.classLevel && <p className="text-red-600 text-sm">{errors.classLevel}</p>}
          </div>
          <div>
            <label className="block font-medium text-gray-700">School / College / Institution Name*</label>
            <input
              type="text"
              value={formData.institutionName}
              onChange={e => handleChange("institutionName", e.target.value)}
              className="w-full border px-3 py-2 rounded shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.institutionName && <p className="text-red-600 text-sm">{errors.institutionName}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">Stream / Subject*</label>
            <input
              type="text"
              value={formData.stream}
              onChange={e => handleChange("stream", e.target.value)}
              className="w-full border px-3 py-2 rounded shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.stream && <p className="text-red-600 text-sm">{errors.stream}</p>}
          </div>
          <div>
            <label className="block font-medium text-gray-700">Year of Passing*</label>
            <input
              type="text"
              value={formData.yearOfPassing}
              onChange={e => handleChange("yearOfPassing", e.target.value)}
              className="w-full border px-3 py-2 rounded shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 2025"
              maxLength={4}
            />
            {errors.yearOfPassing && <p className="text-red-600 text-sm">{errors.yearOfPassing}</p>}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium text-gray-700">Grade / CGPA*</label>
            <input
              type="text"
              value={formData.grade}
              onChange={e => handleChange("grade", e.target.value)}
              className="w-full border px-3 py-2 rounded shadow-sm focus:ring-2 focus:ring-blue-500"
            />
            {errors.grade && <p className="text-red-600 text-sm">{errors.grade}</p>}
          </div>
          <div>
            <label className="block font-medium text-gray-700">Duration*</label>
            <input
              type="text"
              value={formData.duration}
              onChange={e => handleChange("duration", e.target.value)}
              className="w-full border px-3 py-2 rounded shadow-sm focus:ring-2 focus:ring-blue-500"
              placeholder="e.g. 2019-2023"
            />
            {errors.duration && <p className="text-red-600 text-sm">{errors.duration}</p>}
          </div>
        </div>

        <div>
          <label className="block font-medium text-gray-700">Upload Document*</label>
          <input
            type="file"
            onChange={e => handleChange("document", e.target.files?.[0] || null)}
            className="w-full border px-3 py-2 rounded shadow-sm"
          />
          {errors.document && <p className="text-red-600 text-sm">{errors.document}</p>}
        </div>
      </form>
    </div>
  )
}