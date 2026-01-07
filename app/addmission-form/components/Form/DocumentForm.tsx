"use client"

import { useState, useEffect } from "react"
import { X, AlertCircle, FileText, Upload, Plus, Trash2, Shield, FileCheck, FileType, Signature } from "lucide-react"

interface DocumentData {
  fileType: string
  file: File | null
  fileName?: string
  fileSize?: number
}

interface DocumentErrors {
  [key: string]: string
}

interface StudentDocumentsFormProps {
  data: DocumentData[];
  onChange: (data: DocumentData[]) => void;
}

// Updated document types with mandatory Aadhar and Signature
const DOCUMENT_TYPES = [
  { value: 'aadhar', label: 'Aadhar Card', required: true, mandatory: true },
  { value: 'signature', label: 'Signature', required: true, mandatory: true },
  { value: 'pan', label: 'PAN Card', required: false, mandatory: false },
  { value: 'passport', label: 'Passport', required: false, mandatory: false },
  { value: 'voter_id', label: 'Voter ID', required: false, mandatory: false },
  { value: 'driving_license', label: 'Driving License', required: false, mandatory: false },
  { value: 'marksheet_10th', label: '10th Marksheet', required: false, mandatory: false },
  { value: 'marksheet_12th', label: '12th Marksheet', required: false, mandatory: false },
  { value: 'graduation_marksheet', label: 'Graduation Marksheet', required: false, mandatory: false },
  { value: 'transfer_certificate', label: 'Transfer Certificate', required: false, mandatory: false },
  { value: 'migration_certificate', label: 'Migration Certificate', required: false, mandatory: false },
  { value: 'character_certificate', label: 'Character Certificate', required: false, mandatory: false },
  { value: 'caste_certificate', label: 'Caste Certificate', required: false, mandatory: false },
  { value: 'income_certificate', label: 'Income Certificate', required: false, mandatory: false },
  { value: 'medical_certificate', label: 'Medical Certificate', required: false, mandatory: false },
  { value: 'passport_photo', label: 'Passport Photo', required: false, mandatory: false },
  { value: 'other', label: 'Other Document', required: false, mandatory: false }
]

export default function StudentDocumentsForm({ data, onChange }: StudentDocumentsFormProps) {
  const [documents, setDocuments] = useState<DocumentData[]>(data)
  const [errorsArray, setErrorsArray] = useState<DocumentErrors[]>([])
  const [touchedArray, setTouchedArray] = useState<Set<string>[]>([])
  const [showErrorsArray, setShowErrorsArray] = useState<Set<string>[]>([])

  // Initialize with mandatory documents if no data provided
  useEffect(() => {
    if (data.length === 0) {
      const defaultData: DocumentData[] = [
        {
          fileType: 'aadhar',
          file: null
        },
        {
          fileType: 'signature',
          file: null
        }
      ]
      setDocuments(defaultData)
      onChange(defaultData)
      // Initialize arrays
      setErrorsArray([{}, {}])
      setTouchedArray([new Set<string>(), new Set<string>()])
      setShowErrorsArray([new Set<string>(), new Set<string>()])
    } else {
      setDocuments(data)
      // Initialize arrays with existing data
      const initialErrors = Array(data.length).fill({})
      const initialTouched = Array(data.length).fill(new Set<string>())
      const initialShowErrors = Array(data.length).fill(new Set<string>())
      
      setErrorsArray(initialErrors)
      setTouchedArray(initialTouched)
      setShowErrorsArray(initialShowErrors)
    }
  }, [data, onChange])

  const validateDocument = (index: number, field: keyof DocumentData, value: any): string => {
    switch (field) {
      case 'fileType':
        if (!value?.trim()) return 'Document type is required'
        return ''

      case 'file':
        if (!value) return 'File upload is required'
        if (value && !(value instanceof File)) return 'Please upload a valid file'
        
        // Get file type restrictions based on document type
        const docType = documents[index]?.fileType
        const file = value as File
        
        // File size validation (5MB max)
        if (file.size > 5 * 1024 * 1024) return 'File must be less than 5MB'
        
        // File type validation based on document type
        const allowedTypes: Record<string, string[]> = {
          'passport_photo': ['image/jpeg', 'image/png', 'image/jpg'],
          'signature': ['image/jpeg', 'image/png', 'image/jpg'],
          'aadhar': ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'],
          'pan': ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'],
          'passport': ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'],
          'default': ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf']
        }
        
        const validTypes = allowedTypes[docType] || allowedTypes.default
        if (!validTypes.includes(file.type)) {
          return 'File must be PDF, JPG, or PNG'
        }

        // Special validation for signature
        if (docType === 'signature') {
          // Signature should be small (max 1MB)
          if (file.size > 1 * 1024 * 1024) return 'Signature file must be less than 1MB'
          // Signature should be image only
          if (!file.type.startsWith('image/')) return 'Signature must be an image file'
        }
        
        return ''

      default:
        return ''
    }
  }

  const handleFileTypeChange = (index: number, value: string) => {
    // Don't allow changing mandatory document types
    const currentDocType = documents[index].fileType
    const currentDocInfo = DOCUMENT_TYPES.find(d => d.value === currentDocType)
    const newDocInfo = DOCUMENT_TYPES.find(d => d.value === value)
    
    if (currentDocInfo?.mandatory) {
      const error = 'This is a mandatory document and cannot be changed'
      const newErrors = [...errorsArray]
      newErrors[index] = { ...newErrors[index], fileType: error }
      setErrorsArray(newErrors)
      
      const newShowErrors = [...showErrorsArray]
      newShowErrors[index] = new Set(newShowErrors[index]).add('fileType')
      setShowErrorsArray(newShowErrors)
      return
    }

    const updatedDocuments = [...documents]
    updatedDocuments[index] = { 
      ...updatedDocuments[index], 
      fileType: value,
      file: null, // Clear file when type changes
      fileName: '',
      fileSize: 0
    }
    setDocuments(updatedDocuments)
    onChange(updatedDocuments)
    
    // Update touched
    const newTouched = [...touchedArray]
    newTouched[index] = new Set(newTouched[index]).add('fileType')
    setTouchedArray(newTouched)
    
    // Validate
    const error = validateDocument(index, 'fileType', value)
    const newErrors = [...errorsArray]
    
    if (error) {
      newErrors[index] = { ...newErrors[index], fileType: error }
      const newShowErrors = [...showErrorsArray]
      newShowErrors[index] = new Set(newShowErrors[index]).add('fileType')
      setShowErrorsArray(newShowErrors)
    } else {
      const { fileType: removed, ...rest } = newErrors[index]
      newErrors[index] = rest
      const newShowErrors = [...showErrorsArray]
      newShowErrors[index] = new Set([...newShowErrors[index]].filter(f => f !== 'fileType'))
      setShowErrorsArray(newShowErrors)
    }
    
    setErrorsArray(newErrors)
  }

  const handleFileChange = (index: number, file: File | null) => {
    const updatedDocuments = [...documents]
    updatedDocuments[index] = { 
      ...updatedDocuments[index], 
      file,
      fileName: file?.name,
      fileSize: file?.size
    }
    setDocuments(updatedDocuments)
    onChange(updatedDocuments)
    
    // Update touched
    const newTouched = [...touchedArray]
    newTouched[index] = new Set(newTouched[index]).add('file')
    setTouchedArray(newTouched)
    
    // Validate
    const error = validateDocument(index, 'file', file)
    const newErrors = [...errorsArray]
    
    if (error) {
      newErrors[index] = { ...newErrors[index], file: error }
      const newShowErrors = [...showErrorsArray]
      newShowErrors[index] = new Set(newShowErrors[index]).add('file')
      setShowErrorsArray(newShowErrors)
    } else {
      const { file: removed, ...rest } = newErrors[index]
      newErrors[index] = rest
      const newShowErrors = [...showErrorsArray]
      newShowErrors[index] = new Set([...newShowErrors[index]].filter(f => f !== 'file'))
      setShowErrorsArray(newShowErrors)
    }
    
    setErrorsArray(newErrors)
  }

  const addDocument = () => {
    const newDocument: DocumentData = {
      fileType: '',
      file: null
    }
    
    const updatedDocuments = [...documents, newDocument]
    setDocuments(updatedDocuments)
    onChange(updatedDocuments)
    
    // Initialize arrays for new document
    setErrorsArray([...errorsArray, {}])
    setTouchedArray([...touchedArray, new Set<string>()])
    setShowErrorsArray([...showErrorsArray, new Set<string>()])
  }

  const removeDocument = (index: number) => {
    // Don't remove if it's a mandatory document
    const docType = documents[index].fileType
    const docInfo = DOCUMENT_TYPES.find(d => d.value === docType)
    
    if (docInfo?.mandatory) {
      // Show error that mandatory documents cannot be removed
      const newErrors = [...errorsArray]
      newErrors[index] = { ...newErrors[index], fileType: `${docInfo.label} is mandatory and cannot be removed` }
      setErrorsArray(newErrors)
      
      const newShowErrors = [...showErrorsArray]
      newShowErrors[index] = new Set(newShowErrors[index]).add('fileType')
      setShowErrorsArray(newShowErrors)
      return
    }
    
    const updatedDocuments = documents.filter((_, i) => i !== index)
    setDocuments(updatedDocuments)
    onChange(updatedDocuments)
    
    // Remove corresponding error/touched data
    setErrorsArray(errorsArray.filter((_, i) => i !== index))
    setTouchedArray(touchedArray.filter((_, i) => i !== index))
    setShowErrorsArray(showErrorsArray.filter((_, i) => i !== index))
  }

  const closeError = (index: number, field: string) => {
    const newShowErrors = [...showErrorsArray]
    newShowErrors[index] = new Set([...newShowErrors[index]].filter(f => f !== field))
    setShowErrorsArray(newShowErrors)
  }

  const getDocumentIcon = (fileType: string) => {
    switch (fileType) {
      case 'aadhar':
        return <Shield className="w-5 h-5 text-blue-600" />
      case 'signature':
        return <Signature className="w-5 h-5 text-red-600" />
      case 'pan':
        return <FileText className="w-5 h-5 text-purple-600" />
      case 'passport':
        return <FileCheck className="w-5 h-5 text-green-600" />
      default:
        return <FileType className="w-5 h-5 text-gray-600" />
    }
  }

  const getSelectClass = (index: number, field: string) => {
    const baseClass = "w-full px-4 py-3 bg-white border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none"
    const errorClass = errorsArray[index]?.[field] ? "border-red-300 bg-red-50" : "border-gray-300 hover:border-gray-400"
    const successClass = touchedArray[index]?.has(field) && !errorsArray[index]?.[field] && documents[index][field as keyof DocumentData] ? "border-green-300" : ""
    const disabledClass = documents[index].fileType && DOCUMENT_TYPES.find(d => d.value === documents[index].fileType)?.mandatory ? "bg-gray-50 cursor-not-allowed" : ""
    return `${baseClass} ${errorClass} ${successClass} ${disabledClass}`
  }

  const getFileUploadClass = (index: number) => {
    const baseClass = "border-2 border-dashed rounded-xl p-6 text-center transition-all duration-200 cursor-pointer"
    return errorsArray[index]?.file ? `${baseClass} border-red-300 bg-red-50` : `${baseClass} border-gray-300 hover:border-blue-400`
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

  const getFileNamePreview = (document: DocumentData) => {
    if (document.fileName) {
      const sizeInKB = (document.fileSize || 0) / 1024
      return (
        <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800 truncate">
                {document.fileName}
              </span>
            </div>
            <span className="text-xs text-green-600">
              {sizeInKB.toFixed(2)} KB
            </span>
          </div>
        </div>
      )
    }
    return null
  }

  const getRemainingTypes = () => {
    const selectedTypes = documents.map(doc => doc.fileType)
    return DOCUMENT_TYPES.filter(type => 
      !selectedTypes.includes(type.value)
    )
  }

  // Check mandatory documents status
  const checkMandatoryDocuments = () => {
    const mandatoryDocs = DOCUMENT_TYPES.filter(d => d.mandatory)
    const status = mandatoryDocs.map(doc => {
      const hasDoc = documents.some(d => d.fileType === doc.value && d.file)
      return {
        ...doc,
        uploaded: hasDoc
      }
    })
    return status
  }

  const mandatoryDocsStatus = checkMandatoryDocuments()
  const allMandatoryUploaded = mandatoryDocsStatus.every(doc => doc.uploaded)

  return (
    <div className="py-8">
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Student Documents</h2>
              <p className="text-sm text-gray-500">
                Upload required documents. Aadhar Card and Signature are mandatory.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={addDocument}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={getRemainingTypes().length === 0}
            title={getRemainingTypes().length === 0 ? "All document types added" : ""}
          >
            <Plus className="w-4 h-4" />
            Add Document
          </button>
        </div>

        {/* Mandatory Documents Alert */}
        {!allMandatoryUploaded && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0" />
              <div>
                <h4 className="text-sm font-medium text-yellow-800">Mandatory Documents Required</h4>
                <p className="text-sm text-yellow-700 mt-1">
                  Please upload all mandatory documents to proceed
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Documents List */}
        {documents.map((doc, index) => {
          const docInfo = DOCUMENT_TYPES.find(d => d.value === doc.fileType)
          const isMandatory = docInfo?.mandatory || false
          
          return (
            <div key={index} className="bg-white border rounded-xl p-6 space-y-6 relative">
              {/* Remove Button - Hidden for mandatory documents */}
              {!isMandatory && (
                <button
                  type="button"
                  onClick={() => removeDocument(index)}
                  className="absolute top-4 right-4 p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                  title="Remove document"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}

              {/* Document Number */}
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  isMandatory ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                  {getDocumentIcon(doc.fileType)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {docInfo?.label || 'Document'} {index + 1}
                    {isMandatory && (
                      <span className="ml-2 px-2 py-1 text-xs bg-red-100 text-red-800 rounded-full">
                        Mandatory
                      </span>
                    )}
                  </h3>
                  {doc.file && (
                    <p className="text-sm text-green-600 mt-1 flex items-center gap-1">
                      <FileCheck className="w-4 h-4" />
                      Uploaded
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Document Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Document Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={doc.fileType}
                    onChange={(e) => handleFileTypeChange(index, e.target.value)}
                    onBlur={() => {
                      const newShowErrors = [...showErrorsArray]
                      newShowErrors[index] = new Set(newShowErrors[index]).add('fileType')
                      setShowErrorsArray(newShowErrors)
                    }}
                    className={getSelectClass(index, 'fileType')}
                    disabled={isMandatory}
                  >
                    <option value="">Select Document Type</option>
                    {getRemainingTypes().map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label} {type.mandatory ? '(Mandatory)' : type.required ? '(Required)' : ''}
                      </option>
                    ))}
                    {/* Always show current selected type */}
                    {doc.fileType && (
                      <option value={doc.fileType}>
                        {docInfo?.label || doc.fileType} {isMandatory ? '(Mandatory)' : ''}
                      </option>
                    )}
                  </select>
                  <ErrorMessage index={index} field="fileType" />
                  {isMandatory && (
                    <p className="text-xs text-red-600 mt-1">
                      This is a mandatory document and cannot be changed
                    </p>
                  )}
                </div>

                {/* File Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Upload File <span className="text-red-500">*</span>
                  </label>
                  <div className={getFileUploadClass(index)}>
                    <label className="cursor-pointer block">
                      <input
                        type="file"
                        className="hidden"
                        accept={doc.fileType === 'signature' ? ".jpg,.jpeg,.png" : ".pdf,.jpg,.jpeg,.png"}
                        onChange={(e) => handleFileChange(index, e.target.files?.[0] || null)}
                      />
                      <div className="space-y-3">
                        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                          <Upload className="w-8 h-8 text-gray-400" />
                        </div>
                        <div>
                          <p className="text-blue-600 font-medium">Click to upload</p>
                          <p className="text-gray-600 text-sm">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">
                          {doc.fileType === 'signature' 
                            ? 'JPG, PNG up to 1MB' 
                            : 'PDF, PNG, JPG up to 5MB'}
                        </p>
                      </div>
                    </label>
                  </div>
                  <ErrorMessage index={index} field="file" />
                  {getFileNamePreview(doc)}
                </div>
              </div>

              {/* Document Requirements */}
              {doc.fileType && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="text-sm font-medium text-blue-800 mb-1">Requirements:</h4>
                  <ul className="text-xs text-blue-700 space-y-1">
                    {doc.fileType === 'aadhar' && (
                      <>
                        <li>• Front and back side of Aadhar Card</li>
                        <li>• PDF or clear scanned image</li>
                        <li>• Name, photo, and Aadhar number should be clearly visible</li>
                        <li>• File must be less than 5MB</li>
                      </>
                    )}
                    {doc.fileType === 'signature' && (
                      <>
                        <li>• Clear image of your signature on white background</li>
                        <li>• Signature should be in blue or black ink</li>
                        <li>• No background marks or stamps</li>
                        <li>• File must be less than 1MB</li>
                        <li>• Image format only (JPG, PNG)</li>
                      </>
                    )}
                    {doc.fileType === 'pan' && (
                      <>
                        <li>• Clear image of PAN Card</li>
                        <li>• All details should be readable</li>
                      </>
                    )}
                    {doc.fileType === 'passport' && (
                      <>
                        <li>• First and last page of passport</li>
                        <li>• Visa pages if applicable</li>
                      </>
                    )}
                    {doc.fileType.includes('marksheet') && (
                      <>
                        <li>• Clear scanned copy of marksheet</li>
                        <li>• All pages should be included</li>
                        <li>• University seal should be visible</li>
                      </>
                    )}
                    {!['aadhar', 'signature', 'pan', 'passport'].some(t => doc.fileType.includes(t)) && (
                      <>
                        <li>• Clear scanned copy</li>
                        <li>• All details should be readable</li>
                        <li>• Government seal/stamp should be visible</li>
                      </>
                    )}
                  </ul>
                </div>
              )}
            </div>
          )
        })}

        {/* Add More Button at Bottom */}
        {getRemainingTypes().length > 0 && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={addDocument}
              className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Add Another Document
            </button>
          </div>
        )}

        {/* Summary */}
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Document Checklist</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Mandatory Documents:</p>
              <ul className="space-y-2">
                {mandatoryDocsStatus.map((doc, index) => (
                  <li key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {doc.uploaded ? (
                        <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                          <FileCheck className="w-3 h-3 text-green-600" />
                        </div>
                      ) : (
                        <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center">
                          <AlertCircle className="w-3 h-3 text-red-600" />
                        </div>
                      )}
                      <span className={`text-sm ${doc.uploaded ? 'text-green-700' : 'text-red-700'}`}>
                        {doc.label}
                      </span>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-full ${doc.uploaded 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'}`}>
                      {doc.uploaded ? 'Uploaded' : 'Pending'}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Upload Progress:</p>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Total Uploaded</span>
                    <span>{documents.filter(d => d.file).length} of {documents.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${(documents.filter(d => d.file).length / documents.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm text-gray-600 mb-1">
                    <span>Mandatory Documents</span>
                    <span>{mandatoryDocsStatus.filter(d => d.uploaded).length} of {mandatoryDocsStatus.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        allMandatoryUploaded ? 'bg-green-600' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${(mandatoryDocsStatus.filter(d => d.uploaded).length / mandatoryDocsStatus.length) * 100}%` }}
                    ></div>
                  </div>
                </div>
                {!allMandatoryUploaded && (
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <p className="text-sm text-yellow-700">
                      <span className="font-medium">Note:</span> All mandatory documents must be uploaded to proceed to the next step.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}