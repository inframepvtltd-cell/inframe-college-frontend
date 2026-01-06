"use client"

import { useState, useEffect } from "react"
import { X, AlertCircle, GraduationCap, School, BookOpen, Calendar, Award, Clock, FileText, Plus, Trash2 } from "lucide-react"

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
  [key: string]: string
}

interface EducationDetailsFormProps {
  data: EducationFormData[] | EducationFormData;
  onChange: (data: EducationFormData[]) => void;
}

// Define important education levels
const IMPORTANT_EDUCATION_LEVELS = ["10", "10th", "12", "12th", "tenth", "twelfth"];
const GRADUATION_LEVELS = ["bachelor", "bachelors", "btech", "be", "bsc", "ba", "bcom", "graduation", "degree"];

export default function EducationDetailsForm({ data, onChange }: EducationDetailsFormProps) {
  const initialData = Array.isArray(data) ? data : [data];

  const [formDataArray, setFormDataArray] = useState<EducationFormData[]>(initialData)
  const [errorsArray, setErrorsArray] = useState<Record<string, string>[]>([])
  const [touchedArray, setTouchedArray] = useState<Set<string>[]>([])
  const [showErrorsArray, setShowErrorsArray] = useState<Set<string>[]>([])

  useEffect(() => {
    if (data && Array.isArray(data) && data.length === 0) {
      const defaultData: EducationFormData[] = [
        {
          classLevel: '10th',
          institutionName: '',
          stream: '',
          yearOfPassing: '',
          grade: '',
          duration: '2',
          document: null
        },
        {
          classLevel: '12th',
          institutionName: '',
          stream: '',
          yearOfPassing: '',
          grade: '',
          duration: '2',
          document: null
        },
        {
          classLevel: 'Graduation',
          institutionName: '',
          stream: '',
          yearOfPassing: '',
          grade: '',
          duration: '3',
          document: null
        }
      ];
      setFormDataArray(defaultData);
      onChange(defaultData);
    } else {
      setFormDataArray(initialData);
    }
  }, [data, onChange]);

  useEffect(() => {
    const newData = Array.isArray(data) ? data : [data]
    setFormDataArray(newData)

    const initialErrors = Array(newData.length).fill({})
    const initialTouched = Array(newData.length).fill(new Set<string>())
    const initialShowErrors = Array(newData.length).fill(new Set<string>())

    setErrorsArray(initialErrors)
    setTouchedArray(initialTouched)
    setShowErrorsArray(initialShowErrors)
  }, [data])

  const removeEducation = (index: number) => {
    // Don't remove if it's a default education (10th, 12th, Graduation)
    const classLevel = formDataArray[index]?.classLevel?.toLowerCase();
    const isDefaultEducation = ['10th', '12th', '10', '12'].some(level =>
      classLevel?.includes(level.toLowerCase())
    );

    if (isDefaultEducation) {
      alert(`${formDataArray[index].classLevel} is a required education entry and cannot be removed`);
      return;
    }

    if (formDataArray.length <= 1) return;

    const updatedArray = formDataArray.filter((_, i) => i !== index);
    setFormDataArray(updatedArray);
    onChange(updatedArray);

    // Remove corresponding error/touched data
    setErrorsArray(errorsArray.filter((_, i) => i !== index));
    setTouchedArray(touchedArray.filter((_, i) => i !== index));
    setShowErrorsArray(showErrorsArray.filter((_, i) => i !== index));
  };

  // Check if education level is important (10th/12th)
  const isImportantEducation = (classLevel: string): boolean => {
    return IMPORTANT_EDUCATION_LEVELS.includes(classLevel.toLowerCase().trim());
  }

  // Check if education level is graduation
  const isGraduationEducation = (classLevel: string): boolean => {
    return GRADUATION_LEVELS.some(level => classLevel.toLowerCase().includes(level));
  }

  const validateField = (index: number, field: keyof EducationFormData, value: any): string => {
    const classLevel = formDataArray[index]?.classLevel?.toLowerCase().trim();
    const isImportant = isImportantEducation(formDataArray[index]?.classLevel || '');
    const isGraduation = isGraduationEducation(formDataArray[index]?.classLevel || '');

    // For graduation fields, make them optional
    if (isGraduation) {
      if (!value?.toString().trim()) {
        return ''; // No error if empty for graduation
      }
    }

    switch (field) {
      case 'classLevel':
        if (!value?.trim()) return 'Class / Level is required'
        if (value.length < 2) return 'Class / Level must be at least 2 characters'
        return ''

      case 'institutionName':
        if (!value?.trim()) {
          // For important education (10th/12th), institution is required
          if (isImportant) return 'Institution name is required'
          // For graduation, it's optional
          if (isGraduation) return ''
          // For others, it's required
          return 'Institution name is required'
        }
        if (value.length < 3) return 'Institution name must be at least 3 characters'
        return ''

      case 'stream':
        if (!value?.trim()) {
          // For important education (10th/12th), stream is required
          if (isImportant) return 'Stream / Subject is required'
          // For graduation, it's optional
          if (isGraduation) return ''
          // For others, it's required
          return 'Stream / Subject is required'
        }
        if (value.length < 2) return 'Stream / Subject must be at least 2 characters'
        return ''

      case 'yearOfPassing':
        if (!value?.trim()) {
          // For important education (10th/12th), year is required
          if (isImportant) return 'Year of passing is required'
          // For graduation, it's optional
          if (isGraduation) return ''
          // For others, it's required
          return 'Year of passing is required'
        }
        if (!/^\d{4}$/.test(value)) return 'Year must be 4 digits'

        const currentYear = new Date().getFullYear()
        const year = parseInt(value)
        if (year < 1900) return 'Year must be after 1900'
        if (year > currentYear + 5) return 'Year cannot be more than 5 years in the future'
        return ''

      case 'grade':
        if (!value?.trim()) {
          // For important education (10th/12th), grade is required
          if (isImportant) return 'Grade / CGPA is required'
          // For graduation, it's optional
          if (isGraduation) return ''
          // For others, it's required
          return 'Grade / CGPA is required'
        }
        if (!/^[0-9]+(\.[0-9]+)?(\s*[\/-]\s*[0-9]+(\.[0-9]+)?)?$/.test(value.trim()))
          return 'Enter valid grade (e.g., 8.5, 85%, 3.5/4.0)'
        return ''

      case 'duration':
        if (!value?.trim()) {
          // For important education (10th/12th), duration is required
          if (isImportant) return 'Duration is required'
          // For graduation, it's optional
          if (isGraduation) return ''
          // For others, it's required
          return 'Duration is required'
        }
        const num = parseInt(value.trim())
        if (isNaN(num) || num <= 0) return 'Enter a valid number greater than 0'
        return ''

      case 'document':
        if (!value) {
          // For important education (10th/12th), document is required
          if (isImportant) return 'Document upload is required'
          // For graduation, it's optional
          if (isGraduation) return ''
          // For others, it's required
          return 'Document upload is required'
        }
        if (value && !(value instanceof File)) return 'Please upload a valid file'
        if (value && value.size > 5 * 1024 * 1024) return 'File must be less than 5MB'
        return ''

      default:
        return ''
    }
  }

  const handleFieldChange = (index: number, field: keyof EducationFormData, value: string | File | null) => {
    const updatedArray = [...formDataArray]

    // Format specific fields
    if (field === 'yearOfPassing' && typeof value === 'string') {
      value = value.replace(/\D/g, '').slice(0, 4)
    }

    if (field === 'grade' && typeof value === 'string') {
      value = value.replace(/[^0-9./%\s–-]/g, '')
    }

    updatedArray[index] = { ...updatedArray[index], [field]: value }
    setFormDataArray(updatedArray)
    onChange(updatedArray)

    // Update touched
    const newTouched = [...touchedArray]
    newTouched[index] = new Set(newTouched[index]).add(field)
    setTouchedArray(newTouched)

    // Validate and set error
    const error = validateField(index, field, value)
    const newErrors = [...errorsArray]

    if (error) {
      newErrors[index] = { ...newErrors[index], [field]: error }
      const newShowErrors = [...showErrorsArray]
      newShowErrors[index] = new Set(newShowErrors[index]).add(field)
      setShowErrorsArray(newShowErrors)
    } else {
      const { [field]: removed, ...rest } = newErrors[index]
      newErrors[index] = rest
      const newShowErrors = [...showErrorsArray]
      newShowErrors[index] = new Set([...newShowErrors[index]].filter(f => f !== field))
      setShowErrorsArray(newShowErrors)
    }

    setErrorsArray(newErrors)
  }

  const handleFileChange = (index: number, file: File | null) => {
    const updatedArray = [...formDataArray]
    updatedArray[index] = { ...updatedArray[index], document: file }
    setFormDataArray(updatedArray)
    onChange(updatedArray)

    // Validate file
    const error = validateField(index, 'document', file)
    const newErrors = [...errorsArray]

    if (error) {
      newErrors[index] = { ...newErrors[index], document: error }
      const newShowErrors = [...showErrorsArray]
      newShowErrors[index] = new Set(newShowErrors[index]).add('document')
      setShowErrorsArray(newShowErrors)
    } else {
      const { document: removed, ...rest } = newErrors[index]
      newErrors[index] = rest
      const newShowErrors = [...showErrorsArray]
      newShowErrors[index] = new Set([...newShowErrors[index]].filter(f => f !== 'document'))
      setShowErrorsArray(newShowErrors)
    }

    setErrorsArray(newErrors)
  }

  const addEducation = () => {
    const newEntry: EducationFormData = {
      classLevel: '',
      institutionName: '',
      stream: '',
      yearOfPassing: '',
      grade: '',
      duration: '',
      document: null
    }

    const updatedArray = [...formDataArray, newEntry]
    setFormDataArray(updatedArray)
    onChange(updatedArray)

    // Initialize arrays for new entry
    setErrorsArray([...errorsArray, {}])
    setTouchedArray([...touchedArray, new Set<string>()])
    setShowErrorsArray([...showErrorsArray, new Set<string>()])
  }

  const closeError = (index: number, field: string) => {
    const newShowErrors = [...showErrorsArray]
    newShowErrors[index] = new Set([...newShowErrors[index]].filter(f => f !== field))
    setShowErrorsArray(newShowErrors)
  }

  const getInputClass = (index: number, field: string) => {
    const baseClass = "w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
    const errorClass = errorsArray[index]?.[field] ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
    const successClass = touchedArray[index]?.has(field) && !errorsArray[index]?.[field] && formDataArray[index][field as keyof EducationFormData] ? "border-green-300" : ""

    // Add special styling for important fields (10th/12th)
    const isImportant = isImportantEducation(formDataArray[index]?.classLevel || '');
    const importantClass = isImportant ? "border-blue-100 bg-blue-50" : "";

    return `${baseClass} ${errorClass} ${successClass} ${importantClass}`
  }

  const getFileUploadClass = (index: number) => {
    const baseClass = "border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200"
    const errorClass = errorsArray[index]?.document ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-blue-400"

    // Add special styling for important education
    const isImportant = isImportantEducation(formDataArray[index]?.classLevel || '');
    const importantClass = isImportant ? "bg-blue-50 border-blue-200" : ""

    return `${baseClass} ${errorClass} ${importantClass}`
  }

  const ErrorMessage = ({ index, field }: { index: number, field: string }) => {
    const error = errorsArray[index]?.[field]
    if (!showErrorsArray[index]?.has(field) || !error) return null

    return (
      <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2 animate-in slide-in-from-top-1 duration-200">
        <AlertCircle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm text-red-600">{error}</p>
        </div>
        <button
          type="button"
          onClick={() => closeError(index, field)}
          className="p-1 hover:bg-red-100 rounded transition-colors flex-shrink-0"
        >
          <X className="w-3 h-3 text-red-600" />
        </button>
      </div>
    )
  }

  // Check if current education is important (10th/12th)
  const isCurrentEducationImportant = (index: number): boolean => {
    return isImportantEducation(formDataArray[index]?.classLevel || '');
  }

  // Check if current education is graduation
  const isCurrentEducationGraduation = (index: number): boolean => {
    return isGraduationEducation(formDataArray[index]?.classLevel || '');
  }

  return (
    <div className="py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <GraduationCap className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Educational Details</h2>
              <p className="text-sm text-gray-600 mt-1">
                10th & 12th are required • Graduation fields are optional
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={addEducation}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add More
          </button>
        </div>

        {/* Important Notice */}
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-sm text-blue-800">
                <span className="font-semibold">Important:</span> 10th and 12th standard details are mandatory.
                Graduation and other education details are optional. You can add multiple education entries.
              </p>
            </div>
          </div>
        </div>

        {/* Education Forms */}
        {formDataArray.map((edu, index) => {
          const isImportant = isCurrentEducationImportant(index);
          const isGraduation = isCurrentEducationGraduation(index);

          return (
            <div key={index} className="bg-white border rounded-xl p-6 space-y-6 relative">
              {/* Remove Button */}
              {formDataArray.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}

              {/* Education Header with Indicator */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 ${isImportant ? 'bg-blue-100' : isGraduation ? 'bg-green-100' : 'bg-gray-100'} rounded-lg flex items-center justify-center`}>
                    <span className={`font-semibold ${isImportant ? 'text-blue-600' : isGraduation ? 'text-green-600' : 'text-gray-600'}`}>
                      {index + 1}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      Education {index + 1}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      {isImportant && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                          <span className="w-1.5 h-1.5 bg-blue-600 rounded-full"></span>
                          Required (10th/12th)
                        </span>
                      )}
                      {isGraduation && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span>
                          Optional (Graduation)
                        </span>
                      )}
                      {!isImportant && !isGraduation && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded-full">
                          <span className="w-1.5 h-1.5 bg-gray-600 rounded-full"></span>
                          Other Education
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Class / Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Class / Level <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <School className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={edu.classLevel}
                      onChange={e => handleFieldChange(index, 'classLevel', e.target.value)}
                      onBlur={() => {
                        const newShowErrors = [...showErrorsArray]
                        newShowErrors[index] = new Set(newShowErrors[index]).add('classLevel')
                        setShowErrorsArray(newShowErrors)
                      }}
                      className={getInputClass(index, 'classLevel')}
                      placeholder="e.g., 10th, 12th, B.Tech, MCA"
                      style={{ paddingLeft: '2.75rem' }}
                    />
                  </div>
                  <ErrorMessage index={index} field="classLevel" />
                  {isGraduation && (
                    <p className="mt-1 text-xs text-green-600">
                      Graduation level detected - following fields are optional
                    </p>
                  )}
                </div>

                {/* Institution Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Institution Name {!isGraduation && <span className="text-red-500">*</span>}
                    {isGraduation && <span className="text-green-600 text-xs ml-1">(Optional)</span>}
                  </label>
                  <div className="relative">
                    <School className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={edu.institutionName}
                      onChange={e => handleFieldChange(index, 'institutionName', e.target.value)}
                      onBlur={() => {
                        const newShowErrors = [...showErrorsArray]
                        newShowErrors[index] = new Set(newShowErrors[index]).add('institutionName')
                        setShowErrorsArray(newShowErrors)
                      }}
                      className={getInputClass(index, 'institutionName')}
                      placeholder="Name of school/college/university"
                      style={{ paddingLeft: '2.75rem' }}
                    />
                  </div>
                  <ErrorMessage index={index} field="institutionName" />
                </div>

                {/* Stream / Subject */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stream / Subject {!isGraduation && <span className="text-red-500">*</span>}
                    {isGraduation && <span className="text-green-600 text-xs ml-1">(Optional)</span>}
                  </label>
                  <div className="relative">
                    <BookOpen className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={edu.stream}
                      onChange={e => handleFieldChange(index, 'stream', e.target.value)}
                      onBlur={() => {
                        const newShowErrors = [...showErrorsArray]
                        newShowErrors[index] = new Set(newShowErrors[index]).add('stream')
                        setShowErrorsArray(newShowErrors)
                      }}
                      className={getInputClass(index, 'stream')}
                      placeholder="e.g., Science, Computer Science, Commerce"
                      style={{ paddingLeft: '2.75rem' }}
                    />
                  </div>
                  <ErrorMessage index={index} field="stream" />
                </div>

                {/* Year of Passing */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Year of Passing {!isGraduation && <span className="text-red-500">*</span>}
                    {isGraduation && <span className="text-green-600 text-xs ml-1">(Optional)</span>}
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={edu.yearOfPassing}
                      onChange={e => handleFieldChange(index, 'yearOfPassing', e.target.value)}
                      onBlur={() => {
                        const newShowErrors = [...showErrorsArray]
                        newShowErrors[index] = new Set(newShowErrors[index]).add('yearOfPassing')
                        setShowErrorsArray(newShowErrors)
                      }}
                      className={getInputClass(index, 'yearOfPassing')}
                      placeholder="e.g., 2025"
                      maxLength={4}
                      style={{ paddingLeft: '2.75rem' }}
                    />
                  </div>
                  <ErrorMessage index={index} field="yearOfPassing" />
                </div>

                {/* Grade / CGPA */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Grade / CGPA {!isGraduation && <span className="text-red-500">*</span>}
                    {isGraduation && <span className="text-green-600 text-xs ml-1">(Optional)</span>}
                  </label>
                  <div className="relative">
                    <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={edu.grade}
                      onChange={e => handleFieldChange(index, 'grade', e.target.value)}
                      onBlur={() => {
                        const newShowErrors = [...showErrorsArray]
                        newShowErrors[index] = new Set(newShowErrors[index]).add('grade')
                        setShowErrorsArray(newShowErrors)
                      }}
                      className={getInputClass(index, 'grade')}
                      placeholder="e.g., 8.5, 85%, 3.5/4.0"
                      style={{ paddingLeft: '2.75rem' }}
                    />
                  </div>
                  <ErrorMessage index={index} field="grade" />
                </div>

                {/* Duration */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (Years) {!isGraduation && <span className="text-red-500">*</span>}
                    {isGraduation && <span className="text-green-600 text-xs ml-1">(Optional)</span>}
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={edu.duration}
                      onChange={e => handleFieldChange(index, 'duration', e.target.value)}
                      onBlur={() => {
                        const newShowErrors = [...showErrorsArray]
                        newShowErrors[index] = new Set(newShowErrors[index]).add('duration')
                        setShowErrorsArray(newShowErrors)
                      }}
                      className={getInputClass(index, 'duration')}
                      placeholder="e.g., 4"
                      style={{ paddingLeft: '2.75rem' }}
                    />
                  </div>
                  <ErrorMessage index={index} field="duration" />
                </div>
              </div>

              {/* Document Upload */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Document (Marksheet/Transcript) {!isGraduation && <span className="text-red-500">*</span>}
                  {isGraduation && <span className="text-green-600 text-xs ml-1">(Optional)</span>}
                </label>
                <div className={getFileUploadClass(index)}>
                  <div className="space-y-3">
                    <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                      <FileText className="w-8 h-8 text-gray-400" />
                    </div>
                    <div>
                      <label className="cursor-pointer">
                        <span className="text-blue-600 font-medium">Click to upload</span>
                        <span className="text-gray-600"> or drag and drop</span>
                        <input
                          type="file"
                          className="hidden"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={e => handleFileChange(index, e.target.files?.[0] || null)}
                        />
                      </label>
                      <p className="text-xs text-gray-500 mt-2">PDF, PNG, JPG up to 5MB</p>
                    </div>
                  </div>
                </div>
                <ErrorMessage index={index} field="document" />
                {edu.document && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700">
                      ✓ File uploaded: <span className="font-medium">{edu.document.name}</span> ({(edu.document.size / 1024).toFixed(2)} KB)
                    </p>
                  </div>
                )}
              </div>
            </div>
          )
        })}

        {/* Add More Button at Bottom */}
        <div className="flex justify-center">
          <button
            type="button"
            onClick={addEducation}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-5 h-5" />
            Add Another Education
          </button>
        </div>
      </div>
    </div>
  )
}
